import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {getAllNotification, getNotificationsByFamilyMemberId} from '../controllers/notifications.controller.js'

const router = express.Router();

router.get('/get-notifications', isAuthenticated, getAllNotification);
router.get('/get-notificatios-by-family-member/:familyMemberId', isAuthenticated, getNotificationsByFamilyMemberId);

export default router;