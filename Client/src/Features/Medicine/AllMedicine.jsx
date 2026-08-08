import React, { useEffect, useState } from 'react';
import useMedicineStore from '../../Store/Medicine.store';
import Header from '../../Components/Header';
import useUIStore from '../../Store/UI.store';
import Loader from '../../Components/Loader';
import useFamilyStore from '../../Store/FamilyMembers.store';

const AllMedicine = () => {
    const allMedicines = useMedicineStore(state => state.AllMedicines);
    const activeMedicines = allMedicines.filter(
        (medicine) => medicine.status === 'active'
    );
    const members = useFamilyStore(state => state.members);
    const fetchMedicineById = useMedicineStore(state => state.fetchMedicinesByMember);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const fetchMembers = useFamilyStore(state => state.fetchMember);
    const isLoading = useUIStore(state => state.isLoading);

    const [selectedMemberId, setSelectedMemberId] = useState('all');

    const handleFilter = async (memberId) => {
        await fetchMedicineById(memberId);
        setSelectedMemberId(memberId);
    };

    const handleDefaultFilter = async () => {
        await fetchAllMedicines();
        setSelectedMemberId('all');
    };

    useEffect(() => {
        fetchAllMedicines();
        fetchMembers();
    }, []);

    return (
        <div className="page-bg max-w-7xl mx-auto">
            <Header />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-6 glass-card-static p-4 sm:p-6 animate-fadeIn">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-6 pb-4 border-b border-[#bec8ce]/30">

                        <div>
                            <h2 className="text-xl font-headline font-bold text-[#111c2d]">
                                Global Medicines Catalog
                            </h2>
                            <p className="text-sm text-[#3f484d] mt-0.5">
                                Overview of active prescriptions across all family members
                            </p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scroll-none">

                            {/* All Button */}
                            <button
                                className={`btn-pill whitespace-nowrap ${selectedMemberId === "all"
                                        ? "btn-pill-active"
                                        : "btn-pill-inactive"
                                    }`}
                                onClick={handleDefaultFilter}
                            >
                                All Members
                            </button>

                            {members.map((member) => (
                                <button
                                    key={member._id}
                                    className={`btn-pill whitespace-nowrap ${selectedMemberId === member._id
                                            ? "btn-pill-active"
                                            : "btn-pill-inactive"
                                        }`}
                                    onClick={() => handleFilter(member._id)}
                                >
                                    {member.name}
                                </button>
                            ))}

                        </div>
                    </div>

                    {/* Empty State */}
                    {activeMedicines.length === 0 ? (
                        <div className="text-center text-[#6f787e] py-16 animate-fadeIn">
                            <div className="w-16 h-16 rounded-full bg-[#f0f3ff] text-[#00607e] flex items-center justify-center mx-auto mb-3">
                                <span className="material-symbols-outlined text-3xl">medication</span>
                            </div>
                            <p className="font-semibold text-[#111c2d]">No active medicines found.</p>
                            <p className="text-sm text-[#6f787e] mt-1">Select another filter or add new medicines to track.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">

                            {activeMedicines.map((medicine, index) => (
                                <div
                                    key={medicine._id}
                                    className="list-card flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 animate-slideUp"
                                    style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                                >
                                    {/* Medicine Info */}
                                    <div className="flex items-start gap-3.5">
                                        <div className="w-10 h-10 rounded-xl bg-[#e6f9e7] text-[#006e1c] flex items-center justify-center shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-xl">pill</span>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold font-headline text-[#111c2d] text-base">
                                                    {medicine.medicineName}
                                                </p>
                                                <span className="badge badge-success uppercase text-[10px] font-bold tracking-wider">
                                                    {medicine.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#3f484d] mt-1">
                                                Remaining Stock: <span className="font-semibold text-[#111c2d]">{medicine.remainingStock} {medicine.doseUnit}</span>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            )}
        </div>
    );
};

export default AllMedicine;
