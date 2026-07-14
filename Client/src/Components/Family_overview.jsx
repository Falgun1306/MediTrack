import { useNavigate } from 'react-router-dom'
import useFamilyStore from '../Store/FamilyMembers.store.js';
import { FaUsers } from 'react-icons/fa';

const Family_overview = () => {
    const navigate = useNavigate();
    const members = useFamilyStore(state=>state.members);
    
    return (
        <div className="glass-card p-6 animate-slideUp stagger-1">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400">
                    <FaUsers className="text-lg" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-100">Family Members</h2>
                    <p className="text-sm text-slate-400">
                        Manage people taking medicines
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-4xl font-bold gradient-text">{members.length}</span>
                <button 
                   className="text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-200 group"
                   onClick={()=>navigate('/family')}
                >
                    View all 
                    <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    )
}

export default Family_overview
