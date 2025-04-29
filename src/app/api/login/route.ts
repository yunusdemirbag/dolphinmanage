import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const correctEmail = process.env.DOLPHIN_EMAIL;
    const correctPassword = process.env.DOLPHIN_PASSWORD;

    if (!correctEmail || !correctPassword) {
      console.error('Environment variables DOLPHIN_EMAIL or DOLPHIN_PASSWORD are not set.');
      return NextResponse.json({ message: 'Sunucu yapılandırma hatası.' }, { status: 500 });
    }

    if (email === correctEmail && password === correctPassword) {
      return NextResponse.json({ message: 'Giriş başarılı!' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Geçersiz e-posta veya şifre.' }, { status: 401 });
    }
  } catch (error) {
    console.error('API Login error:', error);
    return NextResponse.json({ message: 'Sunucu hatası oluştu.' }, { status: 500 });
  }
} 