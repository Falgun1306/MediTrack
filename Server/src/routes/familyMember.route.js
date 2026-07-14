import express from 'express';
import {isAuthenticated} from '../middlewares/auth.middleware.js'
import { addFamilyMember, deleteMember, getAllFamilyMemers, getFamilyMemerByID, updateFamilyMember } from '../controllers/familyMember.controller.js';

const router = express.Router();

router.post('/', isAuthenticated, addFamilyMember);
router.get('/get-members', isAuthenticated, getAllFamilyMemers);
router.get('/get-member/:memberid', isAuthenticated, getFamilyMemerByID);
router.patch('/update-member/:memberid', isAuthenticated, updateFamilyMember);
router.delete('/delete-member/:memberid', isAuthenticated, deleteMember);

export default router;