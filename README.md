# FleetPro — Система управления автопарком

---

## 1. Общая информация

**Название проекта:** FleetPro  
**Тип проекта:** Веб-приложение (SPA)  
**Цель проекта:** Создание системы управления автопарком для транспортных компаний Кыргызстана

**Целевая аудитория:**
- Менеджеры транспортных компаний
- Владельцы таксопарков
- Логистические компании
- Службы доставки

---

## 2. Цели и задачи проекта

### 2.1 Цель
Обеспечить удобный и современный сервис для учёта транспортных средств, управления водителями и мониторинга финансовых показателей.

### 2.2 Задачи
- ✅ Реализовать регистрацию и авторизацию пользователей
- ✅ Реализовать учёт транспортных средств
- ✅ Реализовать управление водителями
- ✅ Реализовать карту с геолокацией ТС
- ✅ Реализовать финансовую аналитику
- ✅ Реализовать систему уведомлений

---

## 3. Функциональные требования

### 3.1 Авторизация и регистрация
- Авторизация пользователя по логину/паролю
- Разделение ролей: Администратор / Водитель
- Выход из системы
- Сохранение сессии в localStorage

### 3.2 Работа с автопарком
- Просмотр списка транспортных средств
- Фильтрация по статусам (свободно, в рейсе, на ТО)
- Просмотр карточки ТС с пробегом и здоровьем
- Изменение статуса ТС

### 3.3 Управление рейсами
- Назначение водителя на рейс
- Завершение рейса
- Отправка ТС на техобслуживание
- История рейсов

### 3.4 Управление водителями
- Список водителей с рейтингом
- Детальная статистика водителя
- Диаграмма навыков (radar chart)
- История заработка

### 3.5 Карта
- Интерактивная карта Бишкека
- Маркеры ТС с цветовой индикацией
- Popup с информацией о ТС

### 3.6 Финансовая аналитика
- Сводка: доходы, расходы, прибыль
- Диаграмма распределения статусов
- График расходов на топливо
- Таблица транзакций

---

## 4. Нефункциональные требования

- Время загрузки страницы: не более 3 секунд
- Адаптивность под desktop устройства
- Кроссбраузерность (Chrome, Firefox, Edge)
- Простота и понятность интерфейса
- Поддержка Dark/Light режима

---

## 5. Требования к интерфейсу

- Современный минималистичный дизайн
- Glassmorphism эффекты
- Анимации переходов (Framer Motion)
- Skeleton loading при загрузке
- Понятная боковая навигация
- Отзывчивый UI (hover, loading состояния)

---

## 6. Архитектура проекта

### 6.1 Общая архитектура

```
Пользователь
     ↓
Web-интерфейс (React + Vite)
     ↓
Бизнес-логика (Context API)
     ↓
REST API (Express.js)
     ↓
База данных (SQLite)
```

### 6.2 Схема взаимодействия компонентов

```
┌─────────────────────────────────────────────────────────────┐
│                     КЛИЕНТ (React)                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ AuthContext │  │ ThemeContext │  │NotificationContext│  │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│                                                              │
│  ┌────────┐ ┌──────────┐ ┌─────────┐ ┌────────┐ ┌────────┐ │
│  │Sidebar │ │VehicleCard│ │ MapView │ │Finance │ │Drivers │ │
│  └────────┘ └──────────┘ └─────────┘ └────────┘ └────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    СЕРВЕР (Express)                         │
├─────────────────────────────────────────────────────────────┤
│  /api/auth/login    │ /api/vehicles │ /api/drivers │ /api/trips │
└─────────────────────────┬───────────────────────────────────┘
                          │ SQL
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   БАЗА ДАННЫХ (SQLite)                      │
├─────────────────────────────────────────────────────────────┤
│   users   │   vehicles   │   drivers   │   trips   │  logs  │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Клиентская часть
- React 18
- JavaScript (ES6+)
- Tailwind CSS
- Framer Motion
- Recharts
- Leaflet

### 6.4 Серверная часть
- Node.js
- Express.js
- SQLite3
- CORS

---

## 7. UML-диаграммы

### 7.1 UML Use Case Diagram (Диаграмма вариантов использования)

**Акторы:**
- Администратор
- Водитель

**Варианты использования:**

```
        Администратор                          Водитель
             |                                     |
   ┌─────────┴─────────┐                    ┌─────┴─────┐
   |         |         |                    |           |
Авторизация  |    ┌────┴────┐          Авторизация  Личный
             |    |         |                       кабинет
      ┌──────┴────┴──┐      |
      |      |       |      |
   Каталог  Карта  Финансы  |
      |                     |
      ├── Назначить рейс    |
      ├── Завершить рейс    |
      ├── Отправить на ТО   |
      └── Управлять водителями
```

### 7.2 UML Class Diagram (Диаграмма классов)

```
+----------------+       +-------------------+       +----------------+
|     User       |       |     Vehicle       |       |    Driver      |
+----------------+       +-------------------+       +----------------+
| id             |       | id                |       | id             |
| username       |       | name              |       | name           |
| password       |       | plate             |       | phone          |
| role           |       | status            |       | email          |
| driverId (FK)  |──────>| driver            |<──────| rating         |
+----------------+       | latitude          |       | totalTrips     |
| login()        |       | longitude         |       | totalEarnings  |
| logout()       |       | mileage           |       | status         |
+----------------+       | driverId (FK)     |       +----------------+
                         +-------------------+       | getTrips()     |
                         | updateStatus()    |       +----------------+
                         +-------------------+
                                  |
                                  | 1:M
                                  ▼
                         +-------------------+
                         |      Trip         |
                         +-------------------+
                         | id                |
                         | vehicleId (FK)    |
                         | driverId (FK)     |
                         | startDate         |
                         | endDate           |
                         | earnings          |
                         | distance          |
                         +-------------------+
```

### 7.3 UML Sequence Diagram (Диаграмма последовательности: назначение рейса)

```
Администратор -> UI: клик "Назначить рейс"
UI -> Modal: открытие модального окна
Администратор -> Modal: ввод имени водителя
Modal -> API: POST /api/vehicles/:id/status
API -> Database: UPDATE vehicles SET status='busy'
Database -> API: success
API -> UI: 200 OK
UI -> Toast: "Рейс успешно открыт!"
UI -> Администратор: обновление карточки ТС
```

### 7.4 UML Component Diagram (Диаграмма компонентов)

```
┌─────────────────────────────────────────┐
│              Web Client                  │
├─────────────────────────────────────────┤
│  ├── Auth Component (LoginPage)         │
│  ├── Fleet Component (VehicleCard)      │
│  ├── Map Component (MapView)            │
│  ├── Finance Component (FinancePage)    │
│  ├── Drivers Component (DriversPage)    │
│  ├── Notification Component             │
│  └── Theme Component (ThemeToggle)      │
└─────────────────────────────────────────┘
                    |
                    ▼
┌─────────────────────────────────────────┐
│              Backend API                 │
├─────────────────────────────────────────┤
│  ├── Auth Service (/api/auth)           │
│  ├── Vehicle Service (/api/vehicles)    │
│  ├── Driver Service (/api/drivers)      │
│  └── Trip Service (/api/trips)          │
└─────────────────────────────────────────┘
                    |
                    ▼
┌─────────────────────────────────────────┐
│              Database                    │
├─────────────────────────────────────────┤
│  SQLite (fleet.db)                      │
└─────────────────────────────────────────┘
```

---

## 8. Требования к данным и ER-диаграмма

### 8.1 Описание сущностей

**Пользователь (User)**
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER (PK) | Уникальный ID |
| username | TEXT | Логин |
| password | TEXT | Пароль |
| role | TEXT | admin / driver |
| driverId | INTEGER (FK) | Связь с водителем |

**Транспортное средство (Vehicle)**
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER (PK) | Уникальный ID |
| name | TEXT | Марка и модель |
| plate | TEXT | Гос. номер |
| status | TEXT | available/busy/maintenance |
| driver | TEXT | Имя водителя |
| latitude | REAL | Широта |
| longitude | REAL | Долгота |
| mileage | INTEGER | Пробег (км) |

**Водитель (Driver)**
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER (PK) | Уникальный ID |
| name | TEXT | ФИО |
| phone | TEXT | Телефон |
| email | TEXT | Email |
| rating | REAL | Рейтинг (0-5) |
| totalTrips | INTEGER | Количество рейсов |
| totalEarnings | REAL | Заработок (сом) |

**Рейс (Trip)**
| Поле | Тип | Описание |
|------|-----|----------|
| id | INTEGER (PK) | Уникальный ID |
| vehicleId | INTEGER (FK) | ID транспорта |
| driverId | INTEGER (FK) | ID водителя |
| startDate | TEXT | Дата начала |
| endDate | TEXT | Дата конца |
| earnings | REAL | Заработок |
| distance | INTEGER | Дистанция (км) |

### 8.2 ER-диаграмма базы данных

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│    User     │         │   Vehicle    │         │   Driver    │
├─────────────┤         ├──────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)      │         │ id (PK)     │
│ username    │    ┌───>│ driverId(FK) │<────────│ name        │
│ password    │    │    │ name         │         │ phone       │
│ role        │    │    │ plate        │         │ rating      │
│ driverId(FK)│────┘    │ status       │         │ totalTrips  │
└─────────────┘         │ mileage      │         │ totalEarnings│
                        └──────┬───────┘         └──────┬──────┘
                               │                        │
                               │ 1:M                    │ 1:M
                               ▼                        ▼
                        ┌──────────────┐
                        │    Trip      │
                        ├──────────────┤
                        │ id (PK)      │
                        │ vehicleId(FK)│
                        │ driverId(FK) │
                        │ startDate    │
                        │ endDate      │
                        │ earnings     │
                        │ distance     │
                        └──────────────┘
```

**Связи:**
- Один **User** может быть связан с одним **Driver** (для роли driver)
- Один **Driver** может иметь много **Trip**
- Один **Vehicle** может иметь много **Trip**
- Один **Trip** связан с одним **Driver** и одним **Vehicle**

---

## 9. Технологический стек

| Компонент | Технология | Версия |
|-----------|------------|--------|
| Frontend Framework | React | 18.x |
| Build Tool | Vite | 7.x |
| Styling | Tailwind CSS | 3.x |
| Анимации | Framer Motion | 11.x |
| Графики | Recharts | 2.x |
| Карты | Leaflet | 1.9.x |
| Уведомления | Sonner | 1.x |
| Backend | Node.js + Express | 18.x / 4.x |
| База данных | SQLite3 | 3.x |

---

## 10. Установка и запуск

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

---

## 11. API Endpoints

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

---

## 12. Тестирование

### Запуск unit-тестов
```bash
cd server
node tests.js
```

### Результаты тестов (11 passed)
```
✅ Vehicle status should be valid enum
✅ Vehicle should have required fields
✅ Driver rating should be between 0 and 5
✅ Admin user should have admin role
✅ Driver user should have driver role
✅ Filter should return only available vehicles
✅ Filter should return only busy vehicles
✅ Statistics calculation should be correct
✅ Driver totalTrips should be non-negative
✅ Vehicle plates should match KG format
✅ Active drivers count should be correct
```

---

## 13. Демо-доступ

| Роль | Логин | Пароль |
|------|-------|--------|
| Администратор | admin | admin123 |
| Водитель | driver1 | driver123 |

---

## 14. Структура проекта

```
fleet_manager/
├── README.md                    # Документация
├── docs/
│   ├── TECHNICAL_SPEC.md        # Техническое задание
│   └── DEVELOPMENT_PLAN.md      # План развития
├── server/                      # Backend
│   ├── server.js                # Express сервер
│   ├── setupDb.js               # Инициализация БД
│   ├── tests.js                 # Unit-тесты
│   ├── fleet.db                 # SQLite база данных
│   └── package.json
└── client_new/                  # Frontend
    ├── src/
    │   ├── App.jsx              # Главный компонент
    │   ├── VehicleCard.jsx      # Карточка ТС
    │   ├── components/          # UI компоненты
    │   └── context/             # React Context
    ├── package.json
    └── tailwind.config.js
```

---

## 15. Критерии приёмки

- ✅ Все функции, описанные в ТЗ, реализованы
- ✅ Приложение запускается без ошибок
- ✅ Интерфейс соответствует требованиям
- ✅ Код структурирован и читаем
- ✅ Unit-тесты проходят успешно
- ✅ Документация полная

---
