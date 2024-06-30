import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: [ "latin" ],
  variable: "--font-poppins",
  weight: [ "100", "200", "300", "400", "500", "600", "700", "800", "900" ]
});

export const metadata: Metadata = {
  title: "Lexi kitchen",
  description: "A place for great and tasty meals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
