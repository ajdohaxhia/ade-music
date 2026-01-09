import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/context/AudioContext';
import GlobalPlayer from '@/components/GlobalPlayer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ade Music Portfolio',
    description: 'The sonic portfolio of Ade Music.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-black text-white antialiased`}>
                <AudioProvider>
                    {children}
                    <GlobalPlayer />
                </AudioProvider>
            </body>
        </html>
    );
}
