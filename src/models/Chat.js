import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    botId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bot",
    },

    userMessage: String,

    aiResponse: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chat ||
  mongoose.model("Chat", ChatSchema);