import type { Metadata } from "next";
import { Fira_Sans, Rubik_Bubbles } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  weight: ["400", "500", "700"],
});

const rubikBubbles = Rubik_Bubbles({
  variable: "--font-rubik-bubbles",
  weight: ["400"],
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
      <body
        className={`${firaSans.variable} ${rubikBubbles.variable} antialiased bg-[#d0cfec] font-[Fira_Sans] font-normal`}
      >
        {children}
      </body>
    </html>
  );
}
