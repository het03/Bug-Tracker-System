import { AUTH_COOKIE } from "@/features/auth/constants";
import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (
    !userId ||
    !secret ||
    typeof userId !== "string" ||
    typeof secret !== "string"
  ) {
    return new NextResponse("Invalid or missing fields", { status: 400 });
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    cookies().set(AUTH_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  } catch (error) {
    console.error("Error creating session:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
