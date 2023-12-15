import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import SessionProvider from "@/context/SessionProviderContext"
import ToastContainer from "@/context/ToastContainerContext"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  /** GET SERVER SIDE SESSION
   * & PASS IT TO SessionProvider
   * => session object immediately available to useSession
   * */
  const session = await getServerSession(authOptions)

  return (
    <html lang='en'>
      <body
        className={`container h-screen mx-auto bg-gray-100 ${inter.className}`}
      >
        <SessionProvider session={session}>
          {children}
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  )
}
