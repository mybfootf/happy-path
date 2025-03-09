import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import { CommandCenterPanel } from './components/command-center/CommandCenterPanel';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Happy Path',
  description: 'Happy Path - v0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <div className='relative'>
          <TopNav />
          <SideNav />
          <CommandCenterPanel />
          {children}
        </div>
      </body>
    </html>
  );
}
