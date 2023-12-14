import { withAuth } from "next-auth/middleware"

export default withAuth({
  // URL where users should be redirected to when they are not authenticated
  pages: {
    signIn: "/",
  },
})

// config object that specifies which routes the middleware should apply to
export const config = {
  matcher: ["/users/:path*"],
}
