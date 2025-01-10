import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  refreshToken: string;
  _id: Schema.Types.ObjectId;
}

const UserSchema: Schema<IUser> = new Schema({
  userName: {
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
  refreshToken: { type: String },
});

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
