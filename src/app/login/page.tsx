'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
      } else {
        setError(data.message || 'Giriş başarısız. Bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-gray-900 text-white">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400">Dolphin Manage</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-6 text-center text-gray-300">Yönetim Paneli Girişi</h2>
          {error && (
            <p className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded relative mb-4 text-sm" role="alert">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              E-posta
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-500 text-white ${error ? 'border-red-500' : 'focus:border-blue-500'}`}
              id="email"
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-500 text-white ${error ? 'border-red-500' : 'focus:border-blue-500'}`}
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          ©{new Date().getFullYear()} Dolphin Manage. Tüm hakları saklıdır.
        </p>
        <p className="mt-4 text-center text-sm text-gray-400">
          Hesabınız yok mu?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-400">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </main>
  );
} 