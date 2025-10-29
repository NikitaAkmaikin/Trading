# 🚀 Быстрый старт

## Установка
```bash
# 1. Клонируйте проект
git clone https://github.com/NikitaAkmaikin/Trading.git
cd my-next-app

# 2. Установите зависимости
npm install

# 3. Запустите проект
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

---

## 📁 Структура проекта
```
my-next-app/
├── app/
│   ├── page.jsx              # Главная страница
│   ├── layout.jsx            # Общий layout
│   ├── globals.css           # Глобальные стили
│   ├── filters/
│   │   └── page.jsx          # Страница поиска билетов
│   ├── admin/
│   │   └── page.jsx          # Админ-панель
│   └── api/
│       └── admin/
│           └── orders/
│               └── route.js  # API заказов
├── components/
│   ├── Filters.jsx           # Компонент фильтров
│   └── AdminPanel.jsx        # Компонент админки
├── data/
│   ├── mock-orders.json      # 50+ заказов
│   └── mock-tickets.json     # 20 билетов
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🎯 Основные страницы

### Главная - `/`
- Описание системы
- Ссылки на разделы
- API документация

### Поиск билетов - `/filters`
- 20 реальных билетов
- Фильтры по транспорту
- Календарь цен
- Сортировка результатов

### Админ-панель - `/admin`
- 50+ заказов
- Фильтрация по статусам
- Поиск и сортировка
- Экспорт в CSV
- Пагинация

---

## 🔌 API Endpoints
```bash
# Все заказы
GET http://localhost:3000/api/admin/orders

# Только оплаченные
GET http://localhost:3000/api/admin/orders?status=PAID

# Ожидающие оплаты
GET http://localhost:3000/api/admin/orders?status=PENDING

# Отмененные
GET http://localhost:3000/api/admin/orders?status=CANCELLED

# Данные билетов
GET http://localhost:3000/data/mock-tickets.json

# Сырые данные заказов
GET http://localhost:3000/data/mock-orders.json
```

### Пример ответа API
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": "A1B2",
      "route": "Москва - Санкт-Петербург",
      "date": "2025-10-25T14:30:00Z",
      "passenger": "Иванов И.И.",
      "amount": 4500,
      "status": "PAID"
    }
  ]
}
```

---

## 🎨 Технологии

- **Next.js 16** - React фреймворк
- **Tailwind CSS 3** - Стили
- **Lucide React** - Иконки
- **JSON** - Mock данные

---

## 📝 Зависимости
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "16.0.1",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19"
  }
}
```

---

## 🛠️ Команды
```bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка для production
npm run start    # Запуск production сервера
npm run lint     # Проверка кода
```

---

## ❗ Решение проблем

### Стили не работают
```bash
# Удалите кеш и переустановите
rmdir /s /q .next node_modules
del package-lock.json
npm install
npm run dev
```

### Ошибка порта 3000 занят
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <номер_процесса> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### API не работает

Проверьте что файлы существуют:
- `data/mock-orders.json`
- `data/mock-tickets.json`
- `app/api/admin/orders/route.js`

---

## 📊 Данные

### Заказы (`mock-orders.json`)
- 50+ записей
- Статусы: PAID, PENDING, CANCELLED
- Суммы: от 1600₽ до 12000₽

### Билеты (`mock-tickets.json`)
- 20 билетов
- Транспорт: Поезда, Самолеты, Автобусы
- Даты: 20-26 октября 2025
- Цены: от 1200₽ до 6200₽

---

## 🎯 Фичи

### Фильтры поиска
✅ Выбор типа транспорта
✅ Календарь с минимальными ценами
✅ Фильтр по наличию мест
✅ Фильтр по нижним местам (поезда)
✅ Выбор класса/типа вагона
✅ Сортировка результатов
✅ 20 реальных билетов

### Админ-панель
✅ 50+ заказов
✅ Поиск по ID, пассажиру, маршруту
✅ Фильтрация по статусам
✅ Сортировка по любому полю
✅ Пагинация (10 на страницу)
✅ Статистика и аналитика
✅ Экспорт в CSV

---

## 🚀 Готово!

Проект запущен и работает. Наслаждайтесь! 🎉# Trading
