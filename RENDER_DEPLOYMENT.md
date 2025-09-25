# 🚀 Деплой на Render.com

## 📋 Checklist переменных окружения

Перед деплоем соберите эти данные:

### 🔥 Firebase (обязательно)
Получите из Firebase Console → Project Settings → Your apps:
- `NEXT_PUBLIC_FIREBASE_API_KEY` - AIza...
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - your-project.firebaseapp.com
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - your-project-id
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - your-project.appspot.com
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - 123456789
- `NEXT_PUBLIC_FIREBASE_APP_ID` - 1:123:web:abc

### 💰 NOWPayments
- `NOWPAYMENTS_API_KEY` - DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ ✅
- `NOWPAYMENTS_IPN_SECRET` - получите из NOWPayments Dashboard

### 🔐 Security
- `JWT_SECRET` - любая случайная строка 32+ символов

### 🌐 API URL
- `NEXT_PUBLIC_API_URL` - https://your-app-name.onrender.com (получите после деплоя)

---

## 🚀 Пошаговый деплой:

### 1. Подготовьте Firebase
1. Создайте проект на https://console.firebase.google.com/
2. Включите Authentication (Email/Password + Google)
3. Создайте Firestore Database
4. Скопируйте конфигурацию из Project Settings

### 2. Деплой на Render
1. Идите на https://render.com/
2. Подключите ваш GitHub аккаунт
3. **New** → **Web Service**
4. Выберите репозиторий: `mainlego/SPORTSTATISTICS`
5. Заполните настройки:
   - **Name:** sportsstats-api
   - **Environment:** Node
   - **Region:** Oregon (или ближайший)
   - **Branch:** main
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### 3. Настройте переменные окружения
В Render Dashboard → вашего сервиса → Environment:

```env
NODE_ENV=production
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc
NOWPAYMENTS_API_KEY=DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ
NOWPAYMENTS_IPN_SECRET=your-ipn-secret
JWT_SECRET=your-random-32-plus-character-string
NEXT_PUBLIC_API_URL=https://your-app-name.onrender.com
```

### 4. Деплой и проверка
1. Нажмите **Create Web Service**
2. Дождитесь деплоя (~5-10 минут)
3. Получите URL: `https://your-app-name.onrender.com`
4. Обновите `NEXT_PUBLIC_API_URL` этим URL
5. Нажмите **Manual Deploy** для переразвертывания

### 5. Настройте NOWPayments webhook
1. В NOWPayments Dashboard → IPN Settings
2. Callback URL: `https://your-app-name.onrender.com/api/payment/webhook`
3. Сохраните

### 6. Настройте Firebase домены
1. Firebase Console → Authentication → Settings → Authorized domains
2. Добавьте: `your-app-name.onrender.com`

---

## ✅ Финальная проверка

После деплоя протестируйте:

1. **Главная страница:** https://your-app-name.onrender.com
2. **API:** https://your-app-name.onrender.com/api/v1/sports
3. **Health check:** https://your-app-name.onrender.com/api/health
4. **Регистрацию:** https://your-app-name.onrender.com/register
5. **Dashboard:** https://your-app-name.onrender.com/dashboard

---

## 🔧 Troubleshooting

### Build ошибки:
- Проверьте все переменные окружения
- Убедитесь что Node.js версия совпадает (18+)

### Firebase ошибки:
- Проверьте Authorized domains
- Убедитесь что все Firebase конфиги правильные

### API ошибки:
- Проверьте `NEXT_PUBLIC_API_URL`
- Убедитесь что все endpoints доступны

---

## 💰 Стоимость

**Render Starter Plan:**
- ✅ Бесплатно первые 750 часов/месяц
- ✅ Автоматический SSL
- ✅ Custom domains
- ✅ CI/CD из GitHub
- ⚠️ Спящий режим после 15 минут неактивности

**Для продакшена рекомендуется Starter ($7/месяц) для постоянной работы.**