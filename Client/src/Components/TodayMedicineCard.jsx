import React from 'react';
import { FaCapsules } from 'react-icons/fa';

const TodayMedicineCard = () => {
    return (
        <div className="mt-8 animate-slideUp" style={{ animationDelay: '0.25s', opacity: 0 }}>
            <h2 className="text-xl font-headline font-bold mb-4 text-[#111c2d]">
                Today's Medicine Schedule
            </h2>

            <div className="glass-card-static p-8 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#eef8ff] text-[#00607e] flex items-center justify-center animate-float">
                    <FaCapsules className="text-2xl" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="badge badge-info text-xs font-semibold">
                        Upcoming Schedule Tracker
                    </span>
                </div>
                <p className="text-[#3f484d] text-sm max-w-sm">
                    Daily dose logging, time slot reminders, and dose confirmation updates.
                </p>
            </div>
        </div>
    );
};

export default TodayMedicineCard;
