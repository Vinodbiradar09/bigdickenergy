import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, desc, cause, age, eulogy, commit, github, url } = body;
    if (!name || !cause || !commit || !github || !url || !age || !desc) {
      return NextResponse.json(
        {
          message: "all the fields are required",
          success: false,
        },
        { status: 400 },
      );
    }
    if ((desc && desc.length > 200) || (eulogy && eulogy.length > 200)) {
      return NextResponse.json(
        {
          message: "keep things short such as desc and eulogy",
          success: false,
        },
        { status: 400 },
      );
    }
    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        desc: desc.trim(),
        cause: cause.trim(),
        age: age.trim(),
        eulogy: eulogy.trim(),
        commit: commit.trim(),
        github: github.trim(),
        url: url.trim(),
      },
    });
    return NextResponse.json(
      {
        message: "Ok",
        success: true,
        project,
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 20;
    const offset = Number(searchParams.get("offset")) || 0;

    const projects = await prisma.project.findMany({
      orderBy: {
        felt: "desc",
        createdAt: "desc",
      },
      take: limit,
      skip: offset,
    });
    return NextResponse.json(
      {
        message: "Ok",
        success: true,
        projects,
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
