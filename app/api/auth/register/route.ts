import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/model/User";

export async function POST(req: NextRequest) { // here request: NextRequest means in Post we want request and the datatype is NextRequest. TypeScript 101
    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and Password are required" },
                { status: 400 }
            )
        }

        await connectToDatabase() // running the DB
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 404 }
            )
        }

        await User.create({
            email,
            password,
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )


    } catch (error) {
        return NextResponse.json(
            { error: "failed to register" },
            { status: 500 }
        )
    }
}
