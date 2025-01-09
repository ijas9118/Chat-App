import mongoose, { Schema, Document, Model } from "mongoose";

interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId;
  content: string;
  chat: mongoose.Schema.Types.ObjectId;
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  MessageSchema
);

export default Message;
