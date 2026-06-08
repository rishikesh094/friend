import { Inter, Caveat, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const caveat = Caveat({ subsets: ["latin"], variable: '--font-caveat' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata = {
  title: "Happy Best Friends Day ❤️",
  description: "A magical friendship celebration filled with warmth, happiness, and memories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveat.variable} ${outfit.variable} font-sans`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
