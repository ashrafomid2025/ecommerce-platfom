import { NextResponse } from "next/server";

export function middleware(request: any) {
  if (!request.cookies.get("sessionCartId")) {
    // create rondom id
    const sessionCartId = crypto.randomUUID();
    const newRequestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  } else {
    return NextResponse.next();
  }
}
