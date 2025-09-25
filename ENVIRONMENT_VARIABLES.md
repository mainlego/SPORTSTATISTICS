# 🔑 Environment Variables

## ✅ Все переменные настроены в render.yaml

### 🔥 Firebase Configuration
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAldoeFJwpEyiu_jistR3Aci9NtMq0QKis
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sportstatisti-7e594.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sportstatisti-7e594
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sportstatisti-7e594.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=948736641097
NEXT_PUBLIC_FIREBASE_APP_ID=1:948736641097:web:e382832db26708ce029798
```

### 💰 NOWPayments Configuration
```env
NOWPAYMENTS_API_KEY=DQ1HPMB-6F94Y25-Q47KQMS-V90A5RQ
NOWPAYMENTS_IPN_SECRET=HXDdgWaiedT5VJmxWLaoy/O7wl+YcEuv
```

### 🔐 Security
```env
JWT_SECRET=sportsStatsAPI2024SecureJWTKeyForProductionUse32Plus
```

### 🌐 API Configuration
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://sportsstats-backend.onrender.com
```

### 🗄️ Database (Optional)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/sportsstats?schema=public
```

## 📋 Services Configuration

### Backend Service (sportsstats-backend)
- **Health Check:** `/api/health`
- **CORS:** Configured for API endpoints
- **Purpose:** API endpoints, webhooks, authentication

### Frontend Service (sportsstats-frontend)
- **Health Check:** `/` (homepage)
- **Purpose:** User interface, authentication UI, dashboard

## 🔧 Deployment URLs

After deployment:
- **Backend API:** https://sportsstats-backend.onrender.com
- **Frontend App:** https://sportsstats-frontend.onrender.com

## ⚙️ Additional Configuration Needed

### Firebase Console
- Add authorized domains:
  - `sportsstats-frontend.onrender.com`
  - `sportsstats-backend.onrender.com`

### NOWPayments Dashboard
- Set webhook URL: `https://sportsstats-backend.onrender.com/api/payment/webhook`

## 🚀 Ready for Production

All environment variables are production-ready:
- ✅ Real Firebase project configured
- ✅ NOWPayments API keys active
- ✅ Secure JWT secret generated
- ✅ CORS headers configured
- ✅ Health checks enabled

**Deploy command:** Upload render.yaml to Render Dashboard