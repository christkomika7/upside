import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const jsonData = await req.json();
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop() as string;

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

    if (!id || id === "undefined") {
        return NextResponse.json({
            message: "Identifiant invalide.",
            state: "error",
        }, { status: 400 })
    }

    const isOnline: boolean = jsonData.isOnline;


    try {

        const [update, total] = await prisma.$transaction([
            prisma.realstate.update({
                where: { id },
                data: { online: isOnline }
            }),
            prisma.realstate.count()
        ])

        return NextResponse.json({
            message: "Modification réalisé avec succès.",
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