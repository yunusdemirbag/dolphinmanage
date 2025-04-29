import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
    const cookieStore = cookies();
    const { searchParams } = new URL(request.url);

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    const storedState = cookieStore.get('etsy_oauth_state')?.value;
    const storedCodeVerifier = cookieStore.get('etsy_code_verifier')?.value;

    cookieStore.delete('etsy_oauth_state');
    cookieStore.delete('etsy_code_verifier');

    console.log("Callback received:");
    console.log("Code:", code);
    console.log("State:", state);
    console.log("Stored State:", storedState);

    if (!code) {
        console.error("Callback error: No code received from Etsy.");
        return redirect('/dashboard?status=error&message=Etsy_Auth_Code_Missing');
    }
    if (!state || !storedState) {
        console.error("Callback error: State parameter missing.");
        return redirect('/dashboard?status=error&message=Etsy_State_Missing');
    }
    if (state !== storedState) {
        console.error("Callback error: State mismatch (CSRF potential attack!).");
        console.error("Received State:", state);
        console.error("Expected State:", storedState);
        return redirect('/dashboard?status=error&message=Etsy_State_Mismatch');
    }
    if (!storedCodeVerifier) {
        console.error("Callback error: Code verifier missing from cookie.");
        return redirect('/dashboard?status=error&message=Etsy_Verifier_Missing');
    }

    const etsyApiKey = process.env.ETSY_API_KEY;

    if (!etsyApiKey) {
        console.error('ETSY_API_KEY environment variable is not set for token exchange.');
        return redirect('/dashboard?status=error&message=Server_Config_Error');
    }

    const nodeEnv = process.env.NODE_ENV;
    const vercelUrl = process.env.VERCEL_URL;
    const appBaseUrl = nodeEnv === 'production' && vercelUrl
        ? `https://${vercelUrl}`
        : 'http://localhost:3001';
    const redirectUri = `${appBaseUrl}/api/auth/callback/etsy`;

    const tokenUrl = 'https://api.etsy.com/v3/public/oauth/token';
    const requestBody = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: etsyApiKey,
        redirect_uri: redirectUri,
        code: code,
        code_verifier: storedCodeVerifier
    });

    console.log("Making POST request to Etsy token endpoint:", tokenUrl);
    console.log("Request Body:", {
        grant_type: 'authorization_code',
        client_id: etsyApiKey,
        redirect_uri: redirectUri,
        code: code ? '***received***' : 'null',
        code_verifier: storedCodeVerifier ? '***retrieved_from_cookie***' : 'null'
    });

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody.toString(),
        });

        const tokenData = await response.json();

        console.log("Etsy Token Response Status:", response.status);

        if (!response.ok) {
            console.error('Error fetching Etsy token:', tokenData);
            const errorMessage = encodeURIComponent(tokenData?.error_description || tokenData?.error || 'Token_Exchange_Failed');
            return redirect(`/dashboard?status=error&message=${errorMessage}`);
        }

        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;
        const expiresIn = tokenData.expires_in;
        const userId = tokenData.access_token.split('.')[0];

        console.log("Successfully obtained Etsy tokens for user:", userId);
        console.log("Access Token Expires In:", expiresIn, "seconds");

        return redirect('/dashboard?status=success');

    } catch (error) {
        console.error('Error during Etsy token exchange process:', error);
        const errorMessage = encodeURIComponent((error instanceof Error) ? error.message : 'Callback_Fetch_Error');
        return redirect(`/dashboard?status=error&message=${errorMessage}`);
    }
} 