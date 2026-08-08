import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaUsers, FaCapsules, FaBell, FaChartPie } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import AuthStore from "../Store/Auth.store";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const logout = AuthStore((state) => state.logout);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const navItems = [
        { name: "Dashboard", path: "/", icon: <FaChartPie /> },
        { name: "Family", path: "/family", icon: <FaUsers /> },
        { name: "Medicines", path: "/all-medicines", icon: <FaCapsules /> },
        { name: "Notifications", path: "/all-notifications", icon: <FaBell /> },
    ];

    return (
        <div className="glass-nav px-6 py-4 mb-6 animate-slideDown">

            {/* Top Section */}
            <div className="flex justify-between items-center">
                {/* Brand Logo */}
                <div
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => navigate("/")}
                >
                    <div className="w-10 h-10 rounded-xl bg-[#00607e] text-white flex items-center justify-center shadow-md shadow-[#00607e]/20 group-hover:scale-105 transition-transform duration-200">
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                    </div>
                    <span className="font-headline font-extrabold text-2xl text-[#00607e] tracking-tight">MediTrack</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-2 items-center">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? "bg-[#0d7a9e] text-[#eef8ff] font-semibold shadow-sm"
                                        : "text-[#3f484d] hover:bg-[#f0f3ff] hover:text-[#00607e]"
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm action-btn-danger ml-2"
                    >
                        <span>Logout</span> <IoIosLogOut className="text-base" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-xl text-[#3f484d] hover:text-[#00607e] hover:bg-[#f0f3ff] transition-all duration-200"
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#bec8ce]/30 md:hidden animate-slideDown">

                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? "bg-[#0d7a9e] text-[#eef8ff] font-semibold"
                                        : "text-[#3f484d] hover:bg-[#f0f3ff]"
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium action-btn-danger mt-2"
                    >
                        <span>Logout</span> <IoIosLogOut />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
