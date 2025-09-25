# 🚀 Blueprint деплой: Frontend + Backend на Render

## 📋 Архитектура

**Backend:** `sportsstats-backend.onrender.com` - API endpoints
**Frontend:** `sportsstats-frontend.onrender.com` - Next.js приложение

## ⚡ 1-Click Deploy

### Шаг 1: Backend API
1. **https://render.com** → **New Web Service**
2. **Connect GitHub** → `mainlego/SPORTSTATISTICS`
3. **Service Name:** `sportsstats-backend`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm start`
6. Render найдет `render.yaml` и настроит автоматически!

### Шаг 2: Frontend App
1. **New Web Service** (второй сервис)
2. **Connect GitHub** → `mainlego/SPORTSTATISTICS` (тот же репо)
3. **Service Name:** `sportsstats-frontend`
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm start`
6. Render настроит из blueprint автоматически!

## 🔧 Автоматические настройки

### ✅ Backend Environment Variables:
```env
NODE_ENV=production
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAldoeFJwpEyiu_jistR3Aci9NtMq0QKis
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sportstatisti-7e594.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sportstatisti-7e594
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sportstatisti-7e594.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=948736641097
NEXT_PUBLIC_FIREBASE_APP_ID=1:948736641097:web:e382832db26708ce029798
NOWPAYMENTS_API_KEY=DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ
NOWPAYMENTS_IPN_SECRET=HXDdgWaiedT5VJmxWLaoy/O7wl+YcEuv
JWT_SECRET=sportsStatsAPI2024SecureJWTKeyForProductionUse32Plus
NEXT_PUBLIC_API_URL=https://sportsstats-backend.onrender.com
```

### ✅ Frontend Environment Variables:
```env
NODE_ENV=production
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAldoeFJwpEyiu_jistR3Aci9NtMq0QKis
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sportstatisti-7e594.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sportstatisti-7e594
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sportstatisti-7e594.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=948736641097
NEXT_PUBLIC_FIREBASE_APP_ID=1:948736641097:web:e382832db26708ce029798
NEXT_PUBLIC_API_URL=https://sportsstats-backend.onrender.com
NOWPAYMENTS_API_KEY=DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ
NOWPAYMENTS_IPN_SECRET=HXDdgWaiedT5VJmxWLaoy/O7wl+YcEuv
JWT_SECRET=sportsStatsAPI2024SecureJWTKeyForProductionUse32Plus
```

## 🌐 URLs после деплоя

- **API Backend:** https://sportsstats-backend.onrender.com/api/v1/sports
- **Frontend App:** https://sportsstats-frontend.onrender.com
- **Health Checks:**
  - Backend: https://sportsstats-backend.onrender.com/api/health
  - Frontend: https://sportsstats-frontend.onrender.com/

## 🔧 Финальные настройки

### 1. Firebase Authorized Domains
Firebase Console → Authentication → Settings → Authorized domains:
```
sportsstats-frontend.onrender.com
sportsstats-backend.onrender.com
```

### 2. NOWPayments Webhook
NOWPayments Dashboard → IPN Settings:
```
Callback URL: https://sportsstats-backend.onrender.com/api/payment/webhook
```

### 3. CORS настройки
Уже настроены в blueprint:
```yaml
headers:
  - path: /api/*
    headers:
      Access-Control-Allow-Origin: "*"
      Access-Control-Allow-Methods: "GET, POST, PUT, DELETE, OPTIONS"
      Access-Control-Allow-Headers: "Content-Type, Authorization, X-API-Key"
```

## ✅ Тестирование

### Backend API endpoints:
- `GET https://sportsstats-backend.onrender.com/api/v1/sports`
- `GET https://sportsstats-backend.onrender.com/api/health`
- `POST https://sportsstats-backend.onrender.com/api/payment/create`

### Frontend pages:
- **Главная:** https://sportsstats-frontend.onrender.com
- **Логин:** https://sportsstats-frontend.onrender.com/login
- **Dashboard:** https://sportsstats-frontend.onrender.com/dashboard
- **Docs:** https://sportsstats-frontend.onrender.com/docs

## 💰 Стоимость

- **2 сервиса** × **Starter Plan** ($7/месяц каждый)
- **Итого:** $14/месяц для продакшена
- **Free tier:** 750 часов/месяц на каждый сервис

## 🚀 Преимущества разделения

- ✅ **Масштабируемость:** Независимое масштабирование API и фронтенда
- ✅ **Производительность:** Специализированная оптимизация каждого сервиса
- ✅ **Надежность:** Сбой одного сервиса не влияет на другой
- ✅ **CORS:** Правильная настройка cross-origin запросов
- ✅ **Кэширование:** Отдельная стратегия кэширования для API и статики

## ⚡ Время деплоя

- **Backend:** ~5-8 минут
- **Frontend:** ~5-8 минут
- **Общее время:** ~10-15 минут

**Blueprint автоматически настроит все переменные окружения!**