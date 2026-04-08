import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { areaSchema } from "@/lib/schemas";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
    const jsonData = await req.json();
    const validateData = areaSchema.safeParse(jsonData);
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
        const [isExist, total] = await prisma.$transaction([
            prisma.area.findFirst({
                where: {
                    city: data.city.toLowerCase(),
                    name: data.area.toLowerCase()
                }
            }),
            prisma.area.count()
        ])

        if (isExist) return NextResponse.json({
            message: `${data.area} existe déjà dans la ville ${data.city}.`,
            state: "error",
        }, { status: 409 })

        const update = await prisma.area.update({
            where: { id },
            data: {
                name: validateData.data.area.toLowerCase(),
                city: validateData.data.city.toLowerCase(),
            }
        })

        return NextResponse.json({
            message: "Modification réalisé avec succès.",
            data: update,
            total,
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
        const [datas, total] = await prisma.$transaction([
            prisma.area.delete({ where: { id } }),
            prisma.area.count()
        ]);

        return NextResponse.json({
            message: "Le quartier a été supprimé avec  succès.",
            data: datas,
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

