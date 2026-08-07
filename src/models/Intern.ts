import mongoose, { Schema, Document } from "mongoose";

export interface IIntern extends Document {
  name: string;
  phone: string;
  email: string;
  role: string;
  college?: string;
  village: string;
  motivation: string;
  status: "Pending" | "Approved" | "Rejected";
  referralCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InternSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    college: { type: String },
    village: { type: String, required: true },
    motivation: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    referralCode: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from compiling the model multiple times in Next.js
export default mongoose.models.Intern || mongoose.model<IIntern>("Intern", InternSchema);
