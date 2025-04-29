import { NextResponse } from 'next/server';

// Etsy OAuth için gerekli bilgiler
const ETSY_API_KEY = process.env.ETSY_API_KEY;
const ETSY_SHARED_SECRET = process.env.ETSY_SHARED_SECRET;
const ETSY_OAUTH_URL = 'https://www.etsy.com/oauth/connect';

// Callback URL'i - Vercel'de deploy edildiğinde güncellenecek
const REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://dolphinmanage.vercel.app/api/auth/etsy/callback'
  : 'http://localhost:3000/api/auth/etsy/callback';

export async function GET() {
  try {
    if (!ETSY_API_KEY) {
      console.error('ETSY_API_KEY is not set');
      return NextResponse.json(
        { message: 'Etsy API yapılandırması eksik.' },
        { status: 500 }
      );
    }

    // OAuth için gerekli parametreleri hazırla
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: ETSY_API_KEY,
      redirect_uri: REDIRECT_URI,
      scope: 'listings_r listings_w', // İhtiyaca göre scope'ları ayarla
      state: 'random_state_' + Date.now(), // CSRF koruması için
    });

    // Etsy OAuth URL'ini oluştur
    const authUrl = `${ETSY_OAUTH_URL}?${params.toString()}`;

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Etsy auth error:', error);
    return NextResponse.json(
      { message: 'Etsy bağlantısı sırasında bir hata oluştu.' },
      { status: 500 }
    );
  }
} 