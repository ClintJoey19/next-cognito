import { NextRequest, NextResponse } from "next/server";
import { authenticated } from "./lib/amplify-server/amplify-server";
import { AuthSession } from "aws-amplify/auth";

const authRoutes = ["/sign-in"];
const userRoutes = ["/", "profile"];
const hrRoutes = ["/hr"];
const tlRoutes = ["/tl"];
const adminRoutes = ["/admin"];

type UserCache = {
  user: AuthSession | null;
};

export const cache: UserCache = {
  user: null,
};

export const middleware = async (request: NextRequest) => {
  const { nextUrl } = request;
  const response = NextResponse.next();

  console.log("middleware");

  const session = await authenticated({ request, response });

  // // required to sign in if unauthenticated
  if (!session?.tokens)
    return NextResponse.redirect(new URL("/sign-in", nextUrl));

  const roles = session?.tokens?.accessToken.payload[
    "cognito:groups"
  ] as string[];

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isUserRoute = userRoutes.includes(nextUrl.pathname);
  const isHrRoute = hrRoutes.includes(nextUrl.pathname);
  const isTlRoute = tlRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (session.tokens && isAuthRoute) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // RBAC here
  // if HR
  if (isHrRoute && !roles.includes("hr")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // // if TL
  if (isTlRoute && !roles.includes("tl")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // // if ADMIN
  if (isAdminRoute && !roles.includes("admin")) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
