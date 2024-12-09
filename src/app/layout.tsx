import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from './providers';
import Navbar from "@/components/organisms/Navbar/Navbar";

const lexendDeca = localFont({
  src: [
    {
      path: './fonts/Lexend_Deca/LexendDeca-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    }
  ],
  variable: '--font-lexend-deca',
  display: 'swap',
});

const robotoBlack = localFont({
  src: [
    {
      path: './fonts/Roboto/Roboto-Black.ttf',
      weight: '100 900',
      style: 'normal',
    }
  ],
  variable: '--font-roboto-black',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BookshelfQuest",
  description: "Your personal reading journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexendDeca.variable} ${robotoBlack.variable}`}>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
