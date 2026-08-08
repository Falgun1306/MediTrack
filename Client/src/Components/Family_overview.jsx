
import { useNavigate } from 'react-router-dom';
import useFamilyStore from '../Store/FamilyMembers.store.js';
import { FaUsers } from 'react-icons/fa';

const Family_overview = () => {
    const navigate = useNavigate();
    const members = useFamilyStore(state => state.members);

    return (
        <div className="glass-card p-6 animate-slideUp stagger-1">
            <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#eef8ff] text-[#00607e] flex items-center justify-center shrink-0">
                    <FaUsers className="text-xl" />
                </div>
                <div>
                    <h2 className="text-lg font-headline font-bold text-[#111c2d]">Family Members</h2>
                    <p className="text-sm text-[#3f484d]">
                        Manage people taking medicines
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#bec8ce]/30">
                <span className="text-4xl font-headline font-extrabold text-[#00607e]">{members.length}</span>
                <button
                    className="text-sm text-[#00607e] font-semibold hover:text-[#0d7a9e] transition-colors duration-200 group flex items-center gap-1"
                    onClick={() => navigate('/family')}
                >
                    View all
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    );
};

export default Family_overview;
