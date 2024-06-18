import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import Header from "@/components/layouts/header"
import { cn } from "@/lib/utils"

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
        <Header />
        {children}
      </body>
    </html>
  )
}
