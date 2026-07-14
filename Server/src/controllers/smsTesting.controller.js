import { sendSMS } from "../services/Notifications/sms.service.js";
import { makeCall } from "../services/Notifications/call.service.js";

export const testSMS = async (req, res) => {
  try {
    const phone = req.body.phone;

    await sendSMS(phone, "🚨 Test SMS from your Medicine Reminder App");

    res.status(200).json({
      success: true,
      message: "Test SMS sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const testCall = async (req, res) => {
  try {
    const phone = req.body.phone;

    await makeCall(
      phone,
      "Hello. This is your medicine reminder application. Your stock is low."
    );

    res.status(200).json({
      success: true,
      message: "Test call initiated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};