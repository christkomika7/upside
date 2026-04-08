export const dynamic = "force-dynamic";

import { Options } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import { prisma } from "@/lib/prisma";
import { optionSchema, paginationSchema } from "@/lib/schemas";
import { fileTypeFromBuffer } from "file-type";
import { mkdir, unlink, writeFile } from "fs/promises";
import { NextResponse, type NextRequest } from "next/server";
import path from "path";


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name");
  const translate = formData.get("translate");
  const icon = formData.get("icon") as File | null;

  const validateData = optionSchema.safeParse({
    icon: icon,
    name: name,
    translate: translate,
  });

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json(
      {
        message: "Accès refusé.",
        state: "error",
      },
      { status: 401 },
    );
  }

  if (!validateData.success) {
    return NextResponse.json(
      {
        message: "Donnée invalide." + validateData.error.errors,
        state: "error",
      },
      { status: 400 },
    );
  }

  const data = validateData.data;

  const isExist = await prisma?.options?.findUnique({
    where: {
      name: data.name.toLowerCase(),
    },
  });

  if (isExist) {
    return NextResponse.json(
      {
        message: `${data.name} existe déjà.`,
        state: "error",
      },
      { status: 409 },
    );
  }

  let imagePath: string = "";
  try {
    if (data.icon) {
      const buffer = Buffer.from(await data.icon.arrayBuffer());
      const fileType = data.icon.type
        ? { mime: data.icon.type }
        : await fileTypeFromBuffer(buffer);
      if (
        !fileType ||
        !["image/jpeg", "image/jpg", "image/png", "image/svg+xml"].includes(
          fileType.mime,
        )
      ) {
        return NextResponse.json(
          {
            message: "Type de fichier non autorisé détecté.",
            state: "error",
          },
          { status: 400 },
        );
      }
      const fileExtension = data.icon.name.split(".").pop()?.toLowerCase();
      const filename = `${data.icon.name.split(".")[0]}-${Date.now()}.${fileExtension}`;
      const uploadsDir = path.join(process.cwd(), "uploads", "realstate");
      await mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, filename);
      await writeFile(filePath, buffer);
      const imageUrl = `/api/images/realstate/${filename}`;
      imagePath = imageUrl;
    }

    const [datas, total] = await prisma.$transaction([
      prisma.options.create({
        data: {
          icon: imagePath,
          name: data.name.toLowerCase(),
          translate: data.translate.toLowerCase(),
        },
      }),
      prisma.options.count(),
    ]);

    return NextResponse.json(
      {
        message: "Une nouvelle option vient d'être ajoutée.",
        data: datas,
        total,
        state: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    if (imagePath && imagePath.startsWith("/api/images/realstate")) {
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
        } catch (fileError) {
          console.error(
            "Erreur lors de la suppression du fichier :",
            fileError,
          );
        }
      }
    }
    return NextResponse.json(
      {
        message: "Erreur interne: " + error,
        state: "error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = {
    page: searchParams.get("page") as string,
    pageSize: searchParams.get("pageSize") as string,
    search: searchParams.get("search") as string,
  };

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
    const page = parseInt(query.page || "1");
    const pageSize = parseInt(query.pageSize || String(TOTAL_PAGINATION_PAGE));
    const search = query.search as string;

    const total = await prisma.options.count({
      where: {
        name: { contains: search.toLowerCase(), mode: "insensitive" },
      },
    });

    const totalPages = Math.ceil(total / pageSize);
    const adjustedPage = page > totalPages ? totalPages : page;
    const skip = Math.max(0, (adjustedPage - 1) * pageSize);

    const datas = await prisma.options.findMany({
      where: {
        name: { contains: search.toLowerCase(), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
        translate: true,
        icon: true,
      },
      skip: skip,
      take: pageSize,
    });

    const processedData = datas.map((option: Options) => {
      const imageUrl = option.icon
      return {
        ...option,
        icon: imageUrl,
      };
    });

    return NextResponse.json(
      {
        success: true,
        data: processedData,
        total,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Erreur interne: " + error,
        state: "error",
      },
      {
        status: 500,
      },
    );
  }
}
