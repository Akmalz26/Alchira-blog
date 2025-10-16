import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Toast from "@/components/Toast"

export const metadata: Metadata = {
  title: "Alchira - Personal Blog",
  description: "A modern and elegant personal blog about technology, lifestyle, and everything in between.",
  keywords: ["blog", "personal blog", "technology", "lifestyle", "tutorials"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toast />
      </body>
    </html>
  )
}
