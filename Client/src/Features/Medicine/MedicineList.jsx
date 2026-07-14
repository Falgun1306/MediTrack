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
            toast.success(response.data.message || "deleted successfully");
            await fetchMedicines(memberId);
            await fetchAllMedicine();
        } catch (error) {
            toast.error("try again");
        } finally {
            setIsLoading(false);
        }
    }

    const handleEditMedicine = (editableMember) => {
        setSelectedMedicine(editableMember);
        setShowEditMedicine(true);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <div className="glass-card-static p-4 sm:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                        Medicines
                    </h2>
                    {MedicineTaker && (
                        <p className="text-sm text-slate-400 mt-1">
                            For: <span className="font-medium text-cyan-400">{MedicineTaker}</span>
                        </p>
                    )}
                </div>

                <button
                    onClick={() => setShowAddMedicine(true)}
                    className="btn-primary w-full sm:w-auto px-5 py-2.5 rounded-full text-sm"
                >
                    + Add Medicine
                </button>
            </div>

            {/* Empty State */}
            {medicines.length === 0 ? (
                <div className="text-center text-slate-400 py-16 animate-fadeIn">
                    <div className="text-4xl mb-3">💊</div>
                    <p className="font-medium">No medicines added yet.</p>
                    <p className="text-sm text-slate-500 mt-1">Add a medicine to start tracking.</p>
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
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {/* Status Badge */}
                                    <span
                                        className={`badge ${
                                            medicine.status === "active"
                                                ? "badge-success"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {medicine.status}
                                    </span>
                                </div>

                                <div>
                                    <p className="font-semibold text-slate-100">
                                        {medicine.medicineName}
                                    </p>
                                    <p className="text-sm text-slate-400 mt-0.5">
                                        {medicine.remainingStock} {medicine.doseUnit} left
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">

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
}


export default MedicineList
