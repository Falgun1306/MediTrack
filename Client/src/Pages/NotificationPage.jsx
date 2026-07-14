import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import useNotificationStore from '../Store/Notification.store';
import useUIStore from '../Store/UI.store';
import Loader from '../Components/Loader';
import useFamilyStore from '../Store/FamilyMembers.store';

const NotificationPage = () => {
    const notifications = useNotificationStore(state => state.notifications);
    const isLoading = useUIStore(state => state.isLoading);
    const members = useFamilyStore(state => state.members);

    const fetchAllNotifications = useNotificationStore(state => state.fetchAllNotifications);
    const fetchNotificationsByMember = useNotificationStore(state => state.fetchNotificationsByMember);
    const fetchMembers = useFamilyStore(state => state.fetchMember);
    const [selectedMemberId, setSelectedMemberId] = useState('all');

    const handleFilter = async (memberId) => {
        await fetchNotificationsByMember(memberId);
        setSelectedMemberId(memberId);
    }

    const handleDefaultFilter = async () => {
        await fetchAllNotifications();
        setSelectedMemberId('all');
    }

    useEffect(() => {
        fetchAllNotifications();
        fetchMembers();
    }, []);

    return (
        <div className="page-bg">
            <Header />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="max-w-6xl mx-auto mt-6 glass-card-static p-4 sm:p-6 animate-fadeIn">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-6">

                        <h2 className="text-lg sm:text-xl font-semibold text-slate-100">
                            Notifications
                        </h2>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scroll-none">

                            <button
                                className={`btn-pill whitespace-nowrap ${
                                    selectedMemberId === "all"
                                        ? "btn-pill-active"
                                        : "btn-pill-inactive"
                                }`}
                                onClick={handleDefaultFilter}
                            >
                                All
                            </button>

                            {members.map((member) => (
                                <button
                                    key={member._id}
                                    className={`btn-pill whitespace-nowrap ${
                                        selectedMemberId === member._id
                                            ? "btn-pill-active"
                                            : "btn-pill-inactive"
                                    }`}
                                    onClick={() => handleFilter(member._id)}
                                >
                                    {member.name}
                                </button>
                            ))}

                        </div>
                    </div>

                    {/* Empty State */}
                    {notifications.length === 0 ? (
                        <div className="text-center text-slate-400 py-16 animate-fadeIn">
                            <div className="text-4xl mb-3">🔔</div>
                            <p className="font-medium">No notifications found.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">

                            {notifications.map((notification, index) => {
                                const isReceived =
                                    notification.status === "sent";

                                const date = new Date(notification.sentAt);
                                const formatted = `${String(
                                    date.getDate()
                                ).padStart(2, "0")}-${String(
                                    date.getMonth() + 1
                                ).padStart(2, "0")}-${date.getFullYear()}`;

                                return (
                                    <div
                                        key={notification._id}
                                        className="list-card flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 animate-slideUp"
                                        style={{ animationDelay: `${index * 0.05}s`, opacity: 0 }}
                                    >
                                        {/* Left Info Section */}
                                        <div className="flex flex-col gap-1">

                                            <p className="text-xs text-slate-500 uppercase tracking-wider">
                                                Member
                                            </p>
                                            <p className="font-semibold text-slate-100">
                                                {notification.memberName}
                                            </p>

                                            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wider">
                                                Medicine
                                            </p>
                                            <p className="font-medium text-cyan-400">
                                                {notification.medicineName}
                                            </p>
                                        </div>

                                        {/* Message */}
                                        <div className="text-sm text-slate-300 font-medium lg:max-w-md">
                                            {notification.message}
                                        </div>

                                        {/* Status + Date */}
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-6">

                                            <span
                                                className={`badge ${
                                                    isReceived
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                }`}
                                            >
                                                {isReceived ? "Received" : "Not Received"}
                                            </span>

                                            <span className="text-sm text-slate-400">
                                                {formatted}
                                            </span>

                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    )}
                </div>
            )}
        </div>
    );

}

export default NotificationPage
