import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    const [cities, areas] = await prisma.$transaction([
        prisma.city.findMany(),
        prisma.area.findMany(),
    ])

    return NextResponse.json({
        message: "",
        cities,
        areas,
        state: "success"
    }, { status: 200 })
}