export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { optionSchema } from "@/lib/schemas";
import { randomUUID } from "crypto";
import { fileTypeFromBuffer } from "file-type";
import { mkdir, unlink, writeFile } from "fs/promises";
import { type NextRequest, NextResponse } from "next/server";
import path from "path";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

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

  if (!id || id === "undefined") {
    return NextResponse.json(
      {
        message: "Identifiant invalide.",
        state: "error",
      },
      { status: 400 },
    );
  }

  try {
    const option = await prisma.options.findUnique({ where: { id } });

    if (!option) {
      return NextResponse.json(
        {
          message: "Option introuvable.",
          state: "error",
        },
        { status: 404 },
      );
    }

    const baseUrl = new URL(req.url).origin;
    const propertyWithIconUrl = {
      ...option,
      icon: !option.icon
        ? ""
        : option.icon.startsWith("http")
          ? option.icon
          : option.icon.startsWith("/")
            ? `${baseUrl}${option.icon}`
            : `${baseUrl}/${option.icon}`,
    };

    return NextResponse.json(
      {
        message: "",
        data: propertyWithIconUrl,
        state: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json(
      {
        message:
          "Erreur interne: " +
          (error instanceof Error ? error.message : "Erreur inconnue"),
        state: "error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name");
  const translate = formData.get("translate");
  const icon = formData.get("icon") as File | null;

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

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

  if (!id || id === "undefined") {
    return NextResponse.json(
      {
        message: "Identifiant invalide.",
        state: "error",
      },
      { status: 400 },
    );
  }

  const validateData = optionSchema.safeParse({
    icon: icon,
    name: name,
    translate: translate,
  });

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
      id,
    },
  });

  if (!isExist) {
    return NextResponse.json(
      {
        message: `L'option ${data.name} n'existe pas.`,
        state: "error",
      },
      { status: 409 },
    );
  }

  let existImage =
    data.icon?.name && !isExist.icon
      ? false
      : data.icon && isExist.icon && !isExist.icon.endsWith(data.icon.name)
        ? false
        : true;

  let imagePath: string = "";
  try {
    if (!existImage && data.icon) {
      const buffer = Buffer.from(await data.icon.arrayBuffer());
      const fileType = data.icon.type
        ? { mime: data.icon.type }
        : await fileTypeFromBuffer(buffer);
      if (
        !fileType ||
        ![
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
          "application/xml",
        ].includes(fileType.mime)
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
      const uniqueFilename = `${randomUUID()}.${fileExtension}`;
      const uploadsDir = path.join(process.cwd(), "uploads", "realstate");
      await mkdir(uploadsDir, { recursive: true });
      const filePath = path.join(uploadsDir, uniqueFilename);
      await writeFile(filePath, buffer);
      const imageUrl = `/api/images/realstate/${uniqueFilename}`;
      imagePath = imageUrl;
    }

    if (isExist.icon && isExist.icon.startsWith("/api/images/realstate")) {
      const filename = isExist.icon.split("/").pop();
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

    const [datas, total] = await prisma.$transaction([
      prisma.options.update({
        where: { id },
        data: {
          icon: !data.icon ? null : imagePath ? imagePath : isExist.icon,
          name: data.name.toLowerCase(),
          translate: data.translate.toLowerCase(),
        },
      }),
      prisma.options.count(),
    ]);

    return NextResponse.json(
      {
        message: "L'option vient d'être modifiée.",
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

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop() as string;

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

  if (!id || id === "undefined") {
    return NextResponse.json(
      {
        message: "Identifiant invalide.",
        state: "error",
      },
      { status: 400 },
    );
  }

  try {
    const option = await prisma.options.findUnique({ where: { id } });

    if (!option) {
      return NextResponse.json(
        {
          message: "Option introuvable.",
          state: "error",
        },
        { status: 404 },
      );
    }

    if (option.icon && option.icon.startsWith("/api/images/realstate")) {
      const filename = option.icon.split("/").pop();
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
          // On ne bloque pas la suppression en DB si la suppression physique échoue
        }
      }
    }

    const [deletedOption, total] = await prisma.$transaction([
      prisma.options.delete({ where: { id } }),
      prisma.options.count(),
    ]);

    return NextResponse.json(
      {
        message: "L'option a été supprimée avec succès.",
        data: deletedOption,
        total,
        state: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json(
      {
        message:
          "Erreur interne: " +
          (error instanceof Error ? error.message : "Erreur inconnue"),
        state: "error",
      },
      { status: 500 },
    );
  }
}
