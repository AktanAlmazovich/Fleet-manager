# FleetPro — Система управления автопарком

![FleetPro](https://img.shields.io/badge/FleetPro-v1.0-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57)

> Современная система управления автопарком для транспортных компаний Кыргызстана

## 📋 Описание проекта

**FleetPro** — это веб-приложение для управления автопарком, которое позволяет:
- Отслеживать статус и местоположение транспортных средств
- Управлять водителями и их назначениями
- Анализировать финансовые показатели
- Планировать техническое обслуживание

## 🛠️ Технологический стек

### Frontend
| Технология | Назначение |
|------------|------------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Стилизация |
| Framer Motion | Анимации |
| Recharts | Графики и диаграммы |
| Leaflet | Интерактивные карты |
| Sonner | Toast-уведомления |

### Backend
| Технология | Назначение |
|------------|------------|
| Node.js | Runtime |
| Express.js | Web Framework |
| SQLite3 | База данных |
| CORS | Cross-Origin Resource Sharing |

## 🏗️ Архитектура

```
┌─────────────────┐     HTTP/REST API     ┌─────────────────┐
│                 │ ◄──────────────────── │                 │
│   React Client  │                       │  Express Server │
│   (Port 5173)   │ ────────────────────► │   (Port 3000)   │
│                 │                       │                 │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                                   ▼
                                          ┌─────────────────┐
                                          │     SQLite      │
                                          │    Database     │
                                          │   (fleet.db)    │
                                          └─────────────────┘
```

## 📁 Структура проекта

```
fleet_manager/
├── server/                    # Backend
│   ├── server.js              # Express сервер + API endpoints
│   ├── setupDb.js             # Инициализация БД
│   ├── fleet.db               # SQLite база данных
│   └── package.json
│
├── client_new/                # Frontend
│   ├── src/
│   │   ├── App.jsx            # Главный компонент
│   │   ├── VehicleCard.jsx    # Карточка транспорта
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── FinancePage.jsx
│   │   │   ├── DriversPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── NotificationCenter.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── context/
│   │       ├── AuthContext.jsx
│   │       ├── ThemeContext.jsx
│   │       └── NotificationContext.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── docs/                      # Документация
    └── TECHNICAL_SPEC.md      # Техническое задание
```

## 🚀 Установка и запуск

### Требования
- Node.js 18+
- npm 9+

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/username/fleet-manager.git
cd fleet-manager

# Установить зависимости backend
cd server
npm install

# Инициализировать базу данных
node setupDb.js

# Установить зависимости frontend
cd ../client_new
npm install
```

### Запуск

**Терминал 1 — Backend:**
```bash
cd server
node server.js
# Server running at http://localhost:3000
```

**Терминал 2 — Frontend:**
```bash
cd client_new
npm run dev
# http://localhost:5173
```

## 🔐 Демо-доступ

| Роль | Логин | Пароль |
|------|-------|--------|
| Администратор | admin | admin123 |
| Водитель | driver1 | driver123 |

## 📡 API Endpoints

### Аутентификация
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Транспортные средства
```http
GET /api/vehicles              # Получить все ТС
POST /api/vehicles/:id/status  # Обновить статус ТС
```

### Водители
```http
GET /api/drivers               # Получить всех водителей
GET /api/drivers/:id           # Получить водителя с рейсами
```

### Рейсы
```http
GET /api/trips                 # Все рейсы
GET /api/trips/driver/:id      # Рейсы водителя
```

## 🗄️ Схема базы данных

### Таблицы

**users** — Пользователи системы
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER | Primary Key |
| username | TEXT | Логин |
| password | TEXT | Пароль |
| role | TEXT | admin / driver |
| driverId | INTEGER | FK → drivers |

**vehicles** — Транспортные средства
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER | Primary Key |
| name | TEXT | Название |
| plate | TEXT | Гос. номер |
| status | TEXT | available/busy/maintenance |
| driver | TEXT | Имя водителя |
| latitude | REAL | Широта |
| longitude | REAL | Долгота |
| mileage | INTEGER | Пробег (км) |

**drivers** — Водители
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER | Primary Key |
| name | TEXT | ФИО |
| phone | TEXT | Телефон |
| rating | REAL | Рейтинг (0-5) |
| totalTrips | INTEGER | Количество рейсов |
| totalEarnings | REAL | Заработок (сом) |

**trips** — Рейсы
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER | Primary Key |
| vehicleId | INTEGER | FK → vehicles |
| driverId | INTEGER | FK → drivers |
| startDate | TEXT | Начало |
| endDate | TEXT | Конец |
| earnings | REAL | Заработок |

## ✨ Функциональность

### Для администратора
- ✅ Просмотр всех ТС на карте
- ✅ Назначение/завершение рейсов
- ✅ Отправка на техобслуживание
- ✅ Управление водителями
- ✅ Финансовая аналитика
- ✅ Центр уведомлений
- ✅ Dark/Light режим

### Для водителя
- ✅ Личный кабинет
- ✅ История рейсов
- ✅ Статистика заработка

