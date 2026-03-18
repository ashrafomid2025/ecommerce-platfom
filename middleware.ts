import { NextResponse } from "next/server";

export function middleware(request: any) {
  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();

    const newRequestHeader = new Headers(request.headers);

    const response = NextResponse.next({
      request: {
        headers: newRequestHeader,
      },
    });
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  } else {
    return NextResponse.next();
  }
}
