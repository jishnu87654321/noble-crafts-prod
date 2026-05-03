import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Registration from "@/models/Registration";

export async function GET() {
  try {
    await dbConnect();
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: registrations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
