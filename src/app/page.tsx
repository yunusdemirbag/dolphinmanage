import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Dolphin Manage</h1>
        <p className="mb-8 text-lg text-gray-400">
          İşlerinizi kolayca yönetin.
        </p>
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors"
        >
          Giriş Yap
        </Link>
      </div>
    </main>
  );
} 