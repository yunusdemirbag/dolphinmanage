'use client';

import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Üst Bar (Header) */}
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-400">Dolphin Manage - Yönetim Paneli</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white text-sm font-medium transition-colors"
        >
          Çıkış Yap
        </button>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Hoş Geldin!</h2>
        <p className="text-gray-400">
          Burası senin yönetim panelin. Ürünlerini ve diğer ayarları buradan yöneteceksin.
        </p>
        {/* Buraya Etsy ürün listesi vb. gelecek */}
        <div className="mt-6 p-6 bg-gray-800 rounded-lg">
          <p className="text-center text-gray-500">(Ürün Listesi Burada Gösterilecek)</p>
        </div>
      </main>

      {/* Alt Bilgi (Footer) */}
      <footer className="bg-gray-800 text-center p-4 text-xs text-gray-500 mt-auto">
        ©{new Date().getFullYear()} Dolphin Manage.
      </footer>
    </div>
  );
} 