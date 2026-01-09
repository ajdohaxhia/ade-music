'use client';

import { AudioProvider } from '@/context/AudioContext';
// @ts-ignore
import { ReactLenis } from '@studio-freight/react-lenis';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AudioProvider>
            <ReactLenis root>
                {children}
            </ReactLenis>
        </AudioProvider>
    );
}
