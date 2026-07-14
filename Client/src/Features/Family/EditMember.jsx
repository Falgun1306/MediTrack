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

            <div className="modal-content animate-fadeInScale">

                {/* Close Button */}
                <button
                    onClick={() => setshowEditMember(false)}
                    className="close-btn"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-8">
                    Update Family Member
                </h2>

                <form onSubmit={handleUpdate} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={memberData.name}
                            onChange={handleInputChange}
                            className="input-dark"
                        />
                    </div>

                    {/* Relation */}
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Relation</label>
                        <select
                            name="relation"
                            value={memberData.relation}
                            onChange={handleInputChange}
                            className="input-dark"
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
                        <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            value={memberData.age}
                            onChange={handleInputChange}
                            className="input-dark"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-3 rounded-xl text-sm tracking-wide disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Member"}
                    </button>

                </form>
            </div>
        </div>
    );

};

export default EditMember;
