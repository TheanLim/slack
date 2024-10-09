import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware((request) => {
    // console.log("Request URL:", request.nextUrl.pathname);

    if (!isSignInPage(request) && !isAuthenticatedNextjs()) {
        // console.log("Redirecting to /auth");
        return nextjsMiddlewareRedirect(request, "/auth");
    }

    if (isSignInPage(request) && isAuthenticatedNextjs()) {
        // console.log("Already authenticated, redirecting to /");
        return nextjsMiddlewareRedirect(request, "/");
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
