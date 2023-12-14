import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { authFormSchema } from "@/lib/zodSchemas"
import prismaClient from "@/lib/prismaClient"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the body against the authForm schema
    const parsedBody = authFormSchema.safeParse(body)

    if (!parsedBody.success) {
      let zodErrors = {}
      parsedBody.error.issues.forEach((issue) => {
        zodErrors = {
          ...zodErrors,
          [issue.path[0]]: issue.message,
        }
      })
      return NextResponse.json({ errors: zodErrors }, { status: 422 })
    }

    // Destructure the body
    const { email, password, name } = parsedBody.data

    // Check if the user already exists
    const userExists = await prismaClient.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return NextResponse.json(
        { errors: ["A user with that email already exists"] },
        { status: 422 }
      )
    }

    // Create the user
    let newUserName = name
    if (!newUserName) {
      newUserName =
        email.split("@")[0].charAt(0).toUpperCase() +
        email.split("@")[0].slice(1)
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await prismaClient.user.create({
      data: {
        email,
        name: newUserName,
        hashPassword,
      },
    })

    if (!user) {
      throw new Error()
    }

    return NextResponse.json(
      {
        user,
        message: "You signed up successfully!",
      },
      { status: 201 }
    )
  } catch (error) {
    console.log("USER_REGISTRATION_ERROR: ", error)
    return NextResponse.json(
      { errors: ["Error creating user"] },
      { status: 500 }
    )
  }
}
