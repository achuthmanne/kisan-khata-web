import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Intern from '@/models/Intern';

// Extremely basic protection for this example. 
// In production, use next-auth or a proper JWT admin session.
export async function GET() {
  try {
    await dbConnect();

    // Fetch all interns, sorted by newest first
    const interns = await Intern.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ interns }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching interns:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
