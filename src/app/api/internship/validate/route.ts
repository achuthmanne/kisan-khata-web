import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Intern from '@/models/Intern';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Code is required' }, { status: 400 });
    }

    await connectDB();

    const intern = await Intern.findOne({ referralCode: code.toUpperCase(), status: 'Approved' });

    if (intern) {
      return NextResponse.json({ valid: true, internName: intern.fullName });
    } else {
      return NextResponse.json({ valid: false, message: 'Invalid or unapproved code' }, { status: 404 });
    }

  } catch (error) {
    console.error('Error validating referral code:', error);
    return NextResponse.json({ valid: false, message: 'Server error' }, { status: 500 });
  }
}
