import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ClientLayout } from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Mumsy.ai";
const APP_DEFAULT_TITLE = "Mumsy.ai - CHW Action Tool";
const APP_TITLE_TEMPLATE = "%s - Mumsy.ai";
const APP_DESCRIPTION = "Community Health Worker action tool to detect preeclampsia and anemia risks.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="light">
      <body className={`${inter.className}`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
