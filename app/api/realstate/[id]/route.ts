export const dynamic = "force-dynamic";

import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import { mkdir, unlink, writeFile } from "fs/promises";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleBigIntSerialization } from "@/utils/utils";
import { editRealStateSchema } from "@/lib/schemas";
import { fileTypeFromBuffer } from "file-type";
import { ACCEPTED_MEDIA_TYPES } from "@/lib/constant";
import { randomUUID } from "crypto";
import { OptionType } from "@/lib/type";
import { mapValue } from "@/lib/utils";
import { Realstate } from "@/generated/prisma/client";


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
        return imagePath;
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

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;


  const session = await auth.api.getSession({
    headers: req.headers
  })

  const userId = session?.user?.id;

  const user = userId ? await prisma.user.findUnique({
    where: {
      id: userId
    }
  }) : null;

  if (!session && !user) {
    return NextResponse.json({
      message: "Accès refusé.",
      state: "error",
    }, { status: 401 },
    )
  }

  // Validation de l'ID
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
      where: { id },
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

    const imagePromises = property.images.map(async (imagePath: string) => {
      if (imagePath.startsWith("/api/images/realstate/")) {
        const filename = imagePath.split("/").pop();
        if (filename) {
          const filePath = path.join(
            process.cwd(),
            "uploads",
            "realstate",
            filename,
          );
          try {
            await unlink(filePath);
            return { path: imagePath, deleted: true };
          } catch (fileError) {
            console.error(
              `Erreur lors de la suppression du fichier ${filename}:`,
              fileError,
            );
            return { path: imagePath, deleted: false, error: fileError };
          }
        }
      }
      return { path: imagePath, deleted: false, external: true };
    });

    await Promise.all(imagePromises);

    await prisma.realstate.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Propriété et images associées supprimées avec succès.",
        state: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de la propriété:", error);
    return NextResponse.json(
      {
        message: `Erreur lors de la suppression: ${error instanceof Error ? error.message : "Erreur inconnue"}`,
        state: "error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const session = await auth.api.getSession({
    headers: req.headers
  })

  const userId = session?.user?.id;

  const user = userId ? await prisma.user.findUnique({
    where: {
      id: userId
    }
  }) : null;

  if (!session && !user) {
    return NextResponse.json({
      message: "Accès refusé.",
      state: "error",
    }, { status: 401 },
    )
  }
  if (!id || typeof id !== "string") {
    return NextResponse.json(
      {
        message: "ID invalide.",
        state: "error",
      },
      { status: 400 },
    );
  }

  const formData = await req.formData();
  const datas = formData.get("data") as string;
  const files: File[] = formData.getAll("images") as File[];

  const parsed = editRealStateSchema.safeParse({
    ...JSON.parse(datas),
    images: files,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Donnée invalide.", state: "error" },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const isExist = await prisma.realstate.findFirst({
    where: { id },
  });

  if (!isExist) {
    return NextResponse.json(
      {
        message: `Identifiant invalide.`,
        state: "error",
      },
      { status: 400 },
    );
  }

  const hasImage = isExist.images.filter(
    (img: string) => !data.deletedMedias?.includes(img),
  );

  if (hasImage.length === 0 && data.images?.length === 0) {
    return NextResponse.json(
      { message: "Au moins une image est requise.", state: "error" },
      { status: 409 },
    );
  }

  const mediaPaths: string[] = [];
  try {
    const uploadsDir = path.join(process.cwd(), "uploads", "realstate");
    await mkdir(uploadsDir, { recursive: true });
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const type = await fileTypeFromBuffer(buffer);

      if (!type || !ACCEPTED_MEDIA_TYPES.includes(type.mime)) {
        return NextResponse.json(
          {
            message: `Fichier non supporté : ${file.name}`,
            state: "error",
          },
          { status: 400 },
        );
      }

      const ext = type.ext || file.name.split(".").pop();
      const fileName = `${randomUUID()}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      await writeFile(filePath, buffer);

      mediaPaths.push(`/api/images/realstate/${fileName}`);
    }
    const optionsId =
      Array.isArray(data.options) && data.options.length > 0
        ? data.options.map((option) => {
          const parse = JSON.parse(option) as OptionType;
          return parse.id;
        })
        : [];

    const property: Partial<Realstate> = {};

    property.online = data.online;
    if (data.title) property.title = data.title;
    if (data.dimension) property.dimension = data.dimension;
    if (data.status) property.status = data.status;
    if (data.property) property.property = data.property;
    if (data.bedroom) property.bedroom = Number(mapValue(data.bedroom));
    if (data.bathroom) property.bathroom = Number(mapValue(data.bathroom));
    if (data.room) property.room = Number(mapValue(data.room));
    if (data.city) property.city = data.city;
    if (data.area) property.area = data.area;
    if (data.price && Number(data.price) > 0) {
      property.price = handleBigIntSerialization(
        parseInt(data.price.replace(/\s+/g, "")),
      );
    } else {
      property.price = BigInt(0);
    }
    if (data.email) property.email = data.email;
    if (data.whatsapp) property.whatsapp = data.whatsapp;
    if (data.telephone) property.phone = data.telephone;
    if (data.description) property.description = data.description;
    if (data.translate) property.translate = data.translate;
    if (data.position) property.position = data.position;
    if (data.furnished) property.furnished = data.furnished;
    if (data.equippedKitchen) property.equippedKitchen = data.equippedKitchen;
    if (data.terrace) property.terrace = data.terrace;
    if (data.security) property.security = data.security;
    if (data.pmr) property.pmr = data.pmr;
    if (data.elevator) property.elevator = data.elevator;
    if (data.view) property.view = data.view;
    if (data.pool) property.pool = data.pool;
    if (data.internet) property.internet = data.internet;
    if (data.gym) property.gym = data.gym;
    if (data.garden) property.garden = data.garden;
    if (data.generator) property.generator = data.generator;
    if (data.parking) property.parking = data.parking;
    if (data.clim) property.clim = data.clim;

    const deletedImages = data.deletedMedias ?? [];
    const existingImages = isExist.images;
    const filteredImages = existingImages.filter(
      (image: string) => !deletedImages.includes(image),
    );

    const realstate = await prisma.realstate.update({
      where: { id },
      data: {
        ...property,
        images: [...filteredImages, ...mediaPaths],
        options: {
          set: [],
          connect: optionsId?.length
            ? optionsId.map((opt) => ({ id: opt }))
            : [],
        },
      },
    });

    const imagePromises = deletedImages.map(async (imagePath: string) => {
      if (imagePath.startsWith("/api/images/realstate/")) {
        const filename = imagePath.split("/").pop();
        if (filename) {
          const filePath = path.join(
            process.cwd(),
            "uploads",
            "realstate",
            filename,
          );
          try {
            await unlink(filePath);
            return { path: imagePath, deleted: true };
          } catch (fileError) {
            console.error(
              `Erreur lors de la suppression du fichier ${filename}:`,
              fileError,
            );
            return { path: imagePath, deleted: false, error: fileError };
          }
        }
      }
      return { path: imagePath, deleted: false, external: true };
    });

    await Promise.all(imagePromises);

    return NextResponse.json(
      {
        message: "Propriété immobilière modifiée avec succès.",
        state: "success",
        data: { id: realstate.id },
      },
      { status: 201 },
    );
  } catch (error) {
    const imagePromises = mediaPaths.map(async (imagePath: string) => {
      if (imagePath.startsWith("/api/images/realstate/")) {
        const filename = imagePath.split("/").pop();
        if (filename) {
          const filePath = path.join(
            process.cwd(),
            "uploads",
            "realstate",
            filename,
          );
          try {
            await unlink(filePath);
            return { path: imagePath, deleted: true };
          } catch (fileError) {
            console.error(
              `Erreur lors de la suppression du fichier ${filename}:`,
              fileError,
            );
            return { path: imagePath, deleted: false, error: fileError };
          }
        }
      }
      return { path: imagePath, deleted: false, external: true };
    });

    await Promise.all(imagePromises);
    console.error("Erreur POST Realstate:", error);
    return NextResponse.json(
      {
        message: `Erreur interne : ${error}`,
        state: "error",
      },
      { status: 500 },
    );
  }
}
