import React from 'react'
import useMedicineStore from '../../Store/Medicine.store'

const MedicineModal = ({children}) => {
    const setShowAddMedicine = useMedicineStore(state=>state.setShowAddMedicine)
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close button */}
                <button
                    onClick={() => setShowAddMedicine(false)}
                    className="close-btn"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    )
}

export default MedicineModal
