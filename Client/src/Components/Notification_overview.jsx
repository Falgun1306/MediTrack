import React from 'react'
import { useNavigate } from 'react-router-dom'
import useNotificationStore from '../Store/Notification.store';
import { FaBell } from 'react-icons/fa';

const Notification_overview = () => {
    const navigate = useNavigate();
    const fetchAllNotifications = useNotificationStore(state=>state.fetchAllNotifications);
    const notifications = useNotificationStore(state=>state.notifications);

    const handleViewNotification = ()=>{
        fetchAllNotifications();
        navigate('/all-notifications');
    }

    return (
        <div className="glass-card p-6 animate-slideUp stagger-3">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 text-amber-400">
                    <FaBell className="text-lg" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-100">Notifications</h2>
                    <p className="text-sm text-slate-400">
                        See notifications
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-4xl font-bold" style={{
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>{notifications.length}</span>
                <button 
                  className="text-sm text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-200 group"
                  onClick={handleViewNotification}
                >
                    View all
                    <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    )
}

export default Notification_overview
