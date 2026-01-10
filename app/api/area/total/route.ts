import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    const total = await prisma.area.count();
    return NextResponse.json({
        message: "",
        total,
        state: "success"
    }, { status: 200 })
}