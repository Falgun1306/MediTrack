import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
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
    };

    const handleDefaultFilter = async () => {
        await fetchAllNotifications();
        setSelectedMemberId('all');
    };

    useEffect(() => {
        fetchAllNotifications();
        fetchMembers();
    }, []);

    return (
        <div className="page-bg max-w-7xl mx-auto">
            <Header />

            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-6 glass-card-static p-4 sm:p-6 animate-fadeIn">

                    {/* Header Section */}
                    <div className="flex flex-col gap-4 mb-6 pb-4 border-b border-[#bec8ce]/30">

                        <div>
                            <h2 className="text-xl font-headline font-bold text-[#111c2d]">
                                Notification & Alert Center
                            </h2>
                            <p className="text-sm text-[#3f484d] mt-0.5">
                                Refill reminders and dose updates
                            </p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scroll-none">

                            <button
                                className={`btn-pill whitespace-nowrap ${selectedMemberId === "all"
                                        ? "btn-pill-active"
                                        : "btn-pill-inactive"
                                    }`}
                                onClick={handleDefaultFilter}
                            >
                                All Notifications
                            </button>

                            {members.map((member) => (
                                <button
                                    key={member._id}
                                    className={`btn-pill whitespace-nowrap ${selectedMemberId === member._id
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
                        <div className="text-center text-[#6f787e] py-16 animate-fadeIn">
                            <div className="w-16 h-16 rounded-full bg-[#fff5ed] text-[#7d4e00] flex items-center justify-center mx-auto mb-3">
                                <span className="material-symbols-outlined text-3xl">notifications</span>
                            </div>
                            <p className="font-semibold text-[#111c2d]">No notifications found.</p>
                            <p className="text-sm text-[#6f787e] mt-1">You are all caught up with your medicine alerts.</p>
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
                                        <div className="flex items-start gap-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-[#fff5ed] text-[#7d4e00] flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="material-symbols-outlined text-xl">notifications_active</span>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="font-bold font-headline text-[#111c2d] text-base">
                                                        {notification.memberName}
                                                    </span>
                                                    <span className="text-xs text-[#00607e] font-semibold bg-[#eef8ff] px-2 py-0.5 rounded-full border border-[#0d7a9e]/20">
                                                        {notification.medicineName}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-[#3f484d] font-medium mt-1">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status + Date */}
                                        <div className="flex flex-row sm:items-center justify-between sm:justify-end gap-3 lg:gap-6 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#bec8ce]/20">

                                            <span
                                                className={`badge uppercase text-[10px] font-bold tracking-wider ${isReceived
                                                        ? "badge-success"
                                                        : "badge-danger"
                                                    }`}
                                            >
                                                {isReceived ? "Sent" : "Pending"}
                                            </span>

                                            <span className="text-xs font-medium text-[#6f787e]">
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

};

export default NotificationPage;
