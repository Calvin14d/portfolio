import type { Metadata } from "next";
import { Geist, Geist_Mono, Bitter } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import NetworkStatus from "@/components/ui/NetworkStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Monarch | Portfolio",
  description: "Cybersecurity Engineer, Front-end & Back-end Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitter.variable} antialiased`}
      >
        <Providers>
          {children}
          <NetworkStatus />
        </Providers>
      </body>
    </html>
  );
}
