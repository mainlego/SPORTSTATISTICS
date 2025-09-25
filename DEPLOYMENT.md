# 🚀 Деплой на Firebase App Hosting

## Пошаговая инструкция

### 1. Создание Firebase проекта

1. Перейдите в [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Create a project"
3. Введите имя проекта: `sportsstats-api`
4. Включите Google Analytics (опционально)
5. Создайте проект

### 2. Настройка Authentication

1. В консоли Firebase перейдите в **Authentication**
2. Нажмите **Get started**
3. Перейдите на вкладку **Sign-in method**
4. Включите **Email/Password** и **Google**
5. Добавьте домен вашего приложения в **Authorized domains**

### 3. Настройка Firestore Database

1. Перейдите в **Firestore Database**
2. Нажмите **Create database**
3. Выберите **Start in production mode**
4. Выберите регион (рекомендуется ближайший к вашим пользователям)

### 4. Получение конфигурации Firebase

1. Перейдите в **Project Settings** (шестеренка)
2. Прокрутите вниз до **Your apps**
3. Нажмите **Add app** → **Web app**
4. Введите имя: `SportsStats API`
5. Включите **Firebase Hosting**
6. Скопируйте конфигурацию

### 5. Firebase App Hosting деплой

1. **Установите Firebase CLI:**
   \`\`\`bash
   npm install -g firebase-tools
   \`\`\`

2. **Войдите в аккаунт:**
   \`\`\`bash
   firebase login
   \`\`\`

3. **Инициализация проекта:**
   \`\`\`bash
   firebase init apphosting
   \`\`\`
   - Выберите существующий проект \`sportsstats-api\`
   - Выберите GitHub репозиторий: \`mainlego/SPORTSTATISTICS\`
   - Выберите ветку: \`main\`

4. **Настройка секретов:**
   \`\`\`bash
   # JWT Secret
   firebase apphosting:secrets:set jwt_secret_key
   # Введите: любая строка длиной 32+ символов

   # NOWPayments IPN Secret
   firebase apphosting:secrets:set nowpayments_ipn_secret
   # Введите: ваш IPN secret от NOWPayments
   \`\`\`

5. **Деплой:**
   \`\`\`bash
   firebase deploy --only apphosting
   \`\`\`

### 6. Настройка переменных окружения в Firebase Console

1. Перейдите в **App Hosting** в консоли Firebase
2. Выберите ваше приложение
3. Перейдите в **Environment variables**
4. Добавьте переменные из вашей Firebase конфигурации:
   - \`NEXT_PUBLIC_FIREBASE_API_KEY\`
   - \`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\`
   - \`NEXT_PUBLIC_FIREBASE_PROJECT_ID\`
   - \`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\`
   - \`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\`
   - \`NEXT_PUBLIC_FIREBASE_APP_ID\`

### 7. NOWPayments Webhook настройка

1. В личном кабинете NOWPayments
2. Перейдите в **IPN Settings**
3. Установите Callback URL: \`https://your-app-url.web.app/api/payment/webhook\`
4. Сохраните IPN Secret Key

### 8. Финальная проверка

После деплоя:
1. Откройте ваше приложение по URL из Firebase Console
2. Протестируйте регистрацию через Google
3. Попробуйте создать API ключ
4. Проверьте API endpoints: \`/api/v1/sports\`

## Автоматические деплои

Firebase App Hosting автоматически деплоит изменения при push в ветку \`main\`. Настройка CI/CD включена по умолчанию.

## Мониторинг

- **Логи:** Firebase Console → App Hosting → Logs
- **Метрики:** Firebase Console → App Hosting → Monitoring
- **Errors:** Firebase Console → Crashlytics

## Troubleshooting

### Проблемы с сборкой
- Проверьте Node.js версию в \`apphosting.yaml\`
- Убедитесь что все зависимости установлены

### Проблемы с переменными окружения
- Проверьте что все секреты созданы
- Убедитесь что переменные правильно названы

### Проблемы с Firebase Auth
- Проверьте домены в Authorized domains
- Убедитесь что правильно настроены провайдеры