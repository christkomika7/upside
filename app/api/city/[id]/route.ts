import { City } from "@/app/generated/prisma";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { citySchema } from "@/lib/schemas";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const jsonData = await req.json();
    const validateData = citySchema.safeParse(jsonData);
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() as string;

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

    if (!id || id === "undefined") {
        return NextResponse.json({
            message: "Identifiant invalide.",
            state: "error",
        }, { status: 400 })
    }

    if (!validateData.success) {
        return NextResponse.json({
            message: "Donnée invalide."
        }, { status: 400 })
    }

    const data = validateData.data;

    try {
        const datas = await prisma.city.findMany();

        const isExist = datas?.some((d: City) =>
            d.name === data?.city?.toLowerCase()
        );
        if (isExist) return NextResponse.json({
            message: `${data?.city} existe déjà.`,
            state: "error",
        }, { status: 409 })

        const update = await prisma.city.update({
            where: { id },
            data: { name: validateData.data.city.toLowerCase() }
        })

        return NextResponse.json({
            message: "Modification réalisé avec succès.",
            data: update,
            total: datas.length,
            state: "success",

        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Erreur interne: " + error,
            state: 'error'
        }, {
            status: 500
        })
    }

};

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() as string;

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

    if (!id || id === "undefined") {
        return NextResponse.json({
            message: "Identifiant invalide.",
            state: "error",
        }, { status: 400 })
    }

    try {
        const [data, total] = await prisma.$transaction([
            prisma.city.delete({ where: { id } }),
            prisma.city.count()
        ])

        return NextResponse.json({
            message: "La ville a été supprimée avec  succès.",
            data: data,
            total
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

