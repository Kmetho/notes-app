import type { Metadata } from "next";
import { Fira_Sans, Rubik_Bubbles } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const rubikBubbles = Rubik_Bubbles({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "notes",
  description: "cute draggable notes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#d0cfec]">{children}</body>
    </html>
  );
}
