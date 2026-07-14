import React from 'react'
import { FaCapsules } from 'react-icons/fa';

const TodayMedicineCard = () => {
    return (
        <div className="mt-10 animate-slideUp" style={{ animationDelay: '0.25s', opacity: 0 }}>
            <h2 className="text-xl font-semibold mb-6 text-slate-100">
                Today's Medicines
            </h2>

            <div className="glass-card-static p-8 flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 animate-float">
                    <FaCapsules className="text-3xl text-cyan-400" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="badge" style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(20, 184, 166, 0.15))',
                        color: '#22d3ee',
                    }}>
                        Coming Soon
                    </span>
                </div>
                <p className="text-slate-400 text-sm text-center max-w-xs">
                    Track daily medicine schedules and mark doses as taken — feature arriving soon!
                </p>
            </div>
        </div>
    )
}

export default TodayMedicineCard
