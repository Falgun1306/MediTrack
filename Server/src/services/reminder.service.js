import Medicine from "../models/medicine.model.js";
import { createNotification } from "./notification.service.js";
import { makeCall } from "./Notifications/call.service.js";
import { sendSMS } from "./Notifications/sms.service.js";
import { calculateRemainingStock } from "./stock.service.js";

export const runMedicineReminderCheck = async () => {
  try {
    const activeMedicines = await Medicine.find({
      status: "active",
    }).populate("userId"); // important to get user phone

    if (!activeMedicines.length) {
      console.log("No active medicines found.");
      return;
    }

    console.log(`Checking ${activeMedicines.length} active medicines...`);

    const today = new Date();
    const todayDateString = today.toDateString(); // Used to compare dates safely
    const currentMinute = today.toISOString().slice(0, 16);


    for (const medicine of activeMedicines) {

      const stockData = calculateRemainingStock({
        startDate: medicine.startDate,
        dosePerDay: medicine.dosePerDay,
        totalQuantity: medicine.totalQuantity,
      });

      const { remaining } = stockData;

      console.log(medicine.medicineName, "Remaining:", remaining);
      medicine.remainingStock = remaining;
      await medicine.save();

      // -------------------------------
      // 1️⃣ If stock finished
      // -------------------------------
      if (remaining <= 0) {
        medicine.status = "completed";
        await medicine.save();
        console.log(`${medicine.medicineName} marked completed.`);
        continue; // skip reminder logic
      }

      // -------------------------------
      // 2️⃣ Reminder logic
      // -------------------------------
      if (remaining <= medicine.alertBeforeDays) {

        const lastReminderDate = medicine.lastReminderSentAt
          ? new Date(medicine.lastReminderSentAt).toISOString().slice(0, 16)
          : null;

        // Send only once per day
        if (lastReminderDate !== currentMinute) {

          const formattedPhone = `+91${medicine.userId.phoneNum}`;
          const message = `Reminder: ${medicine.memberName}'s medicine ${medicine.medicineName} stock is low. Remaining: ${remaining} ${medicine.doseUnit}`;
          console.log("phone number: ", formattedPhone);

          let status = "sent";

          
          await sendSMS(formattedPhone, message);

          await createNotification({
            userId: medicine.userId,
            familyMemberId: medicine.familyMemberId,
            memberName: medicine.memberName,
            medicineId: medicine._id,
            medicineName: medicine.medicineName,
            type: "reminder",
            message,
            status
          });

          medicine.reminderCount += 1;
          medicine.lastReminderSentAt = today;

          // -------------------------------
          // 3️⃣ Escalation logic
          // -------------------------------
          if (medicine.reminderCount >= 2) {

            const lastEscalationDate = medicine.lastEscalationAt
              ? new Date(medicine.lastEscalationAt).toDateString()
              : null;

            // Avoid calling multiple times same day
            if (lastEscalationDate !== currentMinute) {

              // 👉 MAKE CALL HERE (for now console)
              await makeCall(
                formattedPhone,
                `Urgent reminder. ${medicine.memberName}'s medicine ${medicine.medicineName} stock is low. Remaining: ${remaining} ${medicine.doseUnit}.`
              );
            
              medicine.lastEscalationAt = today;
            }
          }

          await medicine.save();
        }
      }
    }

    console.log("Reminder check completed.");

  } catch (error) {
    console.error("Error running reminder check:", error);
  }
};
