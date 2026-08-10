import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FarmerTracking from "@/models/FarmerTracking";
import Intern from "@/models/Intern";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { internReferralCode, farmerFirebaseUid, deviceId, eventType, metadata } = body;

    // 1. Validate required fields
    if (!internReferralCode || !farmerFirebaseUid || !deviceId || !eventType) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validEventTypes = [
      "FARMER_ONBOARDED",
      "AGRICONNECT_USAGE",
      "LABOR_LOG",
      "PAYMENT_TRACKED",
      "VEHICLE_ADDED",
      "EXPENSE_LOG",
      "SALE_LOG"
    ];

    if (!validEventTypes.includes(eventType)) {
      return NextResponse.json(
        { success: false, message: "Invalid event type" },
        { status: 400 }
      );
    }

    // 2. Validate the Intern Referral Code
    const intern = await Intern.findOne({ referralCode: internReferralCode, status: "Approved" });
    if (!intern) {
      return NextResponse.json(
        { success: false, message: "Invalid or inactive referral code" },
        { status: 404 }
      );
    }

    // 3. Fraud Prevention: Check if this device already triggered this event type
    const existingTracking = await FarmerTracking.findOne({
      deviceId,
      eventType,
    });

    if (existingTracking) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Fraud alert: This device has already recorded a ${eventType} event.` 
        },
        { status: 409 } // Conflict
      );
    }

    // 4. Record the tracking event
    const newTracking = await FarmerTracking.create({
      internReferralCode,
      farmerFirebaseUid,
      deviceId,
      eventType,
      metadata
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Tracking event recorded successfully", 
        data: newTracking 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in /api/tracking/event:", error);

    // Handle MongoDB duplicate key error (fallback if race condition happens)
    if (error.code === 11000) {
        return NextResponse.json(
            { success: false, message: "Duplicate tracking event detected for this device." },
            { status: 409 }
        );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
