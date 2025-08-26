import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import Footer from "@/components/ui/Footer"
import Head from "next/head"


const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Quiz Naturalisation Française",
  description: "Application de quiz pour la préparation à la naturalisation française par mariage",
  creator: "Kesraoui Mohamed",
  keywords: [
    "quiz naturalisation",
    "quiz français",
    "préparation naturalisation",
    "citoyenneté française",
    "test nationalité",
    "quiz culture française"
  ],
  openGraph: {
    title: "Quiz Naturalisation Française",
    description: "Préparez votre naturalisation française avec des quiz interactifs et ludiques.",
    url: "https://quizzfr.vercel.app",
    
    siteName: "Quiz Naturalisation Française",
    images: [
      {
        url: "https://quizzfr.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quiz Naturalisation Française",
      },
    ],



    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiz Naturalisation Française",
    description: "Préparez votre naturalisation française avec des quiz interactifs.",
    images: ["https://quizzfr.vercel.app/og-image.png"],
    creator: "@TonTwitter",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>

      
      <head>
         <title>Quiz Naturalisation Française</title>
        <link rel="icon" href="/favicon.png" sizes="any" />

        </head>

      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${manrope.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            
            
            {
            children
          
            }
                 <Footer/>
          
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
