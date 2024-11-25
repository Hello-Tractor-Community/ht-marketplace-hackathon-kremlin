import type { Metadata } from "next";
import { montserrat, mulish } from "./fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello Tractor || Tractor Marketplace",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${mulish.variable} antialiased`}
    >
      <body className={`${mulish.className}`}>{children}</body>
    </html>
  );
}
