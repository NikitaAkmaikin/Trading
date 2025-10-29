import AdminPanel from '@/components/AdminPanel';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-purple-600 hover:text-purple-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Вернуться на главную</span>
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-purple-100">
            <Shield className="text-purple-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Защищенная зона</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Панель
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              администратора
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Полный контроль над заказами с расширенной аналитикой и мониторингом
          </p>
        </div>

        {/* Admin Panel Component */}
        <AdminPanel />
      </div>
    </div>
  );
}