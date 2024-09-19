import { 
    convexAuthNextjsMiddleware, 
    createRouteMatcher, 
    isAuthenticatedNextjs, 
    nextjsMiddlewareRedirect 
} from "@convex-dev/auth/nextjs/server";
 
const isSignInPage = createRouteMatcher(["/auth"])

export default convexAuthNextjsMiddleware((request) => {
    if(!isSignInPage(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }
    // TODO: Redirect user away from "/auth" if authenticated
});
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};