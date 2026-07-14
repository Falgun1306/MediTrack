import Notification from "../models/Notifications.model.js";

export const createNotification = async ({
  userId,
  familyMemberId,
  memberName,
  medicineId,
  medicineName,
  type,
  message,
  status,
}) => {
  try {
    await Notification.create({
      userId,
      familyMemberId,
      memberName,
      medicineId,
      medicineName,
      type,
      message,
      status,
    });
    console.log("notification created successfully in DB");
    
  } catch (error) {
    console.error("Error storing notification:", error);
  }
};