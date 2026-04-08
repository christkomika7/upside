import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { Options } from "@/app/generated/prisma";

export async function GET(req: NextRequest) {
    const datas = await prisma.options.findMany();
    const baseUrl = new URL(req.url).origin;
    const processedData = datas.length > 0 ? datas.map((option: Options) => {
        const imageUrl = option.icon
            ? option.icon.startsWith('http')
                ? option.icon
                : option.icon.startsWith('/')
                    ? `${baseUrl}${option.icon}`
                    : `${baseUrl}/${option.icon}`
            : null;

        return {
            ...option,
            icon: imageUrl
        };
    }) : [];

    return NextResponse.json({
        success: "",
        data: processedData,
    }, { status: 200 })

}