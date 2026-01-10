import { auth } from "@/lib/auth";
import { TOTAL_PAGINATION_PAGE } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { citySchema, paginationSchema } from "@/lib/schemas";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const res = await req.json()
    const validateData = citySchema.safeParse(res);

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

    const data = validateData.data;

    const isExist = await prisma.city.findFirst({
        where: {
            name: data.city.toLowerCase()
        }
    })


    if (isExist) {
        return NextResponse.json({
            message: `${data.city} existe déjà.`,
            state: "error",
        }, { status: 409 })
    }

    try {
        const [datas, total] = await prisma.$transaction([
            prisma.city.create({
                data: {
                    name: data.city.toLowerCase()
                }
            }),
            prisma.city.count()
        ])

        return NextResponse.json({
            message: "Une nouvelle ville vient d'être àjoutée.",
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

        const search = query.search as string;
        const total = await prisma.city.count({
            where: {
                name: { contains: search.toLowerCase(), mode: "insensitive" }
            }
        })
        const page = parseInt(query.page || "1");
        const pageSize = parseInt(query.pageSize || String(TOTAL_PAGINATION_PAGE));
        const totalPages = Math.ceil(total / pageSize);
        const adjustedPage = page > totalPages ? totalPages : page;
        const skip = Math.max(0, (adjustedPage - 1) * pageSize);

        const datas = await prisma.city.findMany({
            where: {
                name: { contains: search.toLowerCase(), mode: "insensitive" }
            },
            skip: skip,
            take: pageSize
        });

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
