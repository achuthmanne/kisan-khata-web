import mongoose, { Schema, Document } from "mongoose";

export interface IFarmerTracking extends Document {
  internReferralCode: string;
  farmerFirebaseUid: string;
  deviceId: string;
  eventType: "FARMER_ONBOARDED" | "AGRICONNECT_USAGE" | "LABOR_LOG" | "PAYMENT_TRACKED" | "VEHICLE_ADDED" | "EXPENSE_LOG" | "SALE_LOG";
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const FarmerTrackingSchema: Schema = new Schema(
  {
    internReferralCode: { type: String, required: true, index: true },
    farmerFirebaseUid: { type: String, required: true },
    deviceId: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["FARMER_ONBOARDED", "AGRICONNECT_USAGE", "LABOR_LOG", "PAYMENT_TRACKED", "VEHICLE_ADDED", "EXPENSE_LOG", "SALE_LOG"],
      required: true,
    },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

// We removed the generic unique index because a device can submit multiple LABOR_LOGs, etc.
// Uniqueness for FARMER_ONBOARDED will be enforced at the API level.

export default mongoose.models.FarmerTracking || mongoose.model<IFarmerTracking>("FarmerTracking", FarmerTrackingSchema);
