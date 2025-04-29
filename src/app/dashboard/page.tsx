'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      {/* Üst Bar (Header) */}
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
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
        <p className="text-gray-400 mb-6">
          Burası senin yönetim panelin. Ürünlerini ve diğer ayarları buradan yöneteceksin.
        </p>

        {/* === Etsy Bağlantı Bölümü === */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-white">Etsy Entegrasyonu</h3>
          <p className="text-gray-400 mb-4 text-sm">
            Ürünlerini yönetebilmek için Etsy hesabına erişim izni vermen gerekiyor. Aşağıdaki butona tıklayarak bağlantı işlemini başlatabilirsin.
          </p>
          {/* Etsy yetkilendirme işlemini başlatacak API route'una giden Link */}
          <Link
            href="/api/auth/etsy/connect"
            className="inline-block px-5 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-colors shadow hover:shadow-lg"
            prefetch={false}
          >
            Etsy Hesabını Bağla
          </Link>
        </div>
        {/* === Etsy Bağlantı Bölümü Sonu === */}

        {/* Ürün Listesi Alanı */}
        <div className="mt-6 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-white">Ürünlerin</h3>
          <p className="text-center text-gray-500">(Bağlantı kurulduğunda ürün listesi burada gösterilecek)</p>
        </div>
      </main>

      {/* Alt Bilgi (Footer) */}
      <footer className="bg-gray-800 text-center p-4 text-xs text-gray-500 mt-auto border-t border-gray-700">
        ©{new Date().getFullYear()} Dolphin Manage.
      </footer>
    </div>
  );
} 