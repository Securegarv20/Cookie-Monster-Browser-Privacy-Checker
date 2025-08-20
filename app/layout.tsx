import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cookie Monster Privacy Checker',
  description: 'Scan and analyze your browser cookies with Cookie Monster! OM NOM NOM!',
  icons: {
    icon: [
      { url: 'https://res.cloudinary.com/del3zgpaw/image/upload/v1755532265/favicon_o45rac.ico' },
      new URL('https://res.cloudinary.com/del3zgpaw/image/upload/v1755532264/favicon-32x32_bcq0dj.png'),
      { url: 'https://res.cloudinary.com/del3zgpaw/image/upload/v1755532265/favicon-16x16_a2wyyy.png', sizes: '16x16' },
    ],
    apple: [
      { url: 'https://res.cloudinary.com/del3zgpaw/image/upload/v1755532265/apple-touch-icon_wruqpp.png' },
    ],
    other: [
      {
        rel: 'icon',
        url: 'https://res.cloudinary.com/del3zgpaw/image/upload/v1755532351/Cookie_Monster_nm0hiz.png',
      },
    ],
  },
  openGraph: {
    title: 'Cookie Monster Privacy Checker',
    description: 'Scan and analyze your browser cookies with Cookie Monster! OM NOM NOM!',
    url: 'https://yourwebsite.com',
    siteName: 'Cookie Monster Privacy Checker',
    images: [
      {
        url: 'https://res.cloudinary.com/del3zgpaw/image/upload/v1755532351/Cookie_Monster_nm0hiz.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cookie Monster Privacy Checker',
    description: 'Scan and analyze your browser cookies with Cookie Monster! OM NOM NOM!',
    images: ['https://res.cloudinary.com/del3zgpaw/image/upload/v1755532351/Cookie_Monster_nm0hiz.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4285f4" />
        <meta name="keywords" content="cookies, privacy, browser, scan, cookie monster" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}