import mongoose from 'mongoose';

const familyMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    // ownerName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    relation: {
      type: String,
      required: true,
      enum: ['self', 'father', 'mother', 'spouse', 'child', 'brother', 'sister'],
    },

    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const familyMember = mongoose.model('FamilyMember', familyMemberSchema);
export default familyMember;