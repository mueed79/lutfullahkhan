import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Configure Neue Montreal (Body)
const neueMontreal = localFont({
  src: [
    { path: "../public/fonts/NeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/NeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/NeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/NeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/NeueMontreal-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/NeueMontreal-MediumItalic.otf", weight: "500", style: "italic" },
    { path: "../public/fonts/NeueMontreal-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/NeueMontreal-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-neue-montreal",
});

// Configure PP Editorial New (Display)
const ppEditorialNew = localFont({
  src: [
    { path: "../public/fonts/PPEditorialNew-Ultralight.otf", weight: "100", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-UltralightItalic.otf", weight: "100", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/PPEditorialNew-Ultrabold.otf", weight: "800", style: "normal" },
    { path: "../public/fonts/PPEditorialNew-UltraboldItalic.otf", weight: "800", style: "italic" },
  ],
  variable: "--font-pp-editorial-new",
});

export const metadata: Metadata = {
  title: "Lutfullah Khan Archive | LUMS",
  description: "A cultural and historical archive giving visitors a window into the Lutfullah Khan collection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${neueMontreal.variable} ${ppEditorialNew.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--background-bg-light-primary)] text-[var(--text-text-black-primary)]">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
