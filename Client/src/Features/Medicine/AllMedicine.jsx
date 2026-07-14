import React, { useEffect, useState } from 'react'
import useMedicineStore from '../../Store/Medicine.store';
import Header from '../../Components/Header';
import useUIStore from '../../Store/UI.store';
import Loader from '../../Components/Loader';
import useFamilyStore from '../../Store/FamilyMembers.store';


const AllMedicine = () => {
    const allMedicines = useMedicineStore(state => state.AllMedicines);
    const activeMedicines = allMedicines.filter(
        (medicine) => medicine.status === 'active'
    )
    const members = useFamilyStore(state => state.members);
    const fetchMedicineById = useMedicineStore(state => state.fetchMedicinesByMember);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const fetchMembers = useFamilyStore(state => state.fetchMember);
    const isLoading = useUIStore(state => state.isLoading);

    const [selectedMemberId, setSelectedMemberId] = useState('all');

    const handleFilter = async (memberId) => {
        await fetchMedicineById(memberId);
        setSelectedMemberId(memberId);
    }

    const handleDefaultFilter = async () => {
        await fetchAllMedicines();
        setSelectedMemberId('all');
    }

    useEffect(() => {
        fetchAllMedicines();
        fetchMembers();
    }, []);

    return (
        <div className="page-bg">
            <Header />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="max-w-6xl mx-auto mt-6 glass-card-static p-4 sm:p-6 animate-fadeIn">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-6">

                        <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                            Active Medicines
                        </h2>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scroll-none">

                            {/* All Button */}
                            <button
                                className={`btn-pill whitespace-nowrap ${
                                    selectedMemberId === "all"
                                        ? "btn-pill-active"
                                        : "btn-pill-inactive"
                                }`}
                                onClick={handleDefaultFilter}
                            >
                                All
                            </button>

                            {members.map((member) => (
                                <button
                                    key={member._id}
                                    className={`btn-pill whitespace-nowrap ${
                                        selectedMemberId === member._id
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
                        <div className="text-center text-slate-400 py-16 animate-fadeIn">
                            <div className="text-4xl mb-3">💊</div>
                            <p className="font-medium">No active medicines found.</p>
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
                                    <div className="flex items-start gap-3">
                                        <span className="badge badge-success mt-0.5">
                                            {medicine.status}
                                        </span>

                                        <div>
                                            <p className="font-semibold text-slate-100">
                                                {medicine.medicineName}
                                            </p>
                                            <p className="text-sm text-slate-400 mt-0.5">
                                                {medicine.remainingStock} {medicine.doseUnit} left
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

}

function filterMedicinesByMember(medicines, memberId) {
    return medicines.filter((medicine) =>
        medicine.memberId === memberId
    );
}



export default AllMedicine
