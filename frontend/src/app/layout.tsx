import type { Metadata } from "next";
import { montserrat, dmSans, inter, playfair } from "./fonts";
import "./globals.css";
import Providers from "./providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { AnnouncementBar } from "@/widgets/announcement-bar";

export const metadata: Metadata = {
  title: "SAUDADE | Authentic Brazilian Fashion",
  description: "Authentic Brazilian fashion for women who long for connection, quality, and home. Where tropical warmth meets European sophistication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${dmSans.variable} ${inter.variable} ${playfair.variable} antialiased bg-brand-cream text-brand-teal flex flex-col min-h-screen`}
      >
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
