import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import Header from "@/components/layouts/header"
import CustomToaster from "@/components/toaster/custom-toaster"
import Modal from "@/components/ui/modal"
import { cn } from "@/lib/utils"
import { ReduxProvider } from "@/redux/provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rock, Paper, Scissors Game",
  description:
    "Play the classic game of Rock, Paper, Scissors online! Challenge the computer or invite friends for a duel. Enjoy a seamless and fun gaming experience with our interactive platform.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-custom-gradient")}>
        <ReduxProvider>
          <Header />
          <CustomToaster />
          {children}
          <Modal />
          <VercelAnalytics />
        </ReduxProvider>
      </body>
    </html>
  )
}
