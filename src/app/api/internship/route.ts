import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Intern from '@/models/Intern';
import { sendApplicationReceivedEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, role, college, village, motivation } = body;

    // Validate minimum required fields
    if (!name || !phone || !email || !role || !village || !motivation) {
      return NextResponse.json({ error: 'Missing mandatory fields' }, { status: 400 });
    }

    // Connect to MongoDB
    await dbConnect();

    // Check if user already exists
    const existingIntern = await Intern.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }]
    });

    if (existingIntern) {
      return NextResponse.json(
        { error: 'You have already applied! Please check your status.' }, 
        { status: 409 }
      );
    }

    // Create new intern document
    const newIntern = await Intern.create({
      name,
      phone,
      email: email.toLowerCase(),
      role,
      college: college || 'N/A',
      village,
      motivation,
      status: 'Pending'
    });

    // Trigger Email
    await sendApplicationReceivedEmail(email.toLowerCase(), name);

    return NextResponse.json({ success: true, id: newIntern._id }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving internship application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
