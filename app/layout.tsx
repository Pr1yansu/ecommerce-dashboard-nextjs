import "./globals.css";
import type { Metadata } from "next";
import { Allura, Montserrat, Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/Toast-provider";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});
const body = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "300"],
  variable: "--font-body",
});
const subHeading = Allura({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-subHeading",
});

export const metadata: Metadata = {
  title: "Ecommerce Dashboard",
  description: "Ecommerce Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${body.variable} ${heading.variable} ${subHeading.variable}`}
        >
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
