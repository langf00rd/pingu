import { authMiddleware } from "@clerk/nextjs";
import { ROUTES } from "./routes";

export default authMiddleware({
  ignoredRoutes: [ROUTES.index, ROUTES.auth],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
