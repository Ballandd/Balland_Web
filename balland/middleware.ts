import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

const secret = process.env.AUTH_SECRET

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const session = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  const { pathname } = request.nextUrl;
   if (pathname.startsWith("/login") || pathname.startsWith("/reservation")) {
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}