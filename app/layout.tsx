import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import { CommandCenterPanel } from './components/command-center/CommandCenterPanel';
import { getShipsData } from './actions/ships';
import { getApiToken } from './actions/api-token';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Happy Path',
  description: 'Happy Path - v0',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getApiToken();
  const ships = await getShipsData(token.access_token);

  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <div className='relative'>
          <TopNav />
          <SideNav />
          <CommandCenterPanel ships={ships?.slice(0, 6)} />
          {children}
        </div>
      </body>
    </html>
  );
}
