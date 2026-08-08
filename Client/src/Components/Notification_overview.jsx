import React from 'react';
import { useNavigate } from 'react-router-dom';
import useNotificationStore from '../Store/Notification.store';
import { FaBell } from 'react-icons/fa';

const Notification_overview = () => {
    const navigate = useNavigate();
    const fetchAllNotifications = useNotificationStore(state => state.fetchAllNotifications);
    const notifications = useNotificationStore(state => state.notifications);

    const handleViewNotification = () => {
        fetchAllNotifications();
        navigate('/all-notifications');
    };

    return (
        <div className="glass-card p-6 animate-slideUp stagger-3">
            <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#fff5ed] text-[#7d4e00] flex items-center justify-center shrink-0">
                    <FaBell className="text-xl" />
                </div>
                <div>
                    <h2 className="text-lg font-headline font-bold text-[#111c2d]">Notifications</h2>
                    <p className="text-sm text-[#3f484d]">
                        See notifications & alerts
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#bec8ce]/30">
                <span className="text-4xl font-headline font-extrabold text-[#7d4e00]">
                    {notifications.length}
                </span>
                <button
                    className="text-sm text-[#00607e] font-semibold hover:text-[#0d7a9e] transition-colors duration-200 group flex items-center gap-1"
                    onClick={handleViewNotification}
                >
                    View all
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
            </div>
        </div>
    );
};

export default Notification_overview;
