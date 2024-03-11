import prisma from "@/prisma/db";
import bcrypt from "bcryptjs"
import {NextRequest, NextResponse} from "next/server";
import {userSchema} from "@/ValidationSchemas/user";


interface Props {
    params : {id : string}
}

export async function PATCH(request : NextRequest, {params} : Props) {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), {status: 400});
    }

    const user = await prisma.user.findUnique({
        where : {
            id : parseInt(params.id)
        }
    })

    if (!user) {
        return NextResponse.json({error : "User Not Found"}, {status : 404});
    }

    if (body.password && body.password !== "") {
        body.password = await bcrypt.hash(body.password, 10);
    }
    else {
        delete body.password;
    }

    if (user.username !== body.username) {
        const duplicateUserName = await prisma.user.findUnique({
            where : {username : body.username}
        })

        if (duplicateUserName) {
            return NextResponse.json({error : "Duplicate Username"}, {status : 409})
        }
    }

    const updateUser = await prisma.user.update({
        where : {id : user.id},
        data : {...body}
    })

    return NextResponse.json(updateUser)
}
