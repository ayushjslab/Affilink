import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "affiliate", "admin"],
      default: "customer",
      required: true,
    },
    isAffiliateActive: {
      type: Boolean,
      default: false,
    },
    affiliateCode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    referredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    affiliateStats: {
      totalClicks: { type: Number, default: 0 },
      totalReferrals: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      pendingPayout: { type: Number, default: 0 },
    },
    payoutDetails: {
      bankName: { type: String, trim: true },
      accountNumber: { type: String, trim: true },
      ifscCode: { type: String, trim: true },
      paypalEmail: { type: String, trim: true, lowercase: true },
      upiId: { type: String, trim: true },
    },
    isSuspended: { type: Boolean, default: false },
    suspensionReason: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.index({ affiliateCode: 1 });
UserSchema.index({ referredBy: 1 });


const User = models.User || model("User", UserSchema);

export default User;
