import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthStore from "../../Store/Auth.store.js";

const Login = () => {
    const navigate = useNavigate();
    const login = AuthStore(state => state.login);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setLoginData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await login(loginData.email, loginData.password);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f3ff] text-[#111c2d]">

            {/* LEFT SECTION */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center px-12 relative overflow-hidden bg-[#eef8ff] border-r border-[#bec8ce]/40">
                {/* Ambient Decorative Blurs */}
                <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#0d7a9e]/15 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#98f994]/25 blur-3xl"></div>

                <div className="relative z-10 text-center">
                    <h2 className="text-3xl font-extrabold font-headline text-[#00607e] mb-3">
                        Welcome Back
                    </h2>

                    <p className="text-center text-[#3f484d] max-w-md mb-8 leading-relaxed">
                        Sign in to manage your family's health schedules, track active prescriptions, and view refill notifications.
                    </p>

                    <button
                        className="btn-ghost px-8 py-3 rounded-full text-sm font-semibold tracking-wide"
                        onClick={() => navigate("/register")}
                    >
                        CREATE ACCOUNT
                    </button>
                </div>

                <img
                    src="/login_signUp.png"
                    alt="Medicine tracking illustration"
                    className="w-72 mt-8 opacity-90 animate-float relative z-10"
                    style={{ animationDelay: '0.5s' }}
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 min-h-screen md:min-h-0 py-8">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-[#bec8ce]/40 p-8 relative overflow-hidden animate-fadeInScale">

                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#00607e]"></div>

                    {/* Brand Header */}
                    <div className="flex justify-center mb-6 pt-2">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-xl bg-[#00607e] text-white flex items-center justify-center shadow-md shadow-[#00607e]/20">
                                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                            </div>
                            <span className="font-headline font-extrabold text-2xl text-[#00607e]">MediTrack</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold font-headline text-[#111c2d] mb-2 text-center">
                        Sign In
                    </h2>
                    <p className="text-center text-xs text-[#3f484d] mb-6">
                        Access your family health portal
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                placeholder="you@example.com"
                                className="input-stitch"
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                placeholder="••••••••"
                                className="input-stitch"
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="btn-primary w-full py-3 rounded-xl text-sm font-semibold tracking-wide mt-2"
                        >
                            LOG IN
                        </button>

                    </form>

                    {/* Bottom Link */}
                    <p className="text-center text-sm text-[#3f484d] mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#00607e] font-semibold hover:text-[#0d7a9e] transition-colors"
                        >
                            Create Account
                        </Link>
                    </p>

                    {/* Mobile Sign Up Link */}
                    <div className="md:hidden mt-4 text-center">
                        <button
                            onClick={() => navigate("/register")}
                            className="btn-ghost text-sm px-6 py-2 rounded-full w-full"
                        >
                            Sign Up
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );

};

export default Login;
