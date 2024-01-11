import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret, raw: true });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/login") || pathname.startsWith("/sign")) {
    if (session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (pathname.startsWith("/info")) {
    if (!session) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // 추후 페이지 늘어나면 업데이트하기
}
export const config = {
  matcher: ["/login", "/sign", "/info"],
};
