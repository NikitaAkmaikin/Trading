'use client';
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, RefreshCw, Calendar, User, CreditCard, MapPin, Download, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Order, OrderSchema } from '@/types';
import { z } from 'zod';

export default function AdminPanel() {
  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const statusConfig: Record<Order['status'], { label: string; color: string; textColor: string; bgLight: string }> = {
    PAID: { label: 'Оплачен', color: 'bg-green-500', textColor: 'text-green-700', bgLight: 'bg-green-50' },
    PENDING: { label: 'Ожидание', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgLight: 'bg-yellow-50' },
    CANCELLED: { label: 'Отменен', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' }
  };

  // Data Fetching
  const { data: orders = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['orders', selectedStatus],
    queryFn: async () => {
      const url = selectedStatus
        ? `/api/admin/orders?status=${selectedStatus}`
        : '/api/admin/orders';

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'API Error');

      // Runtime validation
      return z.array(OrderSchema).parse(json.data);
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Derived State: Filtering & Sorting
  const filteredOrders = useMemo(() => {
    return orders.filter(order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.passenger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.route.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'passenger':
          comparison = a.passenger.localeCompare(b.passenger);
          break;
        case 'route':
          comparison = a.route.localeCompare(b.route);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filteredOrders, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const stats = useMemo(() => ({
    total: orders.length,
    paid: orders.filter(o => o.status === 'PAID').length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    cancelled: orders.filter(o => o.status === 'CANCELLED').length,
    totalAmount: orders.filter(o => o.status === 'PAID').reduce((sum, o) => sum + o.amount, 0),
    avgAmount: orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.amount, 0) / orders.length) : 0
  }), [orders]);

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Маршрут', 'Дата', 'Пассажир', 'Сумма', 'Статус'];
    const csv = [
      headers.join(','),
      ...sortedOrders.map(order => [
        order.id,
        `"${order.route}"`,
        formatDate(order.date),
        `"${order.passenger}"`,
        order.amount,
        statusConfig[order.status].label
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 rounded-2xl p-12 text-center border border-red-100">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h3 className="text-xl font-bold text-red-800 mb-2">Ошибка загрузки заказов</h3>
          <p className="text-red-600 mb-6">
            {error instanceof Error ? error.message : 'Произошла неизвестная ошибка'}
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
          >
            <RefreshCw size={18} />
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Реестр заказов</h1>
            <p className="text-gray-600">Управление и мониторинг всех заказов</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              disabled={isLoading || orders.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={18} />
              Экспорт CSV
            </button>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
              Обновить
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="text-sm text-blue-600 mb-1">Всего заказов</div>
            <div className="text-2xl font-bold text-blue-700">
              {isLoading ? <div className="h-8 w-16 bg-blue-200 rounded animate-pulse"></div> : stats.total}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="text-sm text-green-600 mb-1">Оплачено</div>
            <div className="text-2xl font-bold text-green-700">
              {isLoading ? <div className="h-8 w-16 bg-green-200 rounded animate-pulse"></div> : stats.paid}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
            <div className="text-sm text-yellow-600 mb-1">Ожидание</div>
            <div className="text-2xl font-bold text-yellow-700">
              {isLoading ? <div className="h-8 w-16 bg-yellow-200 rounded animate-pulse"></div> : stats.pending}
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
            <div className="text-sm text-red-600 mb-1">Отменено</div>
            <div className="text-2xl font-bold text-red-700">
              {isLoading ? <div className="h-8 w-16 bg-red-200 rounded animate-pulse"></div> : stats.cancelled}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
            <div className="text-sm text-purple-600 mb-1">Сумма оплат</div>
            <div className="text-xl font-bold text-purple-700">
              {isLoading ? <div className="h-7 w-24 bg-purple-200 rounded animate-pulse"></div> : `${stats.totalAmount.toLocaleString()} ₽`}
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
            <div className="text-sm text-indigo-600 mb-1">Средний чек</div>
            <div className="text-xl font-bold text-indigo-700">
              {isLoading ? <div className="h-7 w-24 bg-indigo-200 rounded animate-pulse"></div> : `${stats.avgAmount.toLocaleString()} ₽`}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search and Status Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск по ID, пассажиру или маршруту..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => {
                  setSelectedStatus(null);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedStatus === null
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                Все ({orders.length})
              </button>
              {Object.entries(statusConfig).map(([status, config]) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status as Order['status']);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedStatus === status
                    ? `${config.color} text-white shadow-lg`
                    : `${config.bgLight} ${config.textColor} hover:opacity-80`
                    }`}
                >
                  {config.label} ({orders.filter(o => o.status === status).length})
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600 font-medium">Сортировка:</span>
            <button
              onClick={() => handleSort('date')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${sortField === 'date' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Дата {sortField === 'date' && (sortOrder === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
            </button>
            <button
              onClick={() => handleSort('amount')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${sortField === 'amount' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Сумма {sortField === 'amount' && (sortOrder === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
            </button>
            <button
              onClick={() => handleSort('passenger')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${sortField === 'passenger' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Пассажир {sortField === 'passenger' && (sortOrder === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
            </button>
            <button
              onClick={() => handleSort('route')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${sortField === 'route' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Маршрут {sortField === 'route' && (sortOrder === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
            </button>
          </div>

          {/* Results Info */}
          <div className="text-sm text-gray-600">
            Найдено заказов: <span className="font-semibold text-gray-800">{sortedOrders.length}</span>
            {searchQuery && ` по запросу "${searchQuery}"`}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <RefreshCw className="animate-spin text-blue-500" size={32} />
            <p className="text-gray-500 font-medium">Загрузка заказов...</p>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Filter size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Заказы не найдены</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Маршрут</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Дата</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Пассажир</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Сумма</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono font-semibold text-blue-600">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                          <span className="text-gray-800">{order.route}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{formatDate(order.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-400 flex-shrink-0" />
                          <span className="text-gray-800">{order.passenger}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} className="text-gray-400 flex-shrink-0" />
                          <span className="font-semibold text-gray-800">{order.amount.toLocaleString()} ₽</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
                          ${statusConfig[order.status].bgLight}
                          ${statusConfig[order.status].textColor}
                        `}>
                          {statusConfig[order.status].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedOrders.length)} из {sortedOrders.length}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Назад
                    </button>

                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Вперед
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}