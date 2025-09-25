# SPORTSTATISTICS

Премиум сервис API для спортивной статистики с поддержкой 10+ видов спорта и криптовалютными платежами.

## Возможности

- ✅ **10+ видов спорта**: Футбол, баскетбол, теннис, бейсбол, хоккей, крикет, регби, гольф, бокс, MMA
- ✅ **Реальное время**: Живые матчи и статистика
- ✅ **Исторические данные**: Полная история матчей и статистик
- ✅ **Аутентификация Firebase**: Безопасная регистрация через Google
- ✅ **Криптовалютные платежи**: Интеграция с NOWPayments (USDT)
- ✅ **API ключи**: Безопасное управление доступом к API
- ✅ **Премиум подписка**: $2,400 USDT в год

## Технологический стек

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Аутентификация**: Firebase Authentication
- **База данных**: Firebase Firestore
- **Платежи**: NOWPayments API
- **Хостинг**: Firebase Hosting

## Быстрый старт

### 1. Клонирование и установка

\`\`\`bash
git clone https://github.com/yourusername/sportsstats.git
cd sportsstats
npm install
\`\`\`

### 2. Настройка переменных окружения

Скопируйте \`.env.local\` и заполните необходимые значения:

\`\`\`env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# NOWPayments
NOWPAYMENTS_API_KEY=your_nowpayments_api_key
NOWPAYMENTS_IPN_SECRET=your_ipn_secret

# JWT Secret
JWT_SECRET=your_jwt_secret_key
\`\`\`

### 3. Запуск проекта

\`\`\`bash
npm run dev
\`\`\`

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура API

### Базовый URL
\`\`\`
https://your-domain.com/api/v1
\`\`\`

### Аутентификация
Все API запросы требуют API ключ в заголовке:

\`\`\`bash
X-API-Key: your_api_key
# или
Authorization: Bearer your_api_key
\`\`\`

### Основные endpoints

- \`GET /api/v1/sports\` - Список всех видов спорта
- \`GET /api/v1/sports/{sport}/matches\` - Матчи по виду спорта
- \`GET /api/v1/sports/{sport}/matches/{matchId}\` - Детальная информация о матче

## 🚀 Развертывание

### Render.com (Рекомендуется)

Простой и быстрый деплой:

1. **Создайте Firebase проект** для Authentication
2. **Подключите GitHub** на render.com
3. **Деплой из репозитория** `mainlego/SPORTSTATISTICS`
4. **Настройте переменные** окружения

📖 **Подробная инструкция:** [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

### Firebase App Hosting (Альтернатива)

\`\`\`bash
npm install -g firebase-tools
firebase login
firebase init apphosting
firebase deploy --only apphosting
\`\`\`

📖 **Подробная инструкция:** [DEPLOYMENT.md](DEPLOYMENT.md)

## Настройка платежей NOWPayments

1. Зарегистрируйтесь на [NOWPayments](https://nowpayments.io)
2. Получите API ключ и IPN Secret
3. Добавьте их в \`.env.local\`
4. Настройте webhook URL: \`https://your-domain.com/api/payment/webhook\`

## Поддерживаемые виды спорта

- 🏈 **Футбол** (NFL, NCAA, CFL)
- 🏀 **Баскетбол** (NBA, WNBA, EuroLeague)
- 🎾 **Теннис** (ATP, WTA, ITF)
- ⚾ **Бейсбол** (MLB, AAA, AA)
- 🏒 **Хоккей** (NHL, KHL, AHL)
- 🏏 **Крикет** (ICC, IPL, BBL)
- 🏉 **Регби** (World Rugby, NRL, Super Rugby)
- ⛳ **Гольф** (PGA Tour, European Tour, LPGA)
- 🥊 **Бокс** (WBC, WBA, IBF, WBO)
- 🥋 **MMA** (UFC, Bellator, ONE FC)

## Лицензия

MIT

## Поддержка

Для получения поддержки обратитесь к [документации](https://your-domain.com/docs) или создайте issue в репозитории.