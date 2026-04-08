export const dynamic = "force-dynamic";

import { auth } from "@/lib/auth";
import { ACCEPTED_MEDIA_TYPES, TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { paginationSchema, realStateSchema } from "@/lib/schemas";
import { NextResponse, type NextRequest } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { fileTypeFromBuffer } from "file-type";
import { mapValue } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { handleBigIntSerialization } from "@/utils/utils";
import { filtersData } from "@/app/[locale]/(dashboard)/admin/real-state/_components/data";
import { Option } from "@/lib/type";
import { Realstate } from "@/generated/prisma/client";


export async function POST(req: NextRequest) {
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

  const formData = await req.formData();
  const datas = formData.get("data") as string;
  const files: File[] = formData.getAll("images") as File[];

  const parsed = realStateSchema.safeParse({
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
    where: { title: data.title.toLowerCase() },
  });

  if (isExist) {
    return NextResponse.json(
      {
        message: `Ce titre "${data.title}" existe déjà.`,
        state: "error",
      },
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
      const fileName = `${file.name.split(".")[0]}-${Date.now()}.${ext}`;
      const filePath = path.join(uploadsDir, fileName);

      await writeFile(filePath, buffer);

      mediaPaths.push(`/api/images/realstate/${fileName}`);
    }
    const optionsId =
      Array.isArray(data.options) && data.options.length > 0
        ? data.options.map((option) => {
          const parse = JSON.parse(option) as Option;
          return parse.id;
        })
        : [];

    const realstate = await prisma.realstate.create({
      data: {
        images: mediaPaths,
        title: data.title,
        dimension: data.dimension || null,
        translate: data.translate,
        status: data.status,
        online: data.online,
        property: data.property,
        bedroom: mapValue(data.bedroom),
        bathroom: mapValue(data.bathroom),
        room: mapValue(data.room),
        city: data.city,
        area: data.area,
        price: data.price ? parseInt(data.price.replace(/\s+/g, "")) : 0,
        email: data.email || null,
        phone: data.telephone || null,
        whatsapp: data.whatsapp || null,
        description: data.description,
        position: data.position,
        options: {
          connect: optionsId?.length
            ? optionsId.map((opt) => ({ id: opt }))
            : [],
        },
        furnished: data.furnished || false,
        equippedKitchen: data.equippedKitchen || false,
        terrace: data.terrace || false,
        security: data.security || false,
        pmr: data.pmr || false,
        elevator: data.elevator || false,
        view: data.view || null,
        pool: data.pool || false,
        internet: data.internet || false,
        gym: data.gym || false,
        garden: data.garden || false,
        generator: data.generator || false,
        parking: data.parking || false,
        clim: data.clim || false,
      },
    });

    return NextResponse.json(
      {
        message: "Propriété immobilière ajoutée avec succès.",
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = {
    page: searchParams.get("page"),
    pageSize: searchParams.get("pageSize"),
    search: searchParams.get("search"),
    city: searchParams.get("city"),
    area: searchParams.get("area"),
    property: searchParams.get("property"),
    status: searchParams.get("status"),
    bedroom: searchParams.get("bedroom"),
    bathroom: searchParams.get("bathroom"),
    price: searchParams.get("price"),
    view: searchParams.get("view"),
    garden: searchParams.get("garden"),
    furnished: searchParams.get("furnished"),
    pool: searchParams.get("pool"),
    generator: searchParams.get("generator"),
    gym: searchParams.get("gym"),
    terrace: searchParams.get("terrace"),
  };

  // Validation des données de pagination
  const validateData = paginationSchema.safeParse(query);
  if (!validateData.success) {
    return NextResponse.json(
      {
        error: "Données invalides.",
      },
      { status: 400 },
    );
  }

  try {
    // Construire les conditions de recherche pour Prisma
    const whereConditions: Record<string, any> = {};

    // Recherche textuelle
    if (query.search && query.search !== "undefined") {
      whereConditions["title"] = {
        contains: query.search.toLowerCase(),
        mode: "insensitive",
      };
    }

    // Traitement du prix
    if (query.price && query.price !== "undefined") {
      const priceParam = query.price.trim();

      if (priceParam === "noprice") {
        whereConditions["price"] = { equals: 0 };
      } else if (priceParam.includes("-")) {
        const [minPriceStr, maxPriceStr] = priceParam
          .split("-")
          .map((p) => p.trim());
        const minPrice = parseInt(minPriceStr.replace(/\s+/g, ""));
        const maxPrice = parseInt(maxPriceStr.replace(/\s+/g, "")) - 1;

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          whereConditions["price"] = {
            gte: minPrice,
            lte: maxPrice,
          };
        }
      } else if (priceParam.startsWith(">")) {
        const minPrice = parseInt(priceParam.substring(1).replace(/\s+/g, ""));
        if (!isNaN(minPrice)) {
          whereConditions["price"] = { gt: minPrice };
        }
      } else if (priceParam.startsWith("<")) {
        const maxPrice = parseInt(priceParam.substring(1).replace(/\s+/g, ""));
        if (!isNaN(maxPrice)) {
          whereConditions["price"] = { gt: 0, lt: maxPrice };
        }
      }
    }

    // Filtrage par ville
    if (query.city && query.city !== "undefined") {
      whereConditions["city"] = {
        contains: query.city,
        mode: "insensitive",
      };
    }

    // Filtrage par quartier
    if (query.area && query.area !== "undefined") {
      whereConditions["area"] = {
        contains: query.area.toLowerCase(),
        mode: "insensitive",
      };
    }

    // Filtrage par type de propriété
    if (query.property && query.property !== "undefined") {
      const p = filtersData.properties.find((v) => v.label === query.property)
        ?.value as string;
      whereConditions["property"] = {
        contains: p.toLowerCase(),
        mode: "insensitive",
      };
    }

    // Filtrage par statut
    if (query.status && query.status !== "undefined") {
      whereConditions["status"] = {
        equals: query.status,
      };
    }

    // Filtrage par view
    if (query.view && query.view !== "undefined") {
      whereConditions["view"] = {
        equals: query.view,
      };
    }

    // Filtrage par nombre de chambres
    if (
      query.bedroom &&
      query.bedroom !== "undefined" &&
      query.bedroom !== "0"
    ) {
      if (query.bedroom === "6") {
        whereConditions["bedroom"] = { gt: 5 };
      } else {
        const bedroomValue = parseInt(query.bedroom);
        if (!isNaN(bedroomValue)) {
          whereConditions["bedroom"] = bedroomValue;
        }
      }
    }

    // Filtrage par nombre de salles de bain
    if (
      query.bathroom &&
      query.bathroom !== "undefined" &&
      query.bathroom !== "0"
    ) {
      if (query.bathroom === "6") {
        whereConditions["bathroom"] = { gt: 5 };
      } else {
        const bathroomValue = parseInt(query.bathroom);
        if (!isNaN(bathroomValue)) {
          whereConditions["bathroom"] = bathroomValue;
        }
      }
    }

    // Traitement des filtres booléens
    const booleanFilters = [
      "garden",
      "furnished",
      "pool",
      "generator",
      "gym",
      "terrace",
    ];

    for (const filter of booleanFilters) {
      if (query[filter as keyof typeof query] === "true") {
        whereConditions[filter] = true;
      } else if (query[filter as keyof typeof query] === "false") {
        whereConditions[filter] = false;
      }
    }

    const page = parseInt(query.page || "1");
    const pageSize = parseInt(query.pageSize || String(TOTAL_PAGINATION_PAGE));
    const skip = Math.max(0, (page - 1) * pageSize);

    const [totalCount, properties] = await prisma.$transaction([
      prisma.realstate.count({ where: whereConditions }),
      prisma.realstate.findMany({
        where: whereConditions,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const processedData = properties.map((item: Realstate) => {
      const imageUrls = item.images.map((imagePath: string) => {
        return imagePath;
      });

      return {
        ...handleBigIntSerialization(item),
        imageUrls,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: processedData,
        total: totalCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
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
