import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-provider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Workspace | Notion",
    template: "%s | Notion",
  },
  description: "Getting Started | Notion",
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
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <Toaster position="top-center" />
            {children}
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
