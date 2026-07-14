import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance.js";
import useFamilyStore from "../../Store/FamilyMembers.store";
import { toast } from "react-toastify";

const AddMember = () => {
    const [memberData, setMemberData] = useState({
        name: "",
        relation: "self",
        age: "",
    });

    const [loading, setLoading] = useState(false);

    const setShowAddMember = useFamilyStore((state) => state.setShowAddMember);
    const fetchMember = useFamilyStore((state) => state.fetchMember);

    const handleInputChange = (e) => {
        setMemberData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddMember = async (e) => {
        e.preventDefault();

        if (!memberData.name || !memberData.age) {
            return toast.error("All fields are required");
        }

        try {
            setLoading(true);

            const response = await axiosInstance.post("/family-members", {
                name: memberData.name.trim(),
                relation: memberData.relation,
                age: Number(memberData.age),
            });

            toast.success(response.data.message || "Member added successfully");

            setShowAddMember(false);
            await fetchMember();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Check member details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">

            <div className="modal-content animate-fadeInScale">

                {/* Close Button */}
                <button
                    onClick={() => setShowAddMember(false)}
                    className="close-btn"
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-slate-100 mb-8">
                    Add Family Member
                </h2>

                <form onSubmit={handleAddMember} className="space-y-5">

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
                        {loading ? "Adding..." : "Add Member"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddMember;
