import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

function base64URLEncode(str: Buffer): string {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

async function sha256(buffer: Buffer): Promise<Buffer> {
    const digest = await crypto.subtle.digest('SHA-256', buffer);
    return Buffer.from(digest);
}

export async function GET(request: Request) {
    try {
        const etsyApiKey = process.env.ETSY_API_KEY;

        const nodeEnv = process.env.NODE_ENV;
        const vercelUrl = process.env.VERCEL_URL;
        const appBaseUrl = nodeEnv === 'production' && vercelUrl
            ? `https://${vercelUrl}`
            : 'http://localhost:3001';

        const redirectUri = `${appBaseUrl}/api/auth/callback/etsy`;

        if (!etsyApiKey) {
            console.error('ETSY_API_KEY environment variable is not set.');
            return NextResponse.json({ message: 'Sunucu yapılandırma hatası: API Key eksik.' }, { status: 500 });
        }

        const state = base64URLEncode(crypto.getRandomValues(Buffer.alloc(32)));
        const codeVerifier = base64URLEncode(crypto.getRandomValues(Buffer.alloc(32)));
        const codeChallengeBuffer = await sha256(Buffer.from(codeVerifier));
        const codeChallenge = base64URLEncode(codeChallengeBuffer);
        const code_challenge_method = 'S256';

        const scopes = 'listings_r listings_w email_r';

        const authorizationUrl = new URL('https://www.etsy.com/oauth/connect');
        authorizationUrl.searchParams.append('response_type', 'code');
        authorizationUrl.searchParams.append('client_id', etsyApiKey);
        authorizationUrl.searchParams.append('redirect_uri', redirectUri);
        authorizationUrl.searchParams.append('scope', scopes);
        authorizationUrl.searchParams.append('state', state);
        authorizationUrl.searchParams.append('code_challenge', codeChallenge);
        authorizationUrl.searchParams.append('code_challenge_method', code_challenge_method);

        console.log(`Redirecting to Etsy: ${authorizationUrl.toString()}`);
        console.log(`Expected callback at: ${redirectUri}`);
        console.log(`Storing state and code_verifier in cookies (connect step)`);

        const cookieStore = cookies();
        const cookieOptions = {
            httpOnly: true,
            secure: nodeEnv === 'production',
            path: '/',
            maxAge: 60 * 15,
            sameSite: 'lax' as const
        };
        cookieStore.set('etsy_oauth_state', state, cookieOptions);
        cookieStore.set('etsy_code_verifier', codeVerifier, cookieOptions);

        redirect(authorizationUrl.toString());

    } catch (error) {
        console.error("Error during Etsy connect initiation:", error);
        return NextResponse.json({ 
            message: 'Etsy bağlantısı başlatılamadı.', 
            error: (error instanceof Error) ? error.message : String(error) 
        }, { status: 500 });
    }
} 