import {NextRequest, NextResponse} from "next/server";
import {userSchema} from "@/ValidationSchemas/user";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs"


export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }


    const duplicate = await prisma.user.findUnique({
        // @ts-ignore
        where: {
            username: body.username
        }
    })

    if (duplicate) {
        return NextResponse.json({message: "Duplicate Username",}, {status: 409});
    }

    body.password = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({data: {...body}})

    return NextResponse.json(newUser, {status: 201})
}
