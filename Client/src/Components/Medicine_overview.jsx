import React from 'react'
import { useNavigate } from 'react-router-dom'
import useMedicineStore from '../Store/Medicine.store.js';
import { FaCapsules } from 'react-icons/fa';

const Medicine_overview = () => {
    const navigate = useNavigate();
    const allMedicines = useMedicineStore(state => state.AllMedicines);
    const fetchAllMedicines = useMedicineStore(state => state.fetchAllMedicines);
    const activeMedicines = allMedicines.filter(
        (medicine) => medicine.status === 'active'
    );

    const handleMedicineOverView = () => {
        fetchAllMedicines();
        navigate('/all-medicines');
    };

    return (
        <div className="glass-card p-6 animate-slideUp stagger-2">
            <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#e6f9e7] text-[#006e1c] flex items-center justify-center shrink-0">
                    <FaCapsules className="text-xl" />
                </div>
                <div>
                    <h2 className="text-lg font-headline font-bold text-[#111c2d]">Active Medicines</h2>
                    <p className="text-sm text-[#3f484d]">
                        Medicines currently in use
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#bec8ce]/30">
                <span className="text-4xl font-headline font-extrabold text-[#006e1c]">
                    {activeMedicines.length}
                </span>
                <button
                    className="text-sm text-[#00607e] font-semibold hover:text-[#0d7a9e] transition-colors duration-200 group flex items-center gap-1"
                    onClick={handleMedicineOverView}
                >
                    View all
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    );
};

export default Medicine_overview;
