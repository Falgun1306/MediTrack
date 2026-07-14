import { useState } from "react";
import { GiMedicines } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaUsers, FaCapsules, FaBell } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import AuthStore from "../Store/Auth.store";
import { useNavigate, useLocation } from "react-router-dom";
import useFamilyStore from "../Store/FamilyMembers.store";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const logout = AuthStore((state) => state.logout);
    const setMembers = useFamilyStore((state) => state.setMembers);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        setMembers([]);
        navigate("/login");
    };

    const navItems = [
        { name: "Family", path: "/family", icon: <FaUsers /> },
        { name: "Medicines", path: "/all-medicines", icon: <FaCapsules /> },
        { name: "Notifications", path: "/all-notifications", icon: <FaBell /> },
    ];

    return (
        <div className="glass-nav px-6 py-4 mb-6 animate-slideDown">

            {/* Top Section */}
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer font-bold text-xl group"
                    onClick={() => navigate("/")}
                >
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-300">
                        <GiMedicines className="text-xl" />
                    </div>
                    <span className="gradient-text">MediTrack</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-3 items-center">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${
                                    location.pathname === item.path
                                        ? "btn-pill-active"
                                        : "btn-pill-inactive"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm action-btn-danger"
                    >
                        Logout <IoIosLogOut />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10 md:hidden animate-slideDown">

                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => {
                                navigate(item.path);
                                setIsOpen(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                                ${
                                    location.pathname === item.path
                                        ? "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-400 border border-cyan-500/20"
                                        : "text-slate-300 hover:bg-white/5"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}

                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium action-btn-danger mt-1"
                    >
                        Logout <IoIosLogOut />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
