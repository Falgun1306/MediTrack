import familyMember from "../models/FamilyMember.model.js";
import Medicine from "../models/medicine.model.js";
import Notification from "../models/Notifications.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

export const getAllNotification = asyncHandler(async (req, res, next) => {
    const notifications = await Notification.find({
        userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: notifications,
    });
});

export const getNotificationsByFamilyMemberId = asyncHandler(async (req, res, next) => {
    const { familyMemberId } = req.params;

    const FamilyMember = await familyMember.findOne({
        _id: familyMemberId,
        userId: req.user._id,
    });

    if (!FamilyMember) {
        return res.status(404).json({
            success: false,
            message: 'Family member not found',
        });
    }

    const notifications = await Notification.find({
        userId: req.user._id,
        familyMemberId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: notifications.length,
        data: notifications,
    });
});


//In database there is different MedicineId with same name so 
//find one solution to filter notifications by medicine name 
const getNotificationsByMedicineId = asyncHandler(async(req, res, next)=>{
    const { medicineId } = req.params;

    const medicine = await Medicine.findOne({
        userId: req.user._id,
        _id: medicineId
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
    });
})