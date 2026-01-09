import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Ade Music';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#050505',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Liquid glass gradient glow */}
                <div
                    style={{
                        position: 'absolute',
                        width: 800,
                        height: 800,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,200,255,0.3) 0%, rgba(100,0,255,0.15) 40%, transparent 70%)',
                        filter: 'blur(60px)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Main title */}
                <div
                    style={{
                        fontSize: 120,
                        fontWeight: 'bold',
                        letterSpacing: '-0.03em',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #00D4FF 50%, #0080FF 100%)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '0 0 80px rgba(0,200,255,0.5)',
                        zIndex: 10,
                    }}
                >
                    ADE MUSIC
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: 28,
                        marginTop: 24,
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        zIndex: 10,
                    }}
                >
                    Singer • Songwriter • Beatmaker • Mixing & Mastering
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
