# 🚀 DexSafe Wallet Pro

Экологичный DeFi кошелек на базе X1 EcoChain с интеллектуальной маршрутизацией (UPA Engine) и поддержкой токенизированных активов (ЦФА).

## ✨ Основные возможности

- 💚 **X1 EcoChain First** - приоритет самой экологичной сети
- 🤖 **UPA Engine** - автоматический выбор оптимального маршрута
- 📈 **Токенизированные активы** - торговля акциями через DEX
- 🏦 **DeFi Кредитование** - займы под залог криптовалюты
- 🔐 **100% Некастодиальность** - полный контроль над ключами
- 🎮 **Геймификация** - миссии, спины, рефералы

## 🛠 Технологический стек

- **Frontend**: React 19, TypeScript 5, Vite 5
- **Styling**: Tailwind CSS 3.4.0
- **State**: Zustand, React Query
- **Web3**: Ethers.js v6, Wagmi
- **Blockchain**: X1 EcoChain, Ethereum, BSC, Polygon, Arbitrum
- **UI/UX**: Framer Motion, Lucide React

## 📦 Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-org/dexsafe-wallet-pro.git
cd dexsafe-wallet-pro

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env

# Запустить dev сервер
npm run dev
```

## 🔧 Конфигурация

Создайте `.env` файл:

```bash
VITE_INFURA_KEY=your_infura_key
VITE_UPA_ENGINE_URL=https://upa-engine.dexsafe.io
VITE_X1_RPC_URL=https://rpc.x1-ecochain.network
```

## 📱 Telegram Mini App

1. Создайте бота через @BotFather
2. Получите токен
3. Настройте Menu Button:
   ```
   /setmenubutton
   URL: https://your-app.vercel.app
   Button text: Открыть кошелек
   ```

## 🚀 Deployment

```bash
# Build
npm run build

# Deploy на Vercel
vercel --prod
```

## 🧪 Тестирование

```bash
# Запустить тесты
npm test

# Coverage
npm run test:coverage
```

## 📄 Лицензия

MIT

## 🤝 Контакты

- Website: https://dexsafe.io
- Telegram: @dexsafe_support
- Email: support@dexsafe.io