import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import FarmerTracking from "@/models/FarmerTracking";
import Intern from "@/models/Intern";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const referralCode = searchParams.get("referralCode");

    if (!referralCode) {
      return NextResponse.json({ success: false, message: "Referral code is required" }, { status: 400 });
    }

    // 1. Verify Intern exists
    const intern = await Intern.findOne({ referralCode, status: "Approved" });
    if (!intern) {
      return NextResponse.json({ success: false, message: "Invalid or inactive referral code" }, { status: 404 });
    }

    // 2. Aggregate tracking events for this referral code
    const aggregateData = await FarmerTracking.aggregate([
      { $match: { internReferralCode: referralCode } },
      {
        $group: {
          _id: null,
          farmersOnboarded: { $sum: { $cond: [{ $eq: ["$eventType", "FARMER_ONBOARDED"] }, 1, 0] } },
          agriConnectUsages: { $sum: { $cond: [{ $eq: ["$eventType", "AGRICONNECT_USAGE"] }, 1, 0] } },
          laborLogs: { $sum: { $cond: [{ $eq: ["$eventType", "LABOR_LOG"] }, 1, 0] } },
          paymentsTracked: { $sum: { $cond: [{ $eq: ["$eventType", "PAYMENT_TRACKED"] }, 1, 0] } },
          vehiclesAdded: { $sum: { $cond: [{ $eq: ["$eventType", "VEHICLE_ADDED"] }, 1, 0] } },
          expensesLogged: { $sum: { $cond: [{ $eq: ["$eventType", "EXPENSE_LOG"] }, 1, 0] } },
          salesLogged: { $sum: { $cond: [{ $eq: ["$eventType", "SALE_LOG"] }, 1, 0] } },
          machineLogs: { $sum: { $cond: [{ $eq: ["$eventType", "MACHINE_LOG"] }, 1, 0] } },
          villages: { 
            $addToSet: { 
              $cond: [
                { $eq: ["$eventType", "FARMER_ONBOARDED"] },
                { $trim: { input: { $toLower: "$metadata.villageName" } } },
                null
              ]
            } 
          }
        }
      }
    ]);

    const stats = aggregateData[0] || {
      farmersOnboarded: 0,
      agriConnectUsages: 0,
      laborLogs: 0,
      paymentsTracked: 0,
      vehiclesAdded: 0,
      expensesLogged: 0,
      salesLogged: 0,
      machineLogs: 0,
      villages: []
    };

    const uniqueVillages = stats.villages.filter((v: any) => v).length;
    const dataEntryUsages = stats.laborLogs + stats.paymentsTracked + stats.vehiclesAdded + stats.expensesLogged + stats.salesLogged + stats.machineLogs;

    return NextResponse.json({
      success: true,
      data: {
        intern: {
          name: intern.name,
          role: intern.role,
          startDate: intern.startDate,
          endDate: intern.endDate,
        },
        stats: {
          farmersOnboarded: stats.farmersOnboarded,
          agriConnectUsages: stats.agriConnectUsages,
          dataEntryUsages,
          uniqueVillages,
          villagesList: stats.villages.filter((v: any) => v),
          breakdown: {
            laborLogs: stats.laborLogs,
            paymentsTracked: stats.paymentsTracked,
            vehiclesAdded: stats.vehiclesAdded,
            expensesLogged: stats.expensesLogged,
            salesLogged: stats.salesLogged,
            machineLogs: stats.machineLogs
          }
        }
      }
    });

  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
