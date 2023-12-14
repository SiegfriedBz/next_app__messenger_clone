import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`container h-screen mx-auto p-4 sm:p-8 lg:p-16 bg-gray-100 ${inter.className}`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
