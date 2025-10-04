import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Urbanist, Poppins } from "next/font/google";
import { RoleProvider } from "@/components/role-context";

export const metadata: Metadata = {
  title: "VeCarbon Market",
  description: "Decentralized Carbon Credit Marketplace on VeChain",
  generator: "v0.app",
};

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${poppins.variable} antialiased`}
    >
      <body className="font-sans">
        <RoleProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </RoleProvider>
        <Analytics />
      </body>
    </html>
  );
}
