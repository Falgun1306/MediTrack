import Family_overview from "../Components/Family_overview";
import TodayMedicineCard from "../Components/TodayMedicineCard";
import Medicine_overview from "../Components/Medicine_overview";
import Header from "../Components/Header";
import useFamilyStore from "../Store/FamilyMembers.store";
import { useEffect } from "react";
import Notification_overview from "../Components/Notification_overview";

const DashboardPage = () => {
  const members = useFamilyStore((state) => state.members);
  const fetchMember = useFamilyStore((state) => state.fetchMember);

  useEffect(() => {
    if (members.length === 0) {
      fetchMember();
    }
  }, []);

  return (
    <div className="page-bg select-none max-w-7xl mx-auto">

      {/* Header */}
      <Header />

      {/* Welcome Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-white border border-[#bec8ce]/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge badge-info font-medium">Family Health Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-headline text-[#00607e]">
            Dashboard Overview
          </h1>
          <p className="text-[#3f484d] mt-1 text-sm sm:text-base">
            Track daily medications, manage family schedules, and receive timely alerts.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#eef8ff] text-[#00607e] border border-[#0d7a9e]/20">
            {members.length} Family {members.length === 1 ? 'Member' : 'Members'}
          </span>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6
      ">
        <Family_overview />
        <Medicine_overview />
        <Notification_overview />
      </div>

      {/* Medicine Schedule Card */}
      <div className="mt-8">
        <TodayMedicineCard />
      </div>

    </div>
  );
};

export default DashboardPage;
