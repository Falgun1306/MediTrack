import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    phoneNum: {
      type: String,
      unique: true,
      sparse: true, // allows null but enforces uniqueness if present
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    
    password:{
        type: String,
        required: true
    },

    confirmPassword:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  }
);

const User = mongoose.model('User', userSchema);
export default User;
