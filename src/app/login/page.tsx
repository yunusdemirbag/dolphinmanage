import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Giriş Yap</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
          >
            Giriş Yap
          </button>
        </form>
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