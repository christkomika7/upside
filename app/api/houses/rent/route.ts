import { NextResponse, type NextRequest } from "next/server";
import { CLIENT_TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { handleBigIntSerialization } from "@/utils/utils";
import { Realstate } from "@/app/generated/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = {
    page: searchParams.get("page"),
    pageSize: searchParams.get("pageSize"),
    city: searchParams.get("city"),
    district: searchParams.get("district"),
    property: searchParams.get("property"),
    bedroom: searchParams.get("bedroom"),
    bathroom: searchParams.get("bathroom"),
    price: searchParams.get("price"),
    garden: searchParams.get("garden"),
    view: searchParams.get("view"),
    furnished: searchParams.get("furnished"),
    pool: searchParams.get("pool"),
    generator: searchParams.get("generator"),
    gym: searchParams.get("gym"),
    terrace: searchParams.get("terrace"),
    filter: searchParams.get("filter"),
  };

  try {
    const page = parseInt(query.page || "1");
    const pageSize = parseInt(
      query.pageSize || String(CLIENT_TOTAL_PAGINATION_PAGE),
    );
    const skip = Math.max(0, (page - 1) * pageSize);

    // Construire les conditions de filtre pour Prisma
    const whereConditions: Record<string, any> = {};

    whereConditions["online"] = true;

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
          whereConditions["price"] = { lt: maxPrice };
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

    // Filtrage par quartier/district
    if (query.district && query.district !== "undefined") {
      whereConditions["area"] = {
        contains: query.district.toLowerCase(),
        mode: "insensitive",
      };
    }

    // Filtrage par view
    if (query.view && query.view !== "undefined") {
      whereConditions["view"] = {
        equals: query.view,
      };
    }

    // Filtrage par type de propriété
    if (query.property && query.property !== "undefined") {
      whereConditions["property"] = {
        contains: query.property,
        mode: "insensitive",
      };
    }

    whereConditions["status"] = {
      contains: "Louer",
      mode: "insensitive",
    };

    // Filtrage par nombre de chambres
    if (query.bedroom && query.bedroom !== "undefined") {
      if (query.bedroom === " 5") {
        whereConditions["bedroom"] = { gt: 5 };
      } else {
        const bedroomValue = parseInt(query.bedroom);
        if (!isNaN(bedroomValue)) {
          whereConditions["bedroom"] = bedroomValue;
        }
      }
    }

    // Filtrage par nombre de salles de bain
    if (query.bathroom && query.bathroom !== "undefined") {
      if (query.bathroom === " 5") {
        whereConditions["bathroom"] = { gt: 5 };
      } else {
        const bathroomValue = parseInt(query.bathroom);
        if (!isNaN(bathroomValue)) {
          whereConditions["bathroom"] = bathroomValue;
        }
      }
    }

    // Ajout des filtres booléens
    const booleanFilters = [
      "garden",
      "furnished",
      "pool",
      "generator",
      "gym",
      "terrace",
    ];
    for (const filter of booleanFilters) {
      const paramName = filter === "furnished" ? "furnished" : filter;
      if (query[filter as keyof typeof query] === "true") {
        whereConditions[paramName] = true;
      }
    }

    // Déterminer l'ordre de tri
    let orderBy = {};
    switch (query.filter) {
      case "asc":
        orderBy = { price: "asc" };
        break;
      case "desc":
        orderBy = { price: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    // Exécuter les requêtes en utilisant Prisma $transaction pour garantir l'atomicité
    const [total, properties] = await prisma.$transaction([
      // Compte total des résultats pour la pagination
      prisma.realstate.count({ where: whereConditions }),

      // Requête principale avec pagination et tri
      prisma.realstate.findMany({
        where: whereConditions,
        skip,
        take: pageSize,
        orderBy,
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    // Traiter les données pour inclure les URLs complètes des images
    // const baseUrl = new URL(req.url).origin;
    const processedData = properties.map((item: Realstate) => {
      const imageUrls = item.images.map((imagePath: string) => {
        return imagePath;
        // if (imagePath.startsWith("http")) {
        //   return imagePath;
        // }
        // return imagePath.startsWith("/")
        //   ? `${env.BETTER_AUTH_URL}${imagePath}`
        //   : `${env.BETTER_AUTH_URL}/${imagePath}`;
      });

      return {
        ...handleBigIntSerialization(item),
        images: imageUrls,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: processedData,
        total,
        totalPages,
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
