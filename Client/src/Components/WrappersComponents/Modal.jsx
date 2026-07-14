import useFamilyStore from "../../Store/FamilyMembers.store";

const Modal = ({ children }) => {
  const {setShowAddMember} = useFamilyStore();
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close button */}
        <button
          onClick={()=>setShowAddMember(false)}
          className="close-btn"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
