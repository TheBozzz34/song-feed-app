import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = auth(async (req) => {
  // Authentication check, not required for this route
  /*
  if (!req.auth) {
    return NextResponse.json(
      { message: "Authentication required" }, 
      { status: 401 }
    );
  }
    */

  // Extract and validate slug parameter
  const slug = req.nextUrl.pathname.split("/").pop();
  
  if (!slug) {
    return NextResponse.json(
      { message: "Missing profile identifier" }, 
      { status: 400 }
    );
  }

  try {
    // Add caching headers
    const headers = new Headers({
      'Cache-Control': 'max-age=60, s-maxage=60, stale-while-revalidate=300',
    });

    // Query database with selective fields for better performance
    const user = await prisma.user.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true, 
        email: true,
        slug: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User profile not found" }, 
        { status: 404, headers }
      );
    }


    return NextResponse.json(user, { headers });
  } catch (error) {
    console.error("Profile fetch error:", error);
    
    return NextResponse.json(
      { message: "Failed to retrieve user profile" }, 
      { status: 500 }
    );
  }
});