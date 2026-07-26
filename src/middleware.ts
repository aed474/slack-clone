import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/auth",
]);

export default convexAuthNextjsMiddleware(async (request) => {
    const isPublic = isPublicRoute(request);
    const isAuthenticated = await isAuthenticatedNextjs();

    if (!isPublic && !isAuthenticated) {
        return nextjsMiddlewareRedirect(request, "/auth");
    }

    if (isPublic && isAuthenticated){
        return nextjsMiddlewareRedirect(request,"/")
    }
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)",
    ],
};