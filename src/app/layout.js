// src/app/layout.js

import "./globals.css";
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Prompt } from "next/font/google";
import Script from "next/script";

// ✅ Import Server Actions (Mongo Settings + Tracking)
import { headers } from "next/headers";
import { getGoogleTagSettings, trackVisitor } from "@/actions/appActions";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import { CartProvider } from "@/components/CartContext";

const prompt = Prompt({
  weight: ["300", "400", "500", "700"],
  subsets: ["thai", "latin"],
  display: "swap",
});

// ตั้งค่า URL หลัก
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.pgmobilev9.com";
const siteUrl = rawSiteUrl.startsWith("http")
  ? rawSiteUrl
  : `https://${rawSiteUrl}`;

// รูปสำหรับ OG / Logo
const ogImage = `${siteUrl}/images/table-thumbnail.jpg`;
const logoImage = `${siteUrl}/images/logo.png`;

// ข้อมูลติดต่อ
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

// แบรนด์ / นิติบุคคล
const brandName = "pg mobile";
const companyLegal =
  process.env.NEXT_PUBLIC_COMPANY_LEGAL || "PG MOBILE LIMITED PARTNERSHIP";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "pg mobile | แหล่งรวมมือถือคุณภาพ ประกันศูนย์ไทย",
    template: "%s | pg mobile",
  },
  applicationName: "pg mobile",
  description:
    "pg mobile ศูนย์รวมมือถือ PG V9 และสมาร์ทโฟนราคาคุ้มค่า ประกันศูนย์ไทยแท้ 100% ส่งฟรีทั่วประเทศ เก็บเงินปลายทางได้ สินค้าคุณภาพเชื่อถือได้",
  keywords: [
    "pg mobile",
    "pg mobile v9",
    "pg v9",
    "pg",
    "โทรศัพท์มือถือ",
    "สมาร์ทโฟนราคาถูก",
    "มือถือประกันศูนย์",
  ],
  alternates: { canonical: siteUrl },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "pg mobile | มือถือคุณภาพ ราคาคุ้มค่า",
    description:
      "เลือกซื้อโทรศัพท์มือถือ PG Mobile V9 ประกันศูนย์ไทย ส่งฟรี เก็บเงินปลายทาง",
    url: siteUrl,
    siteName: "pg mobile",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "สินค้าแนะนำจาก pg mobile",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pg mobile",
    description: "ศูนย์รวมมือถือ PG Mobile V9 ราคาคุ้มค่า",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    maxImagePreview: "large",
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function pickClientIp(headersList) {
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIp = headersList.get("x-real-ip");
  const cfIp = headersList.get("cf-connecting-ip");

  const raw =
    (forwardedFor && forwardedFor.split(",")[0]) || realIp || cfIp || "";
  return raw.trim() || "Unknown";
}

// ✅ async เพื่อดึง Google Ads ID จาก Mongo + trackVisitor
export default async function RootLayout({ children }) {
  // --- 1) Track Visitor (กันซ้ำ 2 นาทีทำใน trackVisitor แล้ว) ---
  try {
    const headersList = await headers();
    const userAgentRaw = headersList.get("user-agent") || "";
    const userAgent = userAgentRaw.toLowerCase();
    const ip = pickClientIp(headersList);
    const referrer = headersList.get("referer") || headersList.get("referrer") || "";

    // เช็คบอท
    const botKeywords = [
      "bot",
      "crawl",
      "spider",
      "slurp",
      "facebookexternalhit",
      "googlebot",
      "twitterbot",
      "line",
      "ahrefs",
      "tiktok",
      "discord",
    ];
    const isBot = botKeywords.some((k) => userAgent.includes(k));

    // ✅ ควร await เพื่อให้ไม่เกิด warning/พฤติกรรมแปลกใน server
    await trackVisitor({
      ip,
      userAgent: userAgentRaw,
      isBot,
      path: "GLOBAL_LAYOUT",
      referrer,
    });
  } catch (err) {
    console.error("Tracking Error:", err);
  }

  // --- 2) ดึง Google Ads ID จาก Admin (รูปแบบใหม่: current/history) ---
  let googleAdsId = "";
  try {
    const pack = await getGoogleTagSettings(); // { current, history, updatedAt }
    googleAdsId = (pack?.current || "").trim(); // เช่น "AW-123456789"
  } catch (err) {
    console.error("Get Google Tag Error:", err);
  }

  // WebSite + Sitelinks Search Box
  const ldJsonWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: brandName,
    alternateName: ["PG Mobile V9", "PG Mobile Official", "pgmobile"],
    url: siteUrl,
    inLanguage: "th-TH",
    publisher: { "@id": `${siteUrl}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Organization
  const ldJsonOrganization = {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    "@id": `${siteUrl}#organization`,
    name: brandName,
    legalName: companyLegal,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: logoImage, width: 112, height: 112 },
    contactPoint: [
      ...(contactPhone
        ? [
            {
              "@type": "ContactPoint",
              telephone: contactPhone,
              contactType: "customer service",
              areaServed: "TH",
              availableLanguage: "Thai",
            },
          ]
        : []),
      ...(contactEmail
        ? [
            {
              "@type": "ContactPoint",
              email: contactEmail,
              contactType: "customer service",
            },
          ]
        : []),
    ],
    sameAs: [],
  };

  // Breadcrumb
  const ldJsonBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าหลัก", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "สินค้า",
        item: `${siteUrl}/products`,
      },
    ],
  };

  // WebPage
  const ldJsonWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}#webpage`,
    url: siteUrl,
    name: "pg mobile | แหล่งรวมมือถือคุณภาพ ประกันศูนย์ไทย",
    inLanguage: "th-TH",
    isPartOf: { "@id": `${siteUrl}#website` },
    about: { "@id": `${siteUrl}#organization` },
  };

  return (
    <html lang="th" className={prompt.className}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonBreadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJsonWebPage) }}
        />
      </head>

      <body>
        {/* ✅ แทรก Google Ads Script อัตโนมัติ (ถ้า Admin ใส่ ID ไว้) */}
        {googleAdsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-tag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdsId}');
              `}
            </Script>
          </>
        ) : null}

        <CartProvider>
          <NavBar />
          {children}
          <Footer />
          <CookieConsent />
        </CartProvider>

        {/* Bootstrap Bundle */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
