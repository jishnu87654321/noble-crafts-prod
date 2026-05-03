import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const instrumentSerif = Instrument_Serif({ 
  weight: "400", 
  style: "italic", 
  subsets: ["latin"],
  variable: "--font-instrument-serif"
})

export const metadata: Metadata = {
  title: "NobleCrafts - Professional Web Design Agency",
  description: "Build, launch, and grow your online presence with beautiful, responsive, SEO-friendly websites.",
}

import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} ${instrumentSerif.variable} dark`}>
        {children}
        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  )
}
