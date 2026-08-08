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
                        borderTop: '3px solid #00607e',
                        borderRight: '3px solid #0d7a9e',
                        boxShadow: '0 0 15px rgba(0, 96, 126, 0.25)',
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
                        borderTop: '3px solid #006e1c',
                        borderLeft: '3px solid #7ddc7a',
                        animationDirection: 'reverse',
                        animationDuration: '0.8s',
                    }}
                ></div>

                {/* Center Dot */}
                <div className="absolute w-3 h-3 rounded-full bg-[#00607e] animate-pulseGlow"></div>
            </div>

            <p className="text-sm font-semibold text-[#3f484d] animate-shimmer">
                Loading MediTrack...
            </p>
        </div>
    );
};

export default Loader;
