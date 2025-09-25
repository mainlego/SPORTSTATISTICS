# ⚡ Быстрый деплой на Render.com

## 🚀 1-Click Deploy

Все переменные уже настроены в `render.yaml`!

### Шаг 1: Деплой
1. Идите на https://render.com/
2. **New** → **Web Service**
3. **Connect GitHub** → выберите `mainlego/SPORTSTATISTICS`
4. Render автоматически найдет `render.yaml` и настроит всё!
5. Нажмите **Create Web Service**

### Шаг 2: Получите URL
После деплоя (~5 минут) получите URL типа:
`https://sportsstats-api-xyz.onrender.com`

### Шаг 3: Обновите API URL
В Render Dashboard → Environment Variables:
- Найдите `NEXT_PUBLIC_API_URL`
- Установите: `https://your-actual-url.onrender.com`
- **Save Changes**

### Шаг 4: Настройте Firebase домены
Firebase Console → Authentication → Settings → Authorized domains:
- Добавьте: `your-actual-url.onrender.com`

### Шаг 5: NOWPayments webhook
NOWPayments Dashboard → IPN Settings:
- Callback URL: `https://your-actual-url.onrender.com/api/payment/webhook`

## ✅ Готово!

Тестируйте:
- **Главная:** https://your-url.onrender.com
- **API:** https://your-url.onrender.com/api/v1/sports
- **Health:** https://your-url.onrender.com/api/health

---

## 📝 Переменные (уже настроены автоматически):

✅ Firebase Auth - настроено
✅ NOWPayments - настроено
✅ JWT Secret - настроено
❓ API URL - настройте после деплоя

**Время деплоя:** ~5-10 минут
**Стоимость:** Бесплатно (750 часов/месяц)