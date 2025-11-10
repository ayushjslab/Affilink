import { Schema, model, models } from "mongoose";

const ConversionSchema = new Schema(
  {
    affiliate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    originalSaleAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    commissionRateUsed: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    commissionAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid"],
      default: "pending",
    },
    trackingClick: {
      type: Schema.Types.ObjectId,
      ref: "Click",
      default: null,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      default: null,
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

ConversionSchema.index({ affiliate: 1, createdAt: -1 });
ConversionSchema.index({ product: 1 });
ConversionSchema.index({ status: 1 });

const Conversion = models.Conversion || model("Conversion", ConversionSchema);
export default Conversion;
