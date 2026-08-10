import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Intern from '@/models/Intern';
import { sendApprovalEmail } from '@/lib/email';

function generateReferralCode(name: string) {
  // E.g., Achuth -> KK-ACH-1234
  const prefix = name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, "X");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `KK-${prefix}-${randomNum}`;
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Intern ID is required' }, { status: 400 });
    }

    await dbConnect();

    const intern = await Intern.findById(id);

    if (!intern) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    }

    if (intern.status === 'Approved') {
      return NextResponse.json({ error: 'Applicant is already approved' }, { status: 400 });
    }

    // Generate a unique referral code
    let refCode = generateReferralCode(intern.name);
    // Ensure uniqueness (in a real app, you'd loop until unique)
    let isUnique = false;
    while (!isUnique) {
      const existing = await Intern.findOne({ referralCode: refCode });
      if (existing) {
        refCode = generateReferralCode(intern.name);
      } else {
        isUnique = true;
      }
    }

    // Approve the intern
    intern.status = 'Approved';
    intern.referralCode = refCode;
    
    // Set 30-day internship duration
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 30);
    intern.startDate = now;
    intern.endDate = endDate;
    
    await intern.save();

    // Trigger Email
    await sendApprovalEmail(intern.email, intern.name, refCode);

    return NextResponse.json({ success: true, intern }, { status: 200 });
  } catch (error: any) {
    console.error('Error approving intern:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
