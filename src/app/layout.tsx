import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import { AppKnockProviders } from "./knock-providers";
import { SessionProvider } from "next-auth/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Bidder's Elite",
  description: "Auction your items online and also get the super deals by bidding on the items you like.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
          " bg-background font-sans antialiased bg-[#F7F8F9] ",
          fontSans.variable
        )}>
          
          <SessionProvider>
              <AppKnockProviders>
                <Header/>
                <div className="">{children}</div>
              </AppKnockProviders>
          </SessionProvider>

          </body>
    </html>
  );
}
