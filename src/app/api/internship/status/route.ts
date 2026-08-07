import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Intern from '@/models/Intern';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await dbConnect();

    const intern = await Intern.findOne({ email: email.toLowerCase() });

    if (!intern) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 });
    }

    // Return the status and necessary details without exposing too much info
    return NextResponse.json({
      name: intern.name,
      status: intern.status,
      referralCode: intern.referralCode || null,
      village: intern.village,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching intern status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
