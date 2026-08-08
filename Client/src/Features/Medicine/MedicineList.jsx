import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import useMedicineStore from "../../Store/Medicine.store";
import { axiosInstance } from "../../utilities/axiosInstance";
import useUIStore from "../../Store/UI.store";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const MedicineList = ({ setSelectedMedicine, setShowEditMedicine }) => {
    const medicines = useMedicineStore(state => state.medicines);
    const fetchMedicines = useMedicineStore(state => state.fetchMedicines);
    const setShowAddMedicine = useMedicineStore(state => state.setShowAddMedicine);
    const MedicineTaker = useMedicineStore(state => state.memberNameForMedicine);
    const memberId = useMedicineStore(state => state.memberIdForMedicine);
    const fetchAllMedicine = useMedicineStore(state => state.fetchAllMedicines);

    const isLoading = useUIStore(state => state.isLoading);
    const setIsLoading = useUIStore(state => state.setIsLoading);

    const handledeleteMedicine = async (deleteMedicineId) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.delete(`/medicines/delete-medicine/${deleteMedicineId}`);
            toast.success(response.data.message || "Medicine deleted successfully");
            await fetchMedicines(memberId);
            await fetchAllMedicine();
        } catch (error) {
            toast.error("Try again");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditMedicine = (editableMember) => {
        setSelectedMedicine(editableMember);
        setShowEditMedicine(true);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="glass-card-static p-4 sm:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-[#bec8ce]/30">

                <div>
                    <h2 className="text-xl font-headline font-bold text-[#111c2d]">
                        Medicines List
                    </h2>
                    {MedicineTaker && (
                        <p className="text-sm text-[#3f484d] mt-0.5">
                            Prescriptions for: <span className="font-semibold text-[#00607e]">{MedicineTaker}</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={() => setShowAddMedicine(true)}
                    className="btn-primary w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                    + Add Medication
                </button>
            </div>

            {/* Empty State */}
            {medicines.length === 0 ? (
                <div className="text-center text-[#6f787e] py-16 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-[#f0f3ff] text-[#00607e] flex items-center justify-center mx-auto mb-3">
                        <span className="material-symbols-outlined text-3xl">medication</span>
                    </div>
                    <p className="font-semibold text-[#111c2d]">No medicines added yet.</p>
                    <p className="text-sm text-[#6f787e] mt-1">Add a medication to start tracking doses and stock levels.</p>
                </div>
            ) : (
                <div className="space-y-3">

                    {medicines.map((medicine, index) => (
                        <div
                            key={medicine._id}
                            className="list-card flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 animate-slideUp"
                            style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                        >
                            {/* Medicine Info */}
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-[#e6f9e7] text-[#006e1c] flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-xl">pill</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold font-headline text-[#111c2d] text-base">
                                            {medicine.medicineName}
                                        </p>
                                        <span
                                            className={`badge uppercase text-[10px] font-bold tracking-wider ${medicine.status === "active"
                                                    ? "badge-success"
                                                    : "badge-warning"
                                                }`}
                                        >
                                            {medicine.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#3f484d] mt-1">
                                        Remaining Stock: <span className="font-semibold text-[#111c2d]">{medicine.remainingStock} {medicine.doseUnit}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 items-center">

                                <button
                                    className="action-btn action-btn-warning"
                                    onClick={() => handleEditMedicine(medicine)}
                                >
                                    <FaEdit /> Edit
                                </button>

                                <button
                                    className="action-btn action-btn-danger"
                                    onClick={() => handledeleteMedicine(medicine._id)}
                                >
                                    <MdDeleteSweep /> Delete
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default MedicineList;
