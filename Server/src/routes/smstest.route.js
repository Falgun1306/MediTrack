import express from "express";
import { testCall, testSMS } from "../controllers/smsTesting.controller.js";

const router = express.Router();

router.post("/send-test-sms", testSMS);
router.post("/send-test-call", testCall);

export default router;
