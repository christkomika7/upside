import { NextResponse, type NextRequest } from "next/server";
import path from "path";
import fs from "fs";
import { fileTypeFromFile } from "file-type";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ filename: string }> }
) {
    const { filename } = await context.params;
    if (filename.includes("..") || filename.includes("/")) {
        return new NextResponse("Accès refusé", { status: 403 });
    }

    const filePath = path.join(process.cwd(), "uploads", "realstate", filename);

    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ message: "Fichier non trouvé" }, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const range = req.headers.get("range");
    const fileSize = stat.size;

    const fileType = await fileTypeFromFile(filePath);
    const contentType = fileType?.mime ?? "application/octet-stream";

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });

        return new NextResponse(fileStream as any, {
            status: 206,
            headers: {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize.toString(),
                "Content-Type": contentType,
            },
        });
    }

    const fileStream = fs.createReadStream(filePath);
    return new NextResponse(fileStream as any, {
        headers: {
            "Content-Type": contentType,
            "Content-Length": fileSize.toString(),
            "Cache-Control": "public, max-age=31536000",
        },
    });
}
