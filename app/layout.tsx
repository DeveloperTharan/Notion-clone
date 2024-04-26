import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { EdgeStoreProvider } from "@/lib/edgestore";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Notion",
  description: "Notion",
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <EdgeStoreProvider>
        <body
          className={cn(
            "h-full bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </EdgeStoreProvider>
    </html>
  );
}
