'use client';
import React, { useState, useEffect } from 'react';
import { Train, Plane, Bus, Filter as FilterIcon, MapPin, Bed, Clock, Ticket, TrendingDown, ArrowRight } from 'lucide-react';

export default function Filters() {
  const [activeTransport, setActiveTransport] = useState('train');
  const [selectedDate, setSelectedDate] = useState('22');
  const [activeFilters, setActiveFilters] = useState({
    hasSeats: false,
    lowerSeats: false,
    vagonType: null
  });
  const [ticketsData, setTicketsData] = useState(null);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [loading, setLoading] = useState(true);

  // Загрузка данных из API
  useEffect(() => {
    setLoading(true);
    fetch('/api/tickets')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setTicketsData(result.data);
          filterTickets(result.data, activeTransport, selectedDate, activeFilters);
        }
      })
      .catch(err => console.error('Error loading tickets:', err))
      .finally(() => setLoading(false));
  }, []);

  // Применение фильтров
  useEffect(() => {
    if (ticketsData) {
      filterTickets(ticketsData, activeTransport, selectedDate, activeFilters);
    }
  }, [activeTransport, selectedDate, activeFilters, sortBy, ticketsData]);

  const filterTickets = (data, transport, date, filters) => {
    let tickets = data.routes.filter(ticket => {
      // Фильтр по транспорту
      if (ticket.transportType !== transport) return false;

      // Фильтр по дате
      const calendarDate = data.priceCalendar.find(d => d.date === date);
      if (calendarDate && ticket.date !== calendarDate.fullDate) return false;

      // Фильтр "Есть места"
      if (filters.hasSeats && ticket.seatsAvailable === 0) return false;

      // Фильтр "Нижние места"
      if (filters.lowerSeats && ticket.lowerSeats === 0) return false;

      // Фильтр "Тип вагона"
      if (filters.vagonType && ticket.vagonType !== filters.vagonType) return false;

      return true;
    });

    // Сортировка
    tickets.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'time':
          return a.time.localeCompare(b.time);
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });

    setFilteredTickets(tickets);
  };

  const transportTypes = [
    { id: 'train', label: 'Ж/Д', icon: Train },
    { id: 'plane', label: 'Авиа', icon: Plane },
    { id: 'bus', label: 'Автобусы', icon: Bus }
  ];

  const vagonTypes = {
    train: ['Плацкарт', 'Купе', 'СВ'],
    plane: ['Эконом', 'Бизнес'],
    bus: ['Стандарт', 'Комфорт']
  };

  const toggleFilter = (filterId) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const selectVagonType = (type) => {
    setActiveFilters(prev => ({
      ...prev,
      vagonType: prev.vagonType === type ? null : type
    }));
  };

  const getLowestPrice = () => {
    if (!ticketsData) return null;
    const date = ticketsData.priceCalendar.find(d => d.date === selectedDate);
    return date?.price;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        <p className="text-gray-600 font-medium">Загрузка билетов...</p>
      </div>
    );
  }

  if (!ticketsData) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ошибка загрузки данных</h3>
        <p className="text-gray-600 mb-6">Не удалось загрузить билеты. Попробуйте обновить страницу.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Обновить страницу
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Transport Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Тип транспорта</h3>
        <div className="grid grid-cols-3 gap-3">
          {transportTypes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTransport(id)}
              className={`
                flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium
                transition-all duration-300
                ${activeTransport === id
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-102'
                }
              `}
            >
              <Icon size={24} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Быстрые фильтры</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => toggleFilter('hasSeats')}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
              transition-all duration-300
              ${activeFilters.hasSeats
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }
            `}
          >
            <MapPin size={18} />
            <span>Есть места</span>
          </button>

          {activeTransport === 'train' && (
            <button
              onClick={() => toggleFilter('lowerSeats')}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
                transition-all duration-300
                ${activeFilters.lowerSeats
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              <Bed size={18} />
              <span>Нижние места</span>
            </button>
          )}
        </div>

        {/* Vagon Type Filter */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Тип вагона/класса:</p>
          <div className="flex flex-wrap gap-2">
            {vagonTypes[activeTransport].map(type => (
              <button
                key={type}
                onClick={() => selectVagonType(type)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeFilters.vagonType === type
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Prices */}
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Календарь цен</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {ticketsData.priceCalendar.map(({ date, day, price }) => {
            const isLowest = price === Math.min(...ticketsData.priceCalendar.map(d => d.price));
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`
                  p-4 rounded-xl text-center
                  transition-all duration-300 relative overflow-hidden
                  ${selectedDate === date
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }
                `}
              >
                {isLowest && selectedDate !== date && (
                  <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingDown size={12} />
                    MIN
                  </div>
                )}
                <div className={`text-2xl font-bold mb-1 ${selectedDate === date ? 'text-white' : 'text-gray-800'}`}>
                  {date}
                </div>
                <div className={`text-xs uppercase mb-2 ${selectedDate === date ? 'text-purple-100' : 'text-gray-500'}`}>
                  окт, {day}
                </div>
                <div className={`text-sm font-semibold ${selectedDate === date ? 'text-white' : 'text-blue-600'}`}>
                  от {formatPrice(price)} ₽
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sort and Results Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <FilterIcon size={16} className="text-blue-600" />
            <span className="font-medium">Найдено билетов:</span>
            <span className="text-blue-600 font-semibold text-lg">{filteredTickets.length}</span>
            {getLowestPrice() && (
              <span className="text-gray-600 ml-2">
                • от {formatPrice(getLowestPrice())} ₽
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="price">По цене</option>
              <option value="time">По времени</option>
              <option value="duration">По длительности</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Ticket size={64} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Билеты не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить параметры поиска или выбрать другую дату</p>
            <button
              onClick={() => {
                setActiveFilters({ hasSeats: false, lowerSeats: false, vagonType: null });
                setActiveTransport('train');
                setSelectedDate('22');
              }}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left Side - Route Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      {activeTransport === 'train' && <Train className="text-blue-600" size={24} />}
                      {activeTransport === 'plane' && <Plane className="text-blue-600" size={24} />}
                      {activeTransport === 'bus' && <Bus className="text-blue-600" size={24} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{ticket.from} → {ticket.to}</h4>
                      <p className="text-sm text-gray-500">{ticket.company}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1 flex items-center gap-1">
                        <Clock size={14} />
                        Время
                      </p>
                      <p className="font-semibold text-gray-800">{ticket.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">В пути</p>
                      <p className="font-semibold text-gray-800">{ticket.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1 flex items-center gap-1">
                        <MapPin size={14} />
                        Мест
                      </p>
                      <p className="font-semibold text-green-600">{ticket.seatsAvailable}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Класс</p>
                      <p className="font-semibold text-gray-800">{ticket.vagonType}</p>
                    </div>
                  </div>

                  {ticket.lowerSeats > 0 && (
                    <div className="mt-3 inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      <Bed size={14} />
                      Нижних мест: {ticket.lowerSeats}
                    </div>
                  )}
                </div>

                {/* Right Side - Price and Button */}
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center">
                    <p className="text-3xl font-black text-gray-800">{formatPrice(ticket.price)} ₽</p>
                    <p className="text-sm text-gray-500">за билет</p>
                  </div>
                  <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/30">
                    Выбрать
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reset Button */}
      {(activeFilters.hasSeats || activeFilters.lowerSeats || activeFilters.vagonType) && (
        <div className="text-center">
          <button
            onClick={() => {
              setActiveFilters({ hasSeats: false, lowerSeats: false, vagonType: null });
            }}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Сбросить все фильтры
          </button>
        </div>
      )}
    </div>
  );
}