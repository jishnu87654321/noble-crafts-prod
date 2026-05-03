import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Registration from "@/models/Registration";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    
    const deleted = await Registration.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
