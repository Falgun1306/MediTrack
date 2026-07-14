import React from "react";

const Loader = ({ fullScreen = true }) => {
    return (
        <div
            className={`
                flex flex-col items-center justify-center w-full gap-4
                ${fullScreen ? "min-h-screen" : "py-20"}
            `}
        >
            <div className="relative flex items-center justify-center">

                {/* Outer Ring */}
                <div
                    className="
                        w-14 h-14 
                        sm:w-16 sm:h-16 
                        md:w-20 md:h-20 
                        rounded-full 
                        animate-spin
                    "
                    style={{
                        border: '3px solid transparent',
                        borderTop: '3px solid #06b6d4',
                        borderRight: '3px solid #22d3ee',
                        boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)',
                    }}
                ></div>

                {/* Inner Ring */}
                <div
                    className="
                        absolute
                        w-8 h-8
                        sm:w-10 sm:h-10
                        md:w-12 md:h-12
                        rounded-full
                        animate-spin
                    "
                    style={{
                        border: '3px solid transparent',
                        borderTop: '3px solid #10b981',
                        borderLeft: '3px solid #059669',
                        animationDirection: 'reverse',
                        animationDuration: '0.8s',
                    }}
                ></div>

                {/* Center Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 animate-pulseGlow"></div>
            </div>

            <p className="text-sm font-medium text-slate-400 animate-shimmer">
                Loading...
            </p>
        </div>
    );
};

export default Loader;
