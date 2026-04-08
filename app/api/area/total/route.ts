import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest) {
    const total = await prisma.area.count();
    return NextResponse.json({
        message: "",
        total,
        state: "success"
    }, { status: 200 })
}