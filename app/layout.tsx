import type { Metadata } from "next";
import { Space_Grotesk, Poppins, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REDIX.MEDIA — Creative Digital Studio | Branding, Web & Content",
  description:
    "REDIX.MEDIA is a bold creative digital studio helping businesses grow through strategic content, branding, website development, video editing, social media management, and digital marketing.",
  keywords: [
    "creative digital agency",
    "social media management",
    "website development",
    "branding and design",
    "video editing",
    "digital marketing",
    "content creation",
    "REDIX.MEDIA",
    "brand identity",
    "motion graphics",
  ],
  authors: [{ name: "REDIX.MEDIA" }],
  creator: "REDIX.MEDIA",
  publisher: "REDIX.MEDIA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://redix.media",
    siteName: "REDIX.MEDIA",
    title: "REDIX.MEDIA — Creative Digital Studio",
    description:
      "Bold creative studio helping businesses grow through branding, websites, content, and digital strategy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDIX.MEDIA — Creative Digital Studio",
    description:
      "Bold creative studio helping businesses grow through branding, websites, content, and digital strategy.",
    creator: "@redixmedia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${poppins.variable} ${inter.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
