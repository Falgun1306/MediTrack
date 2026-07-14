import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addMedicine, deleteMedicine, getAllMedicines, getMedicineByFamilyMember, stopMedicine, updateMedicine } from "../controllers/medicine.controller.js";

const router = express.Router();

router.post('/', isAuthenticated, addMedicine);
router.get('/all-medicines', isAuthenticated, getAllMedicines);
router.get('/get-member-medicines/:familyMemberId', isAuthenticated, getMedicineByFamilyMember);
router.patch('/update-medicine/:medicineId', isAuthenticated, updateMedicine);
router.patch('/stop-medicine/:medicineId', isAuthenticated, stopMedicine);
router.delete('/delete-medicine/:medicineId', isAuthenticated, deleteMedicine);

export default router;