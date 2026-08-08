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
            toast.error("Try again");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditMember = (editableMember) => {
        setMember(editableMember);
        setShowEditMember(true);
    };

    const handleMedicines = (memberId, memberName) => {
        setMemberId(memberId);
        setMemberIdForMedicine(memberId);
        setMemberNameForMedicine(memberName);
        setMemberName(memberName);
        navigate('/medicines');
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="glass-card-static p-4 sm:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-[#bec8ce]/30">
                <div>
                    <h2 className="text-xl font-headline font-bold text-[#111c2d]">
                        Family Members Management
                    </h2>
                    <p className="text-sm text-[#3f484d] mt-0.5">
                        Manage profiles and assign medicine schedules
                    </p>
                </div>

                <button
                    onClick={() => setShowAddMember(true)}
                    className="btn-primary w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                    + Add Member
                </button>
            </div>

            {/* Empty State */}
            {members.length === 0 ? (
                <div className="text-center text-[#6f787e] py-16 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-[#f0f3ff] text-[#00607e] flex items-center justify-center mx-auto mb-3">
                        <span className="material-symbols-outlined text-3xl">family_restroom</span>
                    </div>
                    <p className="font-semibold text-[#111c2d]">No family members added yet.</p>
                    <p className="text-sm text-[#6f787e] mt-1">Add your first family member to start managing their health schedule.</p>
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
                            <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-full bg-[#bfe8ff] text-[#001f2b] flex items-center justify-center font-bold text-base shrink-0 border border-[#0d7a9e]/20 shadow-xs">
                                    {member.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold font-headline text-[#111c2d] text-base">{member.name}</p>
                                        <span className="badge badge-info uppercase text-[10px] font-bold tracking-wider">
                                            {member.relation}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#3f484d] mt-0.5">Age: {member.age} years</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-2 items-center">

                                <button
                                    className="action-btn action-btn-success"
                                    onClick={() =>
                                        handleMedicines(member._id, member.name)
                                    }
                                >
                                    <BsCapsule /> View Medicines
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
