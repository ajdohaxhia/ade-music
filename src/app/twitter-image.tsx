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
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <div style={{
                    fontSize: 120,
                    fontWeight: 'bold',
                    letterSpacing: '-0.05em',
                    backgroundImage: 'linear-gradient(to bottom, #fff, #666)',
                    backgroundClip: 'text',
                    color: 'transparent',
                }}>ADE MUSIC</div>
                <div style={{ fontSize: 40, marginTop: 20, opacity: 0.7, letterSpacing: '0.2em' }}>SINGER · PRODUCER</div>
            </div>
        ),
        {
            ...size,
        }
    );
}
