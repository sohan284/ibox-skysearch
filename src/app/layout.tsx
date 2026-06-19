import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "iBox SkySearch - Find cheap flights & book airline tickets",
  description:
    "Search and compare flights from hundreds of airlines. Find the best deals on plane tickets for your next trip with iBox SkySearch.",
  keywords:
    "flights, cheap flights, airline tickets, flight search, book flights, travel, flight deals",
  authors: [{ name: "iBox Lab" }],
  openGraph: {
    title: "iBox SkySearch - Find cheap flights & book airline tickets",
    description:
      "Search and compare flights from hundreds of airlines. Find the best deals on plane tickets for your next trip.",
    url: "https://ibox-skysearch.com",
    siteName: "iBox SkySearch",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iBox SkySearch - Find cheap flights & book airline tickets",
    description:
      "Search and compare flights from hundreds of airlines. Find the best deals on plane tickets for your next trip.",
    creator: "@iboxlab",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar title="iBox SkySearch" />
        {children}
      </body>
    </html>
  );
}
