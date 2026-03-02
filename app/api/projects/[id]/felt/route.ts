import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "Not Ok",
          success: false,
        },
        { status: 400 },
      );
    }
    const cookieStore = cookies();
    const felt = (await cookieStore).get(`felt_${id}`);
    if (felt) {
      return NextResponse.json(
        {
          message: "Already Felt",
          success: true,
        },
        { status: 400 },
      );
    }
    await prisma.project.update({
      where: { id },
      data: { felt: { increment: 1 } },
    });
    (await cookieStore).set(`felt_${id}`, "true", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return NextResponse.json(
      {
        message: "felt",
        success: true,
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
}
