import { auth } from "@/lib/auth";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { areaSchema, paginationSchema } from "@/lib/schemas";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const res = await req.json()
    const validateData = areaSchema.safeParse(res);

    const session = await auth.api.getSession({
        headers: req.headers
    })

    if (!session) {
        return NextResponse.json({
            message: "Accès refusé.",
            state: "error",
        }, { status: 401 },
        )
    }

    if (!validateData.success) {
        return NextResponse.json({
            message: "Donnée invalide.",
            state: "error",
        }, { status: 400 })
    }

    const data = validateData.data

    const isExist = await prisma.area.findFirst({
        where: {
            city: data.city.toLowerCase(),
            name: data.area.toLowerCase()
        }
    })


    if (isExist) {
        return NextResponse.json({
            message: `${data.area} existe déjà dans la ville ${data.city}.`,
            state: "error",
        }, { status: 409 })
    }

    try {

        const [datas, total] = await prisma.$transaction([
            prisma.area.create({
                data: {
                    city: data.city.toLowerCase(),
                    name: data.area.toLowerCase()
                }
            }),
            prisma.area.count()
        ])

        return NextResponse.json({
            message: "Un nouveau quartier vient d'être àjouté.",
            data: datas,
            total,
            state: "success",

        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Erreur interne: " + error,
            state: "error",
        }, {
            status: 500
        })
    }

}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = {
        page: searchParams.get('page') as string,
        pageSize: searchParams.get('pageSize') as string,
        search: searchParams.get('search') as string,
    }

    const validateData = paginationSchema.safeParse(query);

    if (!validateData.success) {
        return NextResponse.json({
            error: "Données invalides."
        }, { status: 400 })
    }
    try {
        const page = parseInt(query.page || "1");
        const pageSize = parseInt(query.pageSize || String(TOTAL_PAGINATION_PAGE));
        const search = query.search as string;

        const total = await prisma.area.count({
            where: {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        })

        const totalPages = Math.ceil(total / pageSize);
        // Ajuster la page si elle dépasse le nombre total de pages
        const adjustedPage = page > totalPages ? totalPages : page;
        const skip = Math.max(0, (adjustedPage - 1) * pageSize);

        const datas = await prisma.area.findMany({
            where: {
                name: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            take: pageSize,
            skip: skip
        })

        return NextResponse.json({
            success: "",
            data: datas,
            total,
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Erreur interne: " + error,
            state: 'error'
        }, {
            status: 500
        })
    }
}
