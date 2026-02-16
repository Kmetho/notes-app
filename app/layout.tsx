import type { Metadata } from "next";
import { Fira_Sans, Rubik_Bubbles } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-fira-sans",
});

const rubikBubbles = Rubik_Bubbles({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-bubbles",
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
        className={`${firaSans.variable} ${rubikBubbles.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
