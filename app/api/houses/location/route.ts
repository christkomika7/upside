export const dynamic = "force-dynamic";
import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type Tx = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];


export async function GET(_: NextRequest) {
  try {
    const [areas, locations] = await prisma.$transaction(async (tx: Tx) => {
      const areasResult = await tx.realstate.groupBy({
        by: ["area"],
        _count: {
          area: true,
        },
        where: {
          status: "Louer",
          online: true,
        },
        orderBy: {
          _count: {
            area: 'desc'
          }
        },
        _max: {
          id: true
        }
      }).then(async (areas: any[]) => {
        const areasWithImages = await Promise.all(areas.map(async area => {
          const propertiesWithImages = await prisma.realstate.findMany({
            where: {
              area: area.area,
              status: "Louer",
              online: true,
              images: { isEmpty: false }
            },
            select: {
              images: true
            },
            orderBy: {
              id: 'desc'
            }
          });

          const allImages = propertiesWithImages.flatMap((p: { images: string[] }) => p.images);
          const randomImage = allImages[Math.floor(Math.random() * allImages.length)] || null
          return {
            ...area,
            allImages: allImages.filter((r: string) => r !== randomImage),
            randomImage: randomImage
          };
        }));
        return areasWithImages;
      });

      const locationsResult = await tx.realstate.groupBy({
        by: ["area"],
        where: {
          status: "Louer",
          online: true,
        },
        orderBy: undefined,
      });

      return [areasResult, locationsResult];
    });

    let area = areas.map((item: { allImages: string | any[]; }) => ({
      ...item,
      randomImage: item.allImages[Math.floor(Math.random() * item.allImages.length)] || null
    }));
    while (area.length < 4) {
      area = [...area, ...areas].slice(0, 4);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          areas: area,
          locations: locations.slice(0, 12),
        },
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
