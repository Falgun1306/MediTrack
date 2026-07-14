import cron from 'node-cron'
import { runMedicineReminderCheck } from '../services/reminder.service.js'
// * * * * *
// | | | | |
// | | | | └── Day of week (0–7)
// | | | └──── Month (1–12)
// | | └────── Day of month (1–31)
// | └──────── Hour (0–23)
// └────────── Minute (0–59)

const startReminderScheduler = () => {

  cron.schedule("* * * * *", async () => {
    console.log("Running daily reminder check...");
    await runMedicineReminderCheck();
  }, {
    timezone: "Asia/Kolkata"
  });

  console.log("Reminder scheduler started...");
};

export default startReminderScheduler;

