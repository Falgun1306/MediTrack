import Header from "../Components/Header";
import MedicineList from "../Features/Medicine/MedicineList";
import AddMedicine from "../Features/Medicine/AddMedicine";
import useMedicineStore from "../Store/Medicine.store.js";
import { useEffect, useState } from "react";
import EditMedicine from "../Features/Medicine/EditMedicine.jsx";
import MedicineModal from "../Components/WrappersComponents/MedicineModal.jsx";

const MedicinePage = () => {
  const fetchMedicine = useMedicineStore((state) => state.fetchMedicines);
  const memberId = useMedicineStore((state) => state.memberIdForMedicine);
  const showAddMedicine = useMedicineStore((state) => state.showAddMedicine);

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showEditMedicine, setShowEditMedicine] = useState(false);

  useEffect(() => {
    if (memberId) {
      fetchMedicine(memberId);
    }
  }, [memberId]);

  return (
    <div className="page-bg">

      {/* Header */}
      <Header />

      {/* Page Container */}
      <div className="max-w-6xl mx-auto mt-6 animate-fadeIn">
        <MedicineList
          setSelectedMedicine={setSelectedMedicine}
          setShowEditMedicine={setShowEditMedicine}
        />
      </div>

      {/* Add Medicine Modal */}
      {showAddMedicine && !showEditMedicine && (
        <AddMedicine />
      )}

      {/* Edit Medicine Modal */}
      {showEditMedicine && !showAddMedicine && (
        <EditMedicine
          selectedMedicine={selectedMedicine}
          setshowEditMedicine={setShowEditMedicine}
        />
      )}

    </div>
  );
};

export default MedicinePage;
