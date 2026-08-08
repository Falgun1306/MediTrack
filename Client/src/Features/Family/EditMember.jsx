import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance";
import useFamilyStore from "../../Store/FamilyMembers.store";
import { toast } from "react-toastify";

const EditMember = ({ member, setshowEditMember }) => {
    const [memberData, setMemberData] = useState({
        name: member?.name || "",
        relation: member?.relation || "self",
        age: member?.age || "",
    });

    const [loading, setLoading] = useState(false);

    const fetchMember = useFamilyStore((state) => state.fetchMember);

    const handleInputChange = (e) => {
        setMemberData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await axiosInstance.patch(
                `/family-members/update-member/${member._id}`,
                {
                    name: memberData.name.trim(),
                    relation: memberData.relation,
                    age: Number(memberData.age),
                }
            );

            toast.success(
                response.data.message || "Member Updated Successfully"
            );

            setshowEditMember(false);
            await fetchMember();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Check Member Details"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">

            <div className="modal-content animate-fadeInScale overflow-hidden pt-7">

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-2 bg-[#00607e]"></div>

                {/* Close Button */}
                <button
                    onClick={() => setshowEditMember(false)}
                    className="close-btn"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-xl font-bold font-headline text-center text-[#111c2d] mb-6">
                    Update Family Member
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={memberData.name}
                            onChange={handleInputChange}
                            className="input-stitch"
                        />
                    </div>

                    {/* Relation */}
                    <div>
                        <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Relation</label>
                        <select
                            name="relation"
                            value={memberData.relation}
                            onChange={handleInputChange}
                            className="input-stitch"
                        >
                            <option value="self">Self</option>
                            <option value="father">Father</option>
                            <option value="mother">Mother</option>
                            <option value="spouse">Spouse</option>
                            <option value="child">Child</option>
                            <option value="brother">Brother</option>
                            <option value="sister">Sister</option>
                        </select>
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Age</label>
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            value={memberData.age}
                            onChange={handleInputChange}
                            className="input-stitch"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3 rounded-xl text-sm font-semibold tracking-wide disabled:opacity-60 mt-2"
                    >
                        {loading ? "Updating..." : "Update Member"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditMember;
