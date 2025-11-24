import Filters from '@/components/Filters';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Search } from 'lucide-react';

export default function FiltersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-600 hover:text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-100 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Вернуться на главную</span>
          </Link>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-purple-100">
            <Search className="text-purple-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Интеллектуальный поиск билетов</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Найдите свой
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              идеальный билет
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Сравните цены, выберите удобное время и забронируйте билеты онлайн
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">20+</p>
              <p className="text-sm text-gray-600">Направлений</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">1890₽</p>
              <p className="text-sm text-gray-600">Мин. цена</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-600">24/7</p>
              <p className="text-sm text-gray-600">Поддержка</p>
            </div>
          </div>
        </div>

        {/* Filters Component */}
        <Filters />
      </div>
    </div>
  );
}