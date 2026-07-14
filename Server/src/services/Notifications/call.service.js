import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const makeCall = async (to, message) => {
  try {
    const response = await client.calls.create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    console.log("Call initiated:", response.sid);
    return response;
  } catch (error) {
    console.error("Error making call:", error.message);
    throw error;
  }
};
