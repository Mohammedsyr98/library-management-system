import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { createClient } from "./utils/supabase/supabase-server";

export async function proxy(request: NextRequest) {
  const supabase = await createClient();
  const pathname = request.nextUrl.pathname;
  const { data: userData } = await supabase.auth.getUser();

  const { data } = userData.user
    ? await supabase
        .from("users")
        .select("role")
        .eq("id", userData.user.id)
        .single()
    : { data: null };
  const role = data?.role ?? null;

  // Public routes (can be accessed by anyone)
  const publicPaths = ["/"];
  const isPublic = publicPaths.includes(pathname);

  // 🟥 1. If NOT logged in → redirect to "/"
  if (!role && !isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🟩 If logged in → Role-based redirects
  if (pathname === "/") {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/home", request.url));
    } else if (role === "USER") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // 🟧 2. User trying to access ADMIN ROUTES
  if (role && role !== "ADMIN" && pathname.includes("dashboard")) {
    const previousUrl = request.headers.get("referer") || "/home";

    // Pass error message to client via cookies
    const redirectUrl = new URL(previousUrl, request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("toast", "ACCESS_DENIED", {
      path: "/",
      maxAge: 5,
    });
    response.cookies.set("toastType", "error", {
      path: "/",
      maxAge: 5,
    });

    return response;
  }

  // Maintain Supabase session
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
