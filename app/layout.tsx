import type { Metadata } from "next";
import { Space_Grotesk, Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import PWARegistration from "@/components/PWARegistration";


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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "REDIX.MEDIA",
  },
};

// JSON-LD Structured Data for Organization/LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "REDIX.MEDIA",
  description:
    "Creative digital studio specializing in branding, website development, video editing, social media management, and digital marketing.",
  url: "https://redix.media",
  logo: "https://redix.media/logo.svg",
  foundingDate: "2022",
  areaServed: "Worldwide",
  serviceType: [
    "Website Development",
    "Branding & Design",
    "Social Media Management",
    "Video Editing",
    "Digital Marketing",
    "Content Creation",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://instagram.com/redix.media",
    "https://twitter.com/redixmedia",
    "https://linkedin.com/company/redixmedia",
  ],
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
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* DNS Prefetch & Preconnect for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <PWARegistration />
        {children}

        {/* ─── Analytics (placeholder — replace IDs with actual values) ─────── */}

        {/* Google Analytics (gtag.js) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
