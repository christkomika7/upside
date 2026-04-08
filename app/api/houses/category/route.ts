export const dynamic = "force-dynamic";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET(_: NextRequest) {
  try {
    const [villa, apartment, office, commercial, land, warehouse] =
      await prisma.$transaction([
        prisma.realstate.count({
          where: { property: "Villa", status: "Louer", online: true },
        }),
        prisma.realstate.count({
          where: { property: "Apartment", status: "Louer", online: true },
        }),
        prisma.realstate.count({
          where: { property: "Office", status: "Louer", online: true },
        }),
        prisma.realstate.count({
          where: {
            property: "Commercial Space",
            status: "Louer",
            online: true,
          },
        }),
        prisma.realstate.count({
          where: { property: "Land", status: "Louer", online: true },
        }),
        prisma.realstate.count({
          where: { property: "Warehouse", status: "Louer", online: true },
        }),
      ]);

    return NextResponse.json(
      {
        success: true,
        data: { villa, apartment, office, commercial, land, warehouse },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message: "Erreur interne du serveur",
        state: "error",
      },
      {
        status: 500,
      },
    );
  }
}
