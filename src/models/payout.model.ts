import { Schema, model, models } from "mongoose";

const PayoutSchema = new Schema(
  {
    affiliate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
    conversionsIncluded: [
      {
        type: Schema.Types.ObjectId,
        ref: "Conversion",
      },
    ],
    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


const Payout = models.Payout || model("Payout", PayoutSchema);
export default Payout;
