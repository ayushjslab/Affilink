import { Schema, model, models } from "mongoose";

const ClickSchema = new Schema(
  {
    affiliate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },
    ipAddress: {
      type: String, 
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    clickDate: {
      type: Date,
      default: Date.now, 
      required: true,
    },
    isConverted: {
      type: Boolean,
      default: false, 
    },
    conversion: {
      type: Schema.Types.ObjectId,
      ref: "Conversion",
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

const Click = models.Click || model("Click", ClickSchema);
export default Click;
