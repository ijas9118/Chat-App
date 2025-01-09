import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://avatar.iran.liara.run/public/boy",
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
