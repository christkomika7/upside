import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleBigIntSerialization } from "@/utils/utils";
import { IMAGE_TYPES } from "@/lib/constant";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id || typeof id !== "string") {
    return NextResponse.json(
      {
        message: "ID invalide.",
        state: "error",
      },
      { status: 400 },
    );
  }

  try {
    const property = await prisma.realstate.findUnique({
      where: {
        id,
      },
      include: {
        options: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          message: "Propriété non trouvée.",
          state: "error",
        },
        { status: 404 },
      );
    }

    const propertyWithImageUrls = {
      ...handleBigIntSerialization(property),
      images: property.images.map((imagePath: string) => {
        if (IMAGE_TYPES.includes(imagePath.split(".").pop() as string)) {
          return imagePath;
        }
      }),
    };

    return NextResponse.json(
      {
        message: "",
        state: "success",
        data: propertyWithImageUrls,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la récupération de la propriété:", error);
    return NextResponse.json(
      {
        message: `Erreur lors de la récupération: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
        state: "error",
      },
      { status: 500 },
    );
  }
}
