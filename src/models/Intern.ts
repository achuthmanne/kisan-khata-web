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
  startDate?: Date;
  endDate?: Date;
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
    startDate: { type: Date },
    endDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Automatically generate a referral code when the intern is approved
InternSchema.pre("save", function () {
  const doc = this as unknown as IIntern;
  if (doc.isModified("status") && doc.status === "Approved" && !doc.referralCode) {
    // Generates something like KK-JOH-4921
    const namePrefix = doc.name ? doc.name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, "X") : "INT";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    doc.referralCode = `KK-${namePrefix}-${randomNum}`;
  }
});

// Prevent mongoose from compiling the model multiple times in Next.js
export default mongoose.models.Intern || mongoose.model<IIntern>("Intern", InternSchema);
