import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#050505',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#00F0FF',
                        letterSpacing: '-0.05em',
                    }}
                >
                    444
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
