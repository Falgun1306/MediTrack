import React from 'react'
import { useNavigate } from 'react-router-dom'
import useMedicineStore from '../Store/Medicine.store.js';
import { FaCapsules } from 'react-icons/fa';

const Medicine_overview = () => {
    const navigate = useNavigate();
    const allMedicines = useMedicineStore(state=>state.AllMedicines);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const activeMedicines = allMedicines.filter(
        (medicine) => medicine.status === 'active'
    )
    
    
    const handleMedicineOverView = ()=>{
        fetchAllMedicines();
        navigate('/all-medicines');
    }

    return (
        <div className="glass-card p-6 animate-slideUp stagger-2">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 text-emerald-400">
                    <FaCapsules className="text-lg" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-100">Active Medicines</h2>
                    <p className="text-sm text-slate-400">
                        Medicines currently in use
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-4xl font-bold" style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>{activeMedicines.length}</span>
                <button 
                  className="text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-200 group"
                  onClick={handleMedicineOverView}
                >
                    View all
                    <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    )
}

export default Medicine_overview
