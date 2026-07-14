import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import useFamilyStore from "../../Store/FamilyMembers.store";
import { axiosInstance } from "../../utilities/axiosInstance";
import { BsCapsule } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useUIStore from "../../Store/UI.store";
import Loader from "../../Components/Loader";
import useMedicineStore from "../../Store/Medicine.store";
import { toast } from "react-toastify";

const FamilyList = ({ setMember, setShowEditMember }) => {

    const setShowAddMember = useFamilyStore(state => state.setShowAddMember);
    const fetchMember = useFamilyStore(state => state.fetchMember);
    const members = useFamilyStore(state => state.members);
    const setMemberId = useFamilyStore(state => state.setMemberId);
    const setMemberName = useFamilyStore(state => state.setMemberName);

    const setMemberIdForMedicine = useMedicineStore(state => state.setMemberIdForMedicine);
    const setMemberNameForMedicine = useMedicineStore(state => state.setMemberNameForMedicine);

    const isLoading = useUIStore(state => state.isLoading);
    const setIsLoading = useUIStore(state => state.setIsLoading);

    const navigate = useNavigate();

    const handledeleteMember = async (deleteMemberId) => {
        try {
            const response = await axiosInstance.delete(`/family-members/delete-member/${deleteMemberId}`);
            setIsLoading(true);
            await fetchMember();
            toast.success(response.data.message || "Member deleted successfully");
        } catch (error) {
            toast.error("try again");
        } finally {
            setIsLoading(false);
        }
    }

    const handleEditMember = (editableMember) => {
        setMember(editableMember);
        setShowEditMember(true);
    }

    const handleMedicines = (memberId, memberName) => {
        setMemberId(memberId);
        setMemberIdForMedicine(memberId);
        setMemberNameForMedicine(memberName);
        setMemberName(memberName);
        navigate('/medicines');
    }

    return isLoading ? (
        <Loader />
    ) : (
        <div className="glass-card-static p-4 sm:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                    Family Members
                </h2>

                <button
                    onClick={() => setShowAddMember(true)}
                    className="btn-primary w-full sm:w-auto px-5 py-2.5 rounded-full text-sm"
                >
                    + Add Member
                </button>
            </div>

            {/* Empty State */}
            {members.length === 0 ? (
                <div className="text-center text-slate-400 py-16 animate-fadeIn">
                    <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
                    <p className="font-medium">No family members added yet.</p>
                    <p className="text-sm text-slate-500 mt-1">Add your first family member to get started.</p>
                </div>
            ) : (
                <div className="space-y-3">

                    {members.map((member, index) => (
                        <div
                            key={member._id}
                            className="list-card flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 animate-slideUp"
                            style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                        >
                            {/* Member Info */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center text-cyan-400 font-semibold text-sm shrink-0">
                                    {member.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-100">{member.name}</p>
                                    <p className="text-sm text-slate-400">{member.relation} • Age: {member.age}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2">

                                <button
                                    className="action-btn action-btn-success"
                                    onClick={() =>
                                        handleMedicines(member._id, member.name)
                                    }
                                >
                                    <BsCapsule /> Medicines
                                </button>

                                <button
                                    className="action-btn action-btn-warning"
                                    onClick={() => handleEditMember(member)}
                                >
                                    <FaEdit /> Edit
                                </button>

                                <button
                                    className="action-btn action-btn-danger"
                                    onClick={() =>
                                        handledeleteMember(member._id)
                                    }
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

export default FamilyList;
