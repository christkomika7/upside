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


    console.log("Fetched Houses:", houseData);

    // pg_restore -h europe-north1-001.proxy.sevalla.app -p 30286 -U generous-lime-moose -d linear-moccasin-asp -W --no-owner upside_backup.dump



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