'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Code, Database, Lock } from 'lucide-react';

export default function Home() {
  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/admin/orders',
      description: 'Получить все заказы',
      color: 'green',
      params: null,
      response: 'Массив всех заказов (50+ записей)'
    },
    {
      method: 'GET',
      path: '/api/admin/orders?status=PAID',
      description: 'Только оплаченные заказы',
      color: 'blue',
      params: 'status=PAID',
      response: 'Отфильтрованный массив заказов'
    },
    {
      method: 'GET',
      path: '/api/admin/orders?status=PENDING',
      description: 'Заказы в ожидании оплаты',
      color: 'yellow',
      params: 'status=PENDING',
      response: 'Отфильтрованный массив заказов'
    },
    {
      method: 'GET',
      path: '/api/admin/orders?status=CANCELLED',
      description: 'Отмененные заказы',
      color: 'red',
      params: 'status=CANCELLED',
      response: 'Отфильтрованный массив заказов'
    },
    {
      method: 'GET',
      path: '/data/mock-tickets.json',
      description: 'Данные для поиска билетов',
      color: 'purple',
      params: null,
      response: '20 билетов + календарь цен'
    },
    {
      method: 'GET',
      path: '/data/mock-orders.json',
      description: 'Сырые данные заказов',
      color: 'indigo',
      params: null,
      response: 'JSON с 50+ заказами'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Мгновенный поиск',
      description: 'Находите лучшие предложения за секунды с умными алгоритмами',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Защита данных и безопасные платежи на высшем уровне',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Sparkles,
      title: 'Лучшие цены',
      description: 'Сравниваем тысячи предложений для выгодных сделок',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      hover: 'hover:border-green-400',
      badge: 'bg-green-500',
      text: 'text-green-700'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      hover: 'hover:border-blue-400',
      badge: 'bg-blue-500',
      text: 'text-blue-700'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      hover: 'hover:border-yellow-400',
      badge: 'bg-yellow-500',
      text: 'text-yellow-700'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      hover: 'hover:border-red-400',
      badge: 'bg-red-500',
      text: 'text-red-700'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      hover: 'hover:border-purple-400',
      badge: 'bg-purple-500',
      text: 'text-purple-700'
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-300',
      hover: 'hover:border-indigo-400',
      badge: 'bg-indigo-500',
      text: 'text-indigo-700'
    }
  };

  const handleOpenEndpoint = (path) => {
    if (path.startsWith('/api') || path.startsWith('/data')) {
      window.open(path, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen p-6">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6 border border-purple-100">
              <Sparkles className="text-purple-600" size={20} />
              <span className="text-sm font-semibold text-gray-700">Современная система бронирования</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Путешествуй
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                с комфортом
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Инновационная платформа для бронирования транспорта с умными фильтрами и мгновенным поиском
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-300">
                <div className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Main Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Filters Card */}
            <Link href="/filters">
              <div className="group relative bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                
                <div className="relative text-white">
                  <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-5xl">🎫</span>
                  </div>
                  
                  <h2 className="text-3xl font-black mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    Фильтры поиска
                  </h2>
                  
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    Умная система фильтрации с выбором транспорта, календарем цен и быстрыми настройками для идеального путешествия
                  </p>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                    <p className="text-sm text-white/90">✓ 20+ реальных билетов</p>
                    <p className="text-sm text-white/90">✓ Фильтры по транспорту и классу</p>
                    <p className="text-sm text-white/90">✓ Календарь с минимальными ценами</p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all duration-300">
                    <span>Открыть интерфейс</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </Link>

            {/* Admin Panel Card */}
            <Link href="/admin">
              <div className="group relative bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                
                <div className="relative text-white">
                  <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-5xl">📊</span>
                  </div>
                  
                  <h2 className="text-3xl font-black mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    Админ-панель
                  </h2>
                  
                  <p className="text-purple-100 mb-6 leading-relaxed">
                    Профессиональный реестр заказов с расширенной аналитикой, фильтрацией по статусам и детальной статистикой
                  </p>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
                    <p className="text-sm text-white/90">✓ 50+ заказов с данными</p>
                    <p className="text-sm text-white/90">✓ Фильтры и сортировка</p>
                    <p className="text-sm text-white/90">✓ Экспорт в CSV</p>
                  </div>
                  
                  <div className="flex items-center gap-3 text-white font-bold group-hover:gap-5 transition-all duration-300">
                    <span>Перейти в панель</span>
                    <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </Link>
          </div>

          {/* API Documentation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">API Документация</h3>
                <p className="text-sm text-gray-600">Доступные эндпоинты для разработчиков</p>
              </div>
            </div>

            {/* API Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <Database className="text-blue-600 mb-2" size={24} />
                <p className="text-2xl font-bold text-blue-700">6</p>
                <p className="text-xs text-blue-600">Эндпоинтов</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <Zap className="text-green-600 mb-2" size={24} />
                <p className="text-2xl font-bold text-green-700">REST</p>
                <p className="text-xs text-green-600">API Архитектура</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <Lock className="text-purple-600 mb-2" size={24} />
                <p className="text-2xl font-bold text-purple-700">JSON</p>
                <p className="text-xs text-purple-600">Формат данных</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
                <Shield className="text-pink-600 mb-2" size={24} />
                <p className="text-2xl font-bold text-pink-700">50+</p>
                <p className="text-xs text-pink-600">Записей</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => {
                const colors = colorClasses[endpoint.color];
                return (
                  <div
                    key={index}
                    className={`${colors.bg} rounded-xl p-4 border-2 ${colors.border} ${colors.hover} transition-all duration-300 group hover:shadow-md`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`${colors.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                            {endpoint.method}
                          </span>
                          <code className={`text-sm font-mono ${colors.text} font-semibold break-all`}>
                            {endpoint.path}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{endpoint.description}</p>
                        {endpoint.params && (
                          <p className="text-xs text-gray-500">
                            <span className="font-semibold">Параметры:</span> {endpoint.params}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          <span className="font-semibold">Ответ:</span> {endpoint.response}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenEndpoint(endpoint.path)}
                        className={`flex items-center gap-2 ${colors.badge} text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap`}
                      >
                        Открыть
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* API Example */}
            <div className="mt-6 bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <p className="text-green-400 text-sm font-mono mb-3">// Пример использования API</p>
              <code className="text-gray-300 text-sm font-mono block whitespace-pre">
{`fetch('/api/admin/orders?status=PAID')
  .then(res => res.json())
  .then(data => {
    console.log('Успех:', data);
    // { success: true, count: 25, data: [...] }
  });`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}