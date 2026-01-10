import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { handleBigIntSerialization } from "@/utils/utils";

export async function GET(req: NextRequest) {
  try {

    const houses = await
      prisma.realstate.findMany({
        where: {
          online: true,
          property: {
            in: ["Villa", 'Apartment', 'Office', 'Commercial Space'],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 2,
      })



    const houseData = houses.map((item) => ({
      ...handleBigIntSerialization(item),
      images: item.images.map((imagePath: string) => imagePath),
    }));



    return NextResponse.json(
      {
        success: true,
        data: houseData,
      },
      { status: 200 }
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
      }
    );
  }
}