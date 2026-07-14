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
    <div className="page-bg select-none">

      {/* Header */}
      <Header />

      {/* Welcome Section */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">
          Welcome back 👋
        </h1>
        <p className="text-slate-400 mt-1">
          Here's an overview of your family's health tracker.
        </p>
      </div>

      {/* Overview Section */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6
      ">
        <Family_overview />
        <Medicine_overview />
        <Notification_overview />
      </div>

      {/* Medicine List Preview */}
      <div className="mt-8">
        <TodayMedicineCard />
      </div>

    </div>
  );
};

export default DashboardPage;
