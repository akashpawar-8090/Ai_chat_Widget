import mongoose from "mongoose";

const BotSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,

    themeColor: {
      type: String,
      default: String,
    },

    systemPrompt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Bot ||
  mongoose.model("Bot", BotSchema);