import { GiMedicines } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../utilities/axiosInstance";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();

    const [signUpData, setsignUpData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        setsignUpData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/user/register', {
                name: signUpData.name,
                phoneNum: Number(signUpData.phoneNumber),
                email: signUpData.email,
                password: signUpData.password,
                confirmPassword: signUpData.confirmPassword
            });

            toast.success(response.data.message || "Registration successful");
            navigate('/login');

        } catch (error) {
            console.log("something went wrong: ", error.message);
            toast.error("please check details");
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row" style={{
            background: 'linear-gradient(145deg, #0f172a 0%, #0c1222 50%, #0f172a 100%)'
        }}>

            {/* LEFT SECTION */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center px-12 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(20, 184, 166, 0.05) 100%)',
                    borderRight: '1px solid rgba(148, 163, 184, 0.08)',
                }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20 animate-float"
                    style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)' }}
                ></div>
                <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full opacity-15 animate-float"
                    style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent)', animationDelay: '1.5s' }}
                ></div>

                <h2 className="text-3xl font-bold gradient-text mb-4">
                    Already a member?
                </h2>

                <p className="text-center text-slate-400 max-w-md mb-8">
                    Login and manage your medicines easily.
                </p>

                <button
                    className="btn-primary px-8 py-3 rounded-full text-sm font-semibold tracking-wide"
                    onClick={() => navigate("/login")}
                >
                    SIGN IN
                </button>

                <img
                    src="/login_signUp.png"
                    alt="Medicine tracking illustration"
                    className="w-64 mt-10 opacity-80 animate-float"
                    style={{ animationDelay: '0.5s' }}
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 min-h-screen md:min-h-0">

                <div className="w-full max-w-md glass-card-static p-8 animate-fadeInScale">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/20">
                                <GiMedicines className="text-xl" />
                            </div>
                            <span className="gradient-text">MediTrack</span>
                        </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-8 text-center">
                        Sign Up
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={signUpData.name}
                                placeholder="John Doe"
                                onChange={handleInputChange}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={signUpData.phoneNumber}
                                placeholder="+91 9876543210"
                                onChange={handleInputChange}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={signUpData.email}
                                placeholder="you@example.com"
                                onChange={handleInputChange}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={signUpData.password}
                                placeholder="••••••••"
                                onChange={handleInputChange}
                                className="input-dark"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={signUpData.confirmPassword}
                                placeholder="••••••••"
                                onChange={handleInputChange}
                                className="input-dark"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3 rounded-xl text-sm tracking-wide"
                        >
                            SIGN UP
                        </button>

                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
                        >
                            Login
                        </Link>
                    </p>

                    {/* Mobile Login Link */}
                    <div className="md:hidden mt-4 text-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="btn-ghost text-sm px-6 py-2 rounded-full"
                        >
                            Sign In Instead
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default SignUp
