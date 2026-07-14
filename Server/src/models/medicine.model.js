import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // ownerName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    familyMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FamilyMember',
      required: true,
    },

    memberName: {
      type: String,
      ref: 'FamilyMember',
      required: true
    },

    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    dosePerDay: {
      type: Number,
      required: true,
      min: 1,
    },

    doseUnit: {
      type: String,
      required: true,
      enum: ['mg', 'ml', 'tablet'],
    },

    totalQuantity: {
      type: Number,
      required: true,
      min: 1,
    },

    remainingStock:{
      type: Number,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    alertBeforeDays: {
      type: Number,
      default: 5,
      min: 1,
    },

    status: {
      type: String,
      enum: ['active', 'completed', 'stopped'],
      default: 'active',
    },

    lastReminderSentAt: {
      type: Date,
      default: null
    },

    reminderCount: {
      type: Number,
      default: 0
    },

    lastEscalationAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;
