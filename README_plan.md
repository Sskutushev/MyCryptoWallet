🎯 ПОЛНЫЙ ПРОМПТ ДЛЯ СОЗДАНИЯ УНИКАЛЬНОГО КРИПТО-КОШЕЛЬКА С ГЕЙМИФИКАЦИЕЙ

📌 КОНЦЕПЦИЯ ПРОЕКТА
Название кошелька: COINPLAY (или другие варианты: PLAYWALLET, SPINPAY, PRIZEWALLET)
Уникальная особенность: Первый крипто-кошелек с встроенной игровой механикой (барабан/рулетка), P2P маркетплейсом и системой NFT-подарков, где пользователь зарабатывает играя.
Целевая аудитория: Crypto-natives 18-45 лет, которые ищут не просто кошелек, а engaging experience с возможностью заработка.

🎨 РЕФЕРЕНСЫ ДЛЯ АНАЛИЗА
Анализ кошелька HOT Wallet (на скринах):
Что взять:

✅ Дашборд с балансом HOT токена и анимацией огня
✅ Вкладка "Майнинг" с накопленными токенами
✅ Раздел "Миссии" с активными заданиями
✅ Многосетевая поддержка (ETH, BNB, TON, NEAR, TRX и т.д.)
✅ История транзакций с фильтрами
✅ Интеграция WalletConnect
✅ Раздел приложений (DApps)
✅ Чистый UI с темной темой

Что улучшить:

❌ Добавить больше геймификации (барабан, рулетка)
❌ P2P торговля с мерчантами
❌ NFT-подарки вместо простых токенов
❌ Детальные графики токенов
❌ Встроенный swap с визуализацией

Анализ геймификации (Яндекс Маркет):
Что взять:

✅ Барабан с призами (крутится вертикально, центральный элемент увеличен)
✅ Кнопка "Вращать" внизу
✅ Визуализация призов (скидки, монетки, подарки)
✅ Таймер до следующего бесплатного спина

Что адаптировать:

Призы = WLTX токены, скины-NFT, ваучеры скидок, бусты
Платные спины за USDT
Ежедневный бесплатный спин

🏗️ АРХИТЕКТУРА РАЗРАБОТКИ
ЭТАП 1: FRONTEND (ПРИОРИТЕТ #1)
Задача: Создать полноценный, работающий frontend с mock-данными для визуальной проверки и правок.
Почему сначала frontend:

Видим UX flow сразу
Можем исправлять дизайн on-the-fly
Понимаем какой backend нужен
Избегаем переделок backend

Технологии:

React 19 + TypeScript + Vite
Tailwind CSS
Zustand (state)
React Query (для будущего API)
Framer Motion (анимации барабана)
Recharts / Lightweight Charts (графики токенов)

📱 ДЕТАЛЬНАЯ СПЕЦИФИКАЦИЯ FRONTEND

1. ГЛАВНЫЙ ЭКРАН (Dashboard)
   Структура сверху вниз:
   1.1 Header
   ┌─────────────────────────────────────────┐
   │ ☰ [COINPLAY] 🔔 ⚙️ 👤 │
   └─────────────────────────────────────────┘

```
- Логотип COINPLAY (запоминающийся)
- Иконка уведомлений (с badge счетчиком)
- Иконка настроек
- Аватар пользователя

#### 1.2 Баланс (главная карточка)
```

┌─────────────────────────────────────────┐
│ Total Balance │
│ $1,234.56 USD ▼ │
│ ≈ 0.0234 BTC │
│ │
│ [Отправить] [Получить] [Обменять] [P2P]│
└─────────────────────────────────────────┘

```

**Детали:**
- Общий баланс в выбранной валюте (USD/EUR/RUB - настраивается)
- Эквивалент в BTC
- Dropdown для выбора валюты отображения
- 4 главные кнопки действий (rounded buttons с иконками)

#### 1.3 Карусель баннеров (промо/геймификация)
```

┌─────────────────────────────────────────┐
│ [● ○ ○] <- dots индикатор │
│ │
│ 🎰 DAILY SPIN AVAILABLE! │
│ Win up to 100 WLTX │
│ [Spin Now →] │
│ │
└─────────────────────────────────────────┘

```

**Контент баннеров:**
1. Ежедневный спин (если доступен)
2. Активные миссии
3. Промо партнеров
4. Новые фичи/обновления

**Реализация:**
- Swiper/Carousel компонент
- Автопрокрутка каждые 5 сек
- Клик по баннеру → переход на соответствующий раздел

#### 1.4 Активы (Assets)
```

┌─────────────────────────────────────────┐
│ Активы [+ Add Token] │
├─────────────────────────────────────────┤
│ 💎 ETH 0.0234 $234.56 +5.2%│
│ 🟡 BNB 1.2345 $345.67 -2.1%│
│ ₮ USDT 100.00 $100.00 0.0%│
│ ... │
└─────────────────────────────────────────┘

```

**Детали:**
- Иконка токена + название + количество + USD эквивалент + 24h изменение
- Сортировка: по балансу (default), по названию, по изменению
- Фильтр: показать/скрыть нулевые балансы
- Клик по токену → детальная страница токена

#### 1.5 В тренде (Trending)
```

┌─────────────────────────────────────────┐
│ В тренде [→] │
├─────────────────────────────────────────┤
│ [PEPE] [SHIB] [DOGE] [WIF] │
│ +234% +123% +89% +67% │
└─────────────────────────────────────────┘

```

**Логика:**
- 4 токена с наибольшим изменением за 24h
- Обновляется каждые 5 минут
- Клик → детальная страница токена

---

### 2. ДЕТАЛЬНАЯ СТРАНИЦА ТОКЕНА

**Структура:**

#### 2.1 Header токена
```

┌─────────────────────────────────────────┐
│ ← ETH ⭐ 👁️ │
│ │
│ Ethereum │
│ $2,345.67 +5.67% (24h) │
│ ≈ 1.0 ETH │
└─────────────────────────────────────────┘

```

- Кнопка назад
- Добавить в избранное (звезда)
- Скрыть/показать (глаз)
- Название токена
- Текущая цена + изменение 24h
- Баланс пользователя

#### 2.2 График (TradingView style)
```

┌─────────────────────────────────────────┐
│ [1H] [4H] [1D] [1W] [1M] [1Y] [All] │
│ │
│ ╱╲ ╱╲ │
│ ╱ ╲ ╱ ╲╱ │
│ ╱ ╲╱ │
│ ╱ │
│ │
│ Price: $2,345.67 Vol: $1.2B │
└─────────────────────────────────────────┘

```

**Источник данных:**
- Binance API или Bybit API (бесплатно)
- Fallback: CoinGecko API
- Библиотека: lightweight-charts (TradingView-like)

#### 2.3 Информация о токене
```

┌─────────────────────────────────────────┐
│ Описание │
│ Ethereum - децентрализованная платформа│
│ для смарт-контрактов... [Читать →] │
│ │
│ Market Cap $280.5B #2 │
│ 24h Volume $12.3B │
│ Circulating 120.2M ETH │
│ Total Supply 120.5M ETH │
│ │
│ Сегмент: Layer 1, Smart Contracts │
│ Запуск: 2015 │
│ Создатель: Vitalik Buterin │
│ │
│ 🌐 Website 📄 Whitepaper 💬 Twitter│
└─────────────────────────────────────────┘

```

**Источник данных:**
- CoinMarketCap API / CoinGecko API
- Hardcoded для топ-100 токенов
- User-generated для остальных

#### 2.4 Действия
```

┌─────────────────────────────────────────┐
│ [Купить] [Продать] [Отправить] │
└─────────────────────────────────────────┘

```

- **Купить** → открывает Swap (покупка за USDT/другой токен)
- **Продать** → открывает Swap (продажа на USDT/другой токен)
- **Отправить** → форма отправки токена

---

### 3. БАРАБАН/РУЛЕТКА (Daily Spin)

**Концепция:**
Вертикальная рулетка (как на скрине Яндекс Маркета), центральный элемент увеличен.

#### 3.1 Структура экрана
```

┌─────────────────────────────────────────┐
│ 🎰 Daily Spin Spins: 1 🎫 │
│ │
│ ┌─────────────────────┐ │
│ │ Prize 3 │ <- маленький │
│ ├─────────────────────┤ │
│ │ │ │
│ │ 🎁 Prize 2 🎁 │ <- большой │
│ │ │ (центр) │
│ ├─────────────────────┤ │
│ │ Prize 1 │ <- маленький │
│ └─────────────────────┘ │
│ │
│ [🎰 SPIN NOW] │
│ │
│ Next free spin: 23:45:12 │
│ [Buy 5 spins for $1.99 💰] │
└─────────────────────────────────────────┘
3.2 Призы
typescriptconst prizes = [
{ id: 1, type: 'wltx', amount: 10, weight: 40, icon: '🪙' },
{ id: 2, type: 'wltx', amount: 50, weight: 20, icon: '💰' },
{ id: 3, type: 'wltx', amount: 100, weight: 10, icon: '💎' },
{ id: 4, type: 'discount', value: '50% swap fee', weight: 15, icon: '🎫' },
{ id: 5, type: 'nft_skin', name: 'Golden Coin', weight: 5, icon: '🏆' },
{ id: 6, type: 'boost', name: '2x Claim 24h', weight: 8, icon: '⚡' },
{ id: 7, type: 'nothing', weight: 2, icon: '💔' }
]
Типы призов:

WLTX токены (10/50/100)
Скидки на свапы (50% комиссия, -25% комиссия)
NFT-скины (меняют вид кошелька/аватара)
Бусты (2x claim на 24h, +1 extra spin)
Ничего (попробуй еще раз)

3.3 Механика
typescript// Логика вращения
const spin = async () => {
// 1. Проверить есть ли спины
if (userSpins === 0) {
showError('No spins available')
return
}

// 2. Анимация вращения (3 секунды)
setIsSpinning(true)

// 3. Получить результат с backend (weighted random)
const result = await api.post('/spin/execute')

// 4. Остановить на нужном призе
animateToResult(result.prize)

// 5. Показать модалку с призом
showPrizeModal(result.prize)

// 6. Обновить баланс пользователя
updateBalance()
}

```

#### 3.4 Покупка спинов
```

┌─────────────────────────────────────────┐
│ Buy More Spins │
│ │
│ [1 Spin] $0.99 │
│ [5 Spins] $3.99 (Save 20%) │
│ [10 Spins] $6.99 (Save 30%) │
│ [25 Spins] $14.99 (Save 40%) 🔥 │
│ │
│ [Pay with USDT] [Pay with Card] │
└─────────────────────────────────────────┘

```

---

### 4. P2P МАРКЕТПЛЕЙС

#### 4.1 Главная P2P
```

┌─────────────────────────────────────────┐
│ ← P2P Marketplace [Sell] [Buy] │
│ │
│ [BTC ▼] [USD ▼] [All Methods ▼] │
│ [🔍 Search] │
│ │
│ ┌─ Verified Merchants ─┐ │
│ │ ✅ MerchantA 98.5% ⭐⭐⭐⭐⭐ │
│ │ Buying BTC │
│ │ $45,000 - $100,000 │
│ │ Payment: Bank Transfer, PayPal │
│ │ [Trade →] │
│ └─────────────────────────────────────┘
│ │
│ ┌─ Unverified Zone ─┐ ⚠️ │
│ │ MerchantB 76.2% ⭐⭐⭐ │
│ │ ... │
│ └─────────────────────────────────────┘
└─────────────────────────────────────────┘

```

#### 4.2 Две зоны мерчантов

**Verified Zone (Безопасная):**
- ✅ KYC пройден
- ✅ Депозит залога внесен
- ✅ История > 50 сделок
- ✅ Рейтинг > 95%
- Комиссия: 0.5% (выгодные условия для мерчантов)

**Unverified Zone (На свой риск):**
- ⚠️ Без KYC
- ⚠️ Без депозита
- Disclaimer: "Торговля на свой риск, платформа не несет ответственности"
- Комиссия: 1% (выше, т.к. риск)

#### 4.3 Процесс сделки
```

1. Пользователь выбирает оффер мерчанта
2. Открывается чат + эскроу
3. Пользователь переводит фиат → мерчанту
4. Пользователь отмечает "Оплатил"
5. Крипта блокируется в эскроу
6. Мерчант подтверждает получение фиата
7. Крипта освобождается → пользователю
8. Комиссия списывается с мерчанта

```

**Безопасность:**
- Эскроу смарт-контракт
- Таймер на подтверждение (15 мин)
- Система диспутов
- Доказательства оплаты (скрины/чеки)

---

### 5. SWAP (Обмен токенов)

#### 5.1 Интерфейс свапа
```

┌─────────────────────────────────────────┐
│ ← Swap │
│ │
│ You Pay │
│ ┌─────────────────────────────────────┐
│ │ [USDT ▼] 1000 │
│ │ Balance: 5,000 USDT [MAX] │
│ └─────────────────────────────────────┘
│ │
│ ⇅ [Flip] │
│ │
│ You Receive (estimated) │
│ ┌─────────────────────────────────────┐
│ │ [ETH ▼] 0.4234 │
│ │ ≈ $999.50 │
│ └─────────────────────────────────────┘
│ │
│ Rate: 1 ETH = 2,361.23 USDT │
│ Fee: 0.3% ($3.00) [i] │
│ Price Impact: 0.01% │
│ │
│ Route: USDT → PancakeSwap → ETH │
│ │
│ [Swap Now] │
└─────────────────────────────────────────┘

```

**Интеграция:**
- PancakeSwap (BSC)
- Uniswap (ETH, Polygon, Arbitrum)
- Jupiter (Solana)
- Агрегатор: 1inch API (best price)

**Комиссия платформы:**
- 0.3% с каждого свапа
- Отображается прозрачно

---

### 6. ОТПРАВИТЬ / ПОЛУЧИТЬ

#### 6.1 Отправить
```

┌─────────────────────────────────────────┐
│ ← Send │
│ │
│ Select Token │
│ [USDT - Ethereum ▼] │
│ │
│ Recipient Address │
│ ┌─────────────────────────────────────┐
│ │ 0x1234... [📷][📋]│
│ └─────────────────────────────────────┘
│ │
│ Amount │
│ ┌─────────────────────────────────────┐
│ │ 100 [MAX] │
│ │ ≈ $100.00 │
│ └─────────────────────────────────────┘
│ │
│ Network Fee: ~$2.50 ⚡ │
│ Total: $102.50 │
│ │
│ [Review Transaction] │
└─────────────────────────────────────────┘

```

#### 6.2 Получить
```

┌─────────────────────────────────────────┐
│ ← Receive │
│ │
│ Select Network │
│ [Ethereum ▼] │
│ │
│ Your Address │
│ ┌─────────────────────────────────────┐
│ │ [QR CODE] │
│ │ │
│ └─────────────────────────────────────┘
│ │
│ 0x1234567890abcdef... │
│ [Copy] [Share] │
│ │
│ ⚠️ Send only ETH/ERC-20 to this │
│ address. Other assets will be lost. │
└─────────────────────────────────────────┘

```

---

### 7. НАСТРОЙКИ
```

┌─────────────────────────────────────────┐
│ ← Settings │
│ │
│ Account │
│ [👤 Profile] │
│ [🔐 Security & Privacy] │
│ [🔔 Notifications] │
│ │
│ Preferences │
│ [💱 Currency: USD ▼] │
│ [🌐 Language: English ▼] │
│ [🎨 Theme: Dark ▼] │
│ │
│ Wallet │
│ [💾 Backup Wallet] │
│ [📤 Export Private Key] │
│ [🔗 Connected DApps] │
│ │
│ Support │
│ [❓ Help Center] │
│ [💬 Contact Support] │
│ [📋 Terms & Privacy] │
│ │
│ [🚪 Log Out] │
└─────────────────────────────────────────┘

🎨 ДИЗАЙН-СИСТЕМА
Цветовая палитра
css/_ Light Theme _/
:root {
--c-bg: #FFFFFF;
--c-bg-soft: #F8F9FA;
--c-bg-card: #FFFFFF;
--c-text: #1A1A1A;
--c-text-dim: #6C757D;
--c-border: #DEE2E6;

/_ Brand _/
--c-primary: #6366F1; /_ Indigo _/
--c-primary-hover: #4F46E5;
--c-secondary: #8B5CF6; /_ Purple _/

/_ Status _/
--c-success: #10B981;
--c-danger: #EF4444;
--c-warning: #F59E0B;
--c-info: #3B82F6;

/_ Gamification _/
--c-gold: #FBBF24;
--c-silver: #9CA3AF;
--c-bronze: #D97706;
}

/_ Dark Theme _/
[data-theme="dark"] {
--c-bg: #0F172A;
--c-bg-soft: #1E293B;
--c-bg-card: #1E293B;
--c-text: #F1F5F9;
--c-text-dim: #94A3B8;
--c-border: #334155;
}
Компоненты
Button:
tsx<Button
variant="primary|secondary|outline|ghost|danger"
size="sm|md|lg"
fullWidth={boolean}
loading={boolean}

> Content
> </Button>
> Card:
> tsx<Card
> padding="sm|md|lg"
> hoverable={boolean}
> clickable={boolean}
>
> Content
> </Card>

```

---

## 📦 СТРУКТУРА ПРОЕКТА
```

coinplay-wallet/
├── src/
│ ├── components/
│ │ ├── common/
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ ├── Card.tsx
│ │ │ ├── Modal.tsx
│ │ │ └── ...
│ │ ├── dashboard/
│ │ │ ├── BalanceCard.tsx
│ │ │ ├── ActionButtons.tsx
│ │ │ ├── PromoBanner.tsx
│ │ │ ├── AssetList.tsx
│ │ │ └── TrendingTokens.tsx
│ │ ├── token/
│ │ │ ├── TokenChart.tsx
│ │ │ ├── TokenInfo.tsx
│ │ │ └── TokenActions.tsx
│ │ ├── spin/
│ │ │ ├── SpinWheel.tsx
│ │ │ ├── PrizeModal.tsx
│ │ │ └── BuySpinsModal.tsx
│ │ ├── p2p/
│ │ │ ├── MerchantList.tsx
│ │ │ ├── TradeChat.tsx
│ │ │ └── EscrowStatus.tsx
│ │ └── swap/
│ │ ├── SwapForm.tsx
│ │ ├── TokenSelector.tsx
│ │ └── RouteDisplay.tsx
│ ├── pages/
│ │ ├── Dashboard.tsx
│ │ ├── TokenDetail.tsx
│ │ ├── Spin.tsx
│ │ ├── P2P.tsx
│ │ ├── Swap.tsx
│ │ ├── Send.tsx
│ │ ├── Receive.tsx
│ │ └── Settings.tsx
│ ├── hooks/
│ │ ├── useBalance.ts
│ │ ├── useSpin.ts
│ │ ├── useP2P.ts
│ │ └── useSwap.ts
│ ├── store/
│ │ ├── userStore.ts
│ │ ├── walletStore.ts
│ │ └── settingsStore.ts
│ ├── mock/
│ │ ├── tokens.ts
│ │ ├── transactions.ts
│ │ ├── merchants.ts
│ │ └── prizes.ts
│ └── utils/
│ ├── formatters.ts
│ ├── validators.ts
│ └── constants.ts

🚀 ПРОМПТ ДЛЯ РЕАЛИЗАЦИИ
markdown# ЗАДАЧА: Создать frontend крипто-кошелька COINPLAY

## РОЛЬ

Ты - senior fullstack разработчик с 30-летним опытом, специализация: React, TypeScript, Web3, UX/UI.

## КОНТЕКСТ

Создаем уникальный крипто-кошелек с геймификацией (барабан/рулетка), P2P маркетом и встроенным swap.
Референсы: HOT Wallet (функциональность) + Яндекс Маркет (барабан).

## ТРЕБОВАНИЯ

### ЭТАП 1: SETUP (День 1)

1. Создай Vite + React 19 + TypeScript проект
2. Настрой Tailwind CSS с dark/light темами
3. Установи: zustand, react-query, framer-motion, recharts, react-router-dom
4. Создай базовую структуру папок (как выше)
5. Настрой mock-данные для разработки

### ЭТАП 2: ДИЗАЙН-СИСТЕМА (День 1-2)

1. Создай CSS переменные для тем (light/dark)
2. Реализуй компоненты:
   - Button (4 варианта + 3 размера)
   - Input (с валидацией)
   - Card (hoverable/clickable)
   - Modal (centered/fullscreen)
   - Toast notifications
3. Все с комментариями на РУССКОМ

### ЭТАП 3: DASHBOARD (День 2-3)

Создай главную страницу с:

1. Header (лого, уведомления, настройки, профиль)
2. BalanceCard (общий баланс + 4 action buttons)
3. PromoBanner (карусель 3-5 баннеров)
4. AssetList (список токенов с сортировкой/фильтрами)
5. TrendingTokens (4 топ токена)

Mock данные: 10 токенов с балансами, ценами, изменениями.

### ЭТАП 4: TOKEN DETAIL (День 3-4)

Страница токена с:

1. Header (назад, избранное, скрыть)
2. График (recharts, данные: 1H/4H/1D/1W/1M)
3. Информация:
   - Описание (mock текст)
   - Market cap, volume, supply
   - Сегмент, год запуска, создатель
   - Ссылки (website, whitepaper, social)
4. Action buttons (Buy/Sell/Send)

### ЭТАП 5: SPIN WHEEL (День 4-5)

Барабан с призами:

1. Вертикальная прокрутка (framer-motion)
2. 7 типов призов (WLTX, скидки, NFT, бусты, nothing)
3. Логика:
   - Weighted random
   - Анимация 3 сек
   - Modal с результатом
4. UI:
   - Счетчик спинов
   - Таймер до бесплатного
   - Кнопка покупки спинов
5. Mock: пользователь имеет 1 бесплатный спин

### ЭТАП 6: SWAP (День 5-6)

Форма обмена:

1. Два инпута (From/To) с выбором токена
2. Кнопка переключения направления (flip)
3. Отображение:
   - Rate (курс обмена)
   - Fee (0.3% комиссия)
   - Price impact
   - Route (через какой DEX)
4. Кнопка "Swap Now"
5. Mock: расчет курса через hardcoded rates

### ЭТАП 7: P2P MARKETPLACE (День 6-7)

Маркетплейс с:

1. Фильтры (токен, валюта, метод оплаты)
2. Поиск мерчантов
3. Два раздела:
   - Verified Zone (зеленая рамка, галочка)
   - Unverified Zone (желтая рамка, warning)
4. Карточка мерчанта:
   - Имя, рейтинг, количество сделок
   - Лимиты (min/max)
   - Методы оплаты
   - Кнопка "Trade"
5. Mock: 5 verified + 3 unverified мерчантов

### ЭТАП 8: SEND/RECEIVE (День 7-8)

Страницы отправки и получения:

**Send:**

1. Выбор токена + сети
2. Ввод адреса (с QR scanner mock)
3. Ввод суммы (с кнопкой MAX)
4. Отображение комиссии
5. Review экран
6. Mock: симуляция отправки

**Receive:**

1. Выбор сети
2. QR код (генерируется из mock адреса)
3. Копирование адреса
4. Warning о правильной сети

### ЭТАП 9: SETTINGS (День 8)

Страница настроек:

1. Account (Profile, Security, Notifications)
2. Preferences (Currency, Language, Theme)
3. Wallet (Backup, Export, Connected DApps)
4. Support (Help, Contact, Terms)
5. Log Out

Mock: все действия логируются в console

### ЭТАП 10: АДАПТИВНОСТЬ (День 9)

Сделай responsive для:

1. Desktop (1920px, 1440px, 1024px)
2. Tablet (768px)
3. Mobile (414px, 375px, 360px)

Используй Tailwind breakpoints: sm, md, lg, xl, 2xl

### ЭТАП 11: АНИМАЦИИ (День 9-10)

Добавь micro-interactions:

1. Hover эффекты на кнопках/карточках
2. Fade-in при загрузке страниц
3. Skeleton loaders
4. Transition между темами
5. Spin wheel анимация (главная фича!)

Используй framer-motion.

### ЭТАП 12: НАВИГАЦИЯ (День 10)

Настрой React Router:

1. Bottom nav (мобила): Home, Swap, P2P, Settings
2. Sidebar (desktop): то же + дополнительные ссылки
3. Breadcrumbs на внутренних страницах
4. Защищенные роуты (mock auth)

## ТЕХНИЧЕСКИЕ ДЕТАЛИ

### Mock данные

```typescript
// src/mock/tokens.ts
export const mockTokens = [
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    balance: 0.0234,
    price: 2345.67,
    change24h: 5.67,
    marketCap: 280500000000,
    volume24h: 12300000000,
    icon: "💎",
  },
  // ... еще 9 токенов
];

// src/mock/prizes.ts
export const prizes = [
  { type: "wltx", amount: 10, weight: 40 },
  { type: "wltx", amount: 50, weight: 20 },
  { type: "discount", value: "50%", weight: 15 },
  // ... остальные призы
];

// src/mock/merchants.ts
export const merchants = [
  {
    id: "1",
    name: "MerchantA",
    verified: true,
    rating: 98.5,
    trades: 234,
    limits: { min: 45000, max: 100000 },
    paymentMethods: ["Bank Transfer", "PayPal"],
  },
  // ... еще мерчанты
];
```

### Комментарии в коде

ВСЕ комментарии на РУССКОМ:

```typescript
// Компонент главной страницы кошелька
export const Dashboard = () => {
  // Получаем данные пользователя из store
  const { user, balance } = useUserStore()

  // Состояние для отображения баннеров
  const [activeBanner, setActiveBanner] = useState(0)

  // Функция обновления баланса
  const refreshBalance = async () => {
    // TODO: Заменить на реальный API запрос
    console.log('Обновление баланса...')
  }

  return (

      {/* Карточка с общим балансом */}


      {/* Карусель промо-баннеров */}


      {/* Список активов пользователя */}


  )
}
```

### Структура файлов

Каждый компонент = отдельный файл:

```
Button/
├── Button.tsx        // Основной компонент
├── Button.types.ts   // TypeScript типы
└── Button.test.tsx   // Тесты (опционально)
```

## ВЫХОДНЫЕ ФАЙЛЫ

После каждого этапа создавай:

### 1. Код компонентов

Готовые файлы для копирования в проект.

### 2. Session Report

Файл `SESSION_REPORT_STEP_X.md` с:

```markdown
# Session Report - Step X

## Дата: [дата]

## Этап: [название этапа]

### Что сделано:

- [x] Задача 1
- [x] Задача 2
- [ ] Задача 3 (в процессе)

### Файлы созданы:

- src/components/Dashboard.tsx
- src/components/BalanceCard.tsx
- ...

### Проблемы:

- Проблема 1: описание + решение
- Проблема 2: описание + решение

### Тесты:

✅ Dashboard отображается корректно
✅ BalanceCard показывает правильные данные
⚠️ PromoBanner: нужна оптимизация анимации

### Следующие шаги:

1. Доработать компонент X
2. Добавить тесты для Y
3. Начать этап Z

### Скриншоты/демо:

[Описание того, как выглядит результат]
```

### 3. Инструкция по запуску

````markdown
# Как запустить проект

## Установка:

```bash
npm install
```

## Запуск dev сервера:

```bash
npm run dev
```

## Открыть в браузере:

http://localhost:5173

## Mock данные:

Все данные находятся в `src/mock/`
Изменяй их для тестирования разных сценариев.
````

## ВАЖНЫЕ ПРАВИЛА

### 1. Комментарии

- ТОЛЬКО на русском языке
- Объясняй логику, не очевидное
- Для каждой функции: что делает, параметры, возврат

### 2. TypeScript

- Строгая типизация (no any!)
- Интерфейсы для всех props
- Enum для константных значений

### 3. Производительность

- Мемоизация (useMemo, useCallback) где нужно
- Lazy loading для тяжелых компонентов
- Виртуализация для длинных списков

### 4. Доступность (a11y)

- aria-labels для иконок
- keyboard navigation
- focus states

### 5. Responsive

- Mobile-first подход
- Touch-friendly (минимум 44px для кликабельных элементов)
- Тестируй на всех брейкпоинтах

## ЧЕКЛИСТ ПЕРЕД ЗАВЕРШЕНИЕМ ЭТАПА

- [ ] Код работает без ошибок
- [ ] Все компоненты прокомментированы на русском
- [ ] Responsive на всех устройствах
- [ ] Dark/Light темы работают
- [ ] Mock данные реалистичны
- [ ] Session Report создан
- [ ] Готов для показа заказчику

## ФОРМАТ ОТВЕТА

Для каждого этапа предоставляй:

### 1. Файлы кода

Полный код компонентов, готовый для копирования.

### 2. Инструкции

Пошаговые действия для интеграции кода.

### 3. Session Report

Детальный отчет о проделанной работе.

### 4. Демонстрация

Описание того, как должен выглядеть результат + что должно работать.

## СТАРТ РАЗРАБОТКИ

Начни с ЭТАПА 1 (SETUP).

После завершения каждого этапа жди моего подтверждения перед переходом к следующему.

Я буду проверять результат, давать фидбек и правки.

Только после моего "ОК" переходи к следующему этапу.

---

**КРИТИЧЕСКИ ВАЖНО:**

1. Весь код с русскими комментариями
2. Готовые файлы для копирования
3. Session Report после каждого этапа
4. Поэтапная работа с подтверждением
5. Mock данные для всего функционала

📋 ДОПОЛНИТЕЛЬНЫЕ ДЕТАЛИ ДЛЯ BACKEND (ПОСЛЕ FRONTEND)
После того как frontend будет готов и одобрен, переходим к backend:
Backend Roadmap
Week 1-2: Core Infrastructure

PostgreSQL schema
Authentication (JWT + 2FA)
Wallet generation & encryption
RPC connections (EVM, Solana, Bitcoin, TRON, TON)

Week 3: Spin Wheel Mechanism

Weighted random algorithm
Prize distribution system
Anti-cheat mechanisms
Payment integration for buying spins

Week 4: P2P Marketplace

Escrow smart contracts
Merchant verification system
Chat functionality
Dispute resolution

Week 5: Swap Integration

DEX aggregators (1inch, PancakeSwap, Uniswap)
Fee collection mechanism (0.3%)
Route optimization
Slippage protection

Week 6: Token Data

CoinMarketCap/CoinGecko API
Price caching (Redis)
Chart data from Binance/Bybit
Token info database

Week 7-8: Security & Testing

Security audit
Load testing
Backup systems
Monitoring (Sentry, Prometheus)

📱 MOBILE & EXTENSION (ПОСЛЕ WEB)
Mobile (React Native)

Reuse components from web
Native features: FaceID, Push notifications
App Store & Google Play deployment

Browser Extension

Chrome/Firefox compatibility
window.ethereum provider
DApp integration
Manifest V3

📊 SUCCESS METRICS
MVP Success:

1000+ registered users
500+ daily active users
100+ spins per day
$10k+ swap volume
50+ P2P trades

Growth Targets (3 months):

10,000+ users
$100k+ daily volume
20+ verified merchants
1000+ NFT skins distributed

🎯 НАЧИНАЕМ
Готов начать с ЭТАПА 1: SETUP?
Подтверди, и я предоставлю:

Полный setup код
Структуру проекта
Конфигурации
Mock данные
Session Report #1

Ждешь от меня:

Готовые файлы для копирования
Четкие инструкции
Русские комментарии
Рабочий код

Жду твоего "GO!" чтобы начать. 🚀
🎯 ПРОМПТ #1: BACKEND РАЗРАБОТКА
markdown# ЗАДАЧА: Разработать Backend для крипто-кошелька COINPLAY

## РОЛЬ

Ты - senior backend/blockchain разработчик с 30-летним опытом.
Специализация: Node.js, PostgreSQL, Web3, Smart Contracts, Security.

## КОНТЕКСТ

Backend для крипто-кошелька с:

- Multi-chain support (EVM, Solana, Bitcoin, TRON, TON)
- Spin Wheel (геймификация)
- P2P Marketplace с эскроу
- Swap агрегация
- Собственный токен WLTX с claim механикой

Frontend УЖЕ готов, backend должен быть совместим с ним.

---

## АРХИТЕКТУРА BACKEND

### Технологический стек:

```
Runtime: Node.js 20+ (LTS)
Framework: Express.js + TypeScript
Database: PostgreSQL (Supabase free tier)
Cache: Redis (Upstash free tier)
Queue: BullMQ (для фоновых задач)
Blockchain: ethers.js, @solana/web3.js, bitcoinjs-lib, tronweb, tonweb
Security: bcrypt, jsonwebtoken, helmet, rate-limiter-flexible
Monitoring: Sentry, Winston (logs)
Deployment: Railway/Render (free tier)
```

### Структура проекта:

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts         # Подключение к Postgres
│   │   ├── redis.ts            # Подключение к Redis
│   │   ├── chains.ts           # RPC endpoints для блокчейнов
│   │   └── constants.ts        # Константы проекта
│   ├── models/
│   │   ├── User.ts
│   │   ├── Wallet.ts
│   │   ├── Account.ts
│   │   ├── Token.ts
│   │   ├── Transaction.ts
│   │   ├── Spin.ts
│   │   ├── P2PMerchant.ts
│   │   └── Swap.ts
│   ├── services/
│   │   ├── auth/
│   │   │   ├── AuthService.ts      # Регистрация, логин, JWT
│   │   │   └── TwoFactorService.ts # 2FA (TOTP)
│   │   ├── wallet/
│   │   │   ├── WalletService.ts    # Создание/импорт кошелька
│   │   │   ├── KeystoreService.ts  # Шифрование приватных ключей
│   │   │   └── DerivationService.ts # BIP-44 деривация
│   │   ├── blockchain/
│   │   │   ├── EVMService.ts       # Ethereum, BSC, Polygon и т.д.
│   │   │   ├── SolanaService.ts
│   │   │   ├── BitcoinService.ts
│   │   │   ├── TronService.ts
│   │   │   └── TonService.ts
│   │   ├── balance/
│   │   │   ├── BalanceService.ts   # Индексация балансов
│   │   │   └── PriceService.ts     # Получение цен (CoinGecko)
│   │   ├── transaction/
│   │   │   ├── TransactionService.ts # Создание/отправка tx
│   │   │   └── GasEstimator.ts     # Оценка комиссий
│   │   ├── spin/
│   │   │   ├── SpinService.ts      # Логика барабана
│   │   │   ├── PrizeService.ts     # Распределение призов
│   │   │   └── SpinPaymentService.ts # Покупка спинов
│   │   ├── p2p/
│   │   │   ├── P2PService.ts       # Маркетплейс
│   │   │   ├── EscrowService.ts    # Эскроу контракты
│   │   │   └── DisputeService.ts   # Система диспутов
│   │   ├── swap/
│   │   │   ├── SwapAggregator.ts   # Агрегация DEX
│   │   │   ├── FeeCollector.ts     # Сбор комиссий 0.3%
│   │   │   └── RouteOptimizer.ts   # Поиск лучшего маршрута
│   │   └── wltx/
│   │       ├── WLTXService.ts      # WLTX токен операции
│   │       ├── ClaimService.ts     # Daily claim
│   │       └── StakingService.ts   # Staking (опционально)
│   ├── routes/
│   │   ├── auth.ts                 # POST /auth/register, /login
│   │   ├── wallet.ts               # POST /wallet/create, /import
│   │   ├── balance.ts              # GET /balance/:address
│   │   ├── transaction.ts          # POST /transaction/send
│   │   ├── spin.ts                 # POST /spin/execute
│   │   ├── p2p.ts                  # GET /p2p/merchants
│   │   ├── swap.ts                 # POST /swap/quote, /execute
│   │   └── wltx.ts                 # GET /wltx/stats, POST /claim
│   ├── middleware/
│   │   ├── auth.ts                 # JWT проверка
│   │   ├── validation.ts           # Валидация запросов (Zod)
│   │   ├── rateLimiter.ts          # Rate limiting
│   │   └── errorHandler.ts         # Обработка ошибок
│   ├── workers/
│   │   ├── balanceIndexer.ts      # Крон: индексация балансов
│   │   ├── priceUpdater.ts        # Крон: обновление цен
│   │   ├── transactionMonitor.ts  # Мониторинг pending tx
│   │   └── feeCollector.ts        # Сбор комиссий со свапов
│   ├── utils/
│   │   ├── crypto.ts               # Криптографические утилиты
│   │   ├── validators.ts           # Валидация адресов
│   │   └── formatters.ts           # Форматирование данных
│   ├── types/
│   │   ├── index.ts                # Общие типы
│   │   └── blockchain.ts           # Типы для блокчейнов
│   └── app.ts                      # Express app
├── prisma/                         # ИЛИ используй Prisma ORM
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
├── scripts/
│   ├── deploy-contracts.ts         # Деплой WLTX контракта
│   └── seed-database.ts            # Заполнение БД тестовыми данными
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## ЭТАП 1: ИНФРАСТРУКТУРА И БАЗА ДАННЫХ (День 1-3)

### День 1: Setup проекта

**1.1 Инициализация:**

```bash
mkdir backend && cd backend
npm init -y
npm install express typescript ts-node @types/node @types/express
npm install dotenv cors helmet express-rate-limit
npm install pg @types/pg          # PostgreSQL
npm install ioredis @types/ioredis # Redis
npm install bullmq                 # Queue
npm install winston               # Logging
npm install @sentry/node          # Error tracking
```

**1.2 Создать tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**1.3 Создать .env.example:**

```env
# Server
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000

# Database (Supabase)
DATABASE_URL=postgresql://user:password@host:5432/coinplay_db

# Redis (Upstash)
REDIS_URL=redis://default:password@host:6379

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=another-secret-key
REFRESH_TOKEN_EXPIRES_IN=7d

# Blockchain RPCs (Free tiers)
ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
BSC_RPC=https://bsc-dataseed.binance.org/
POLYGON_RPC=https://polygon-rpc.com/
ARBITRUM_RPC=https://arb1.arbitrum.io/rpc
AVALANCHE_RPC=https://api.avax.network/ext/bc/C/rpc
SOLANA_RPC=https://api.mainnet-beta.solana.com
TRON_RPC=https://api.trongrid.io
TON_RPC=https://toncenter.com/api/v2/jsonRPC
BITCOIN_RPC=https://blockstream.info/api

# External APIs
COINGECKO_API_KEY=your-coingecko-key (опционально)
BINANCE_API_KEY=your-binance-key (для графиков)

# WLTX Contract
WLTX_CONTRACT_ADDRESS=0x...
WLTX_PRIVATE_KEY=0x... (для минта наград)

# Sentry
SENTRY_DSN=https://...

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 минут
RATE_LIMIT_MAX_REQUESTS=100
```

### День 2: База данных (PostgreSQL Schema)

**1.4 SQL Schema для Supabase:**

```sql
-- КОММЕНТАРИЙ: Таблица пользователей кошелька
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    two_factor_secret VARCHAR(100),
    two_factor_enabled BOOLEAN DEFAULT false,
    email_verified BOOLEAN DEFAULT false,
    kyc_status VARCHAR(20) DEFAULT 'none', -- none, pending, verified, rejected
    referral_code VARCHAR(20) UNIQUE,
    referred_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Кошельки пользователей (один пользователь может иметь несколько)
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) DEFAULT 'Main Wallet',
    encrypted_keystore TEXT NOT NULL, -- НИКОГДА не храним приватные ключи в открытом виде
    xpub_evm TEXT,    -- Extended public key для EVM
    xpub_btc TEXT,    -- Extended public key для Bitcoin
    backup_completed BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Аккаунты по каждой сети блокчейна
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID REFERENCES wallets(id) ON DELETE CASCADE,
    chain VARCHAR(50) NOT NULL, -- ethereum, bsc, polygon, solana, bitcoin, tron, ton
    address VARCHAR(255) NOT NULL,
    derivation_path VARCHAR(100), -- m/44'/60'/0'/0/0
    label VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(wallet_id, chain, address)
);

-- КОММЕНТАРИЙ: Реестр поддерживаемых токенов
CREATE TABLE tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chain VARCHAR(50) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    decimals INT NOT NULL,
    contract_address VARCHAR(255), -- NULL для нативных монет
    logo_url TEXT,
    coingecko_id VARCHAR(100),
    is_native BOOLEAN DEFAULT false,
    is_stablecoin BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(chain, contract_address)
);

-- КОММЕНТАРИЙ: Балансы пользователей (кэш, обновляется воркером)
CREATE TABLE balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    token_id UUID REFERENCES tokens(id),
    amount VARCHAR(100) NOT NULL DEFAULT '0', -- Храним как строку для точности
    usd_value DECIMAL(20, 2) DEFAULT 0,
    last_updated TIMESTAMP DEFAULT NOW(),
    UNIQUE(account_id, token_id)
);

-- КОММЕНТАРИЙ: История транзакций
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES accounts(id),
    tx_hash VARCHAR(255) UNIQUE NOT NULL,
    tx_type VARCHAR(20) NOT NULL, -- send, receive, swap, approve, claim
    from_address VARCHAR(255) NOT NULL,
    to_address VARCHAR(255) NOT NULL,
    token_id UUID REFERENCES tokens(id),
    amount VARCHAR(100) NOT NULL,
    fee VARCHAR(100), -- Комиссия сети
    fee_usd DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, failed
    block_number BIGINT,
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Система SPIN (барабан)
CREATE TABLE user_spins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    free_spins INT DEFAULT 1, -- Бесплатные спины (1 в день)
    paid_spins INT DEFAULT 0, -- Купленные спины
    last_free_spin_reset TIMESTAMP DEFAULT NOW(),
    total_spins_used INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: История спинов и призов
CREATE TABLE spin_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    prize_type VARCHAR(50) NOT NULL, -- wltx, discount, nft_skin, boost, nothing
    prize_value TEXT, -- JSON с деталями приза
    spin_type VARCHAR(20) NOT NULL, -- free, paid
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: NFT-скины (косметические призы)
CREATE TABLE nft_skins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    skin_name VARCHAR(100) NOT NULL,
    skin_type VARCHAR(50) NOT NULL, -- avatar, theme, icon
    rarity VARCHAR(20), -- common, rare, epic, legendary
    is_equipped BOOLEAN DEFAULT false,
    obtained_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Ваучеры скидок (призы из барабана)
CREATE TABLE discount_vouchers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    discount_type VARCHAR(50) NOT NULL, -- swap_fee, p2p_fee
    discount_percent INT NOT NULL, -- 25, 50, 75
    uses_remaining INT DEFAULT 1,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: P2P Мерчанты
CREATE TABLE p2p_merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    merchant_name VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    kyc_documents JSONB, -- Ссылки на документы
    deposit_amount DECIMAL(20, 2) DEFAULT 0, -- Депозит для verified
    rating DECIMAL(3, 2) DEFAULT 0, -- 0.00 - 5.00
    total_trades INT DEFAULT 0,
    successful_trades INT DEFAULT 0,
    payment_methods JSONB, -- ["Bank Transfer", "PayPal", ...]
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: P2P Офферы (объявления)
CREATE TABLE p2p_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID REFERENCES p2p_merchants(id),
    offer_type VARCHAR(10) NOT NULL, -- buy, sell
    crypto_currency VARCHAR(20) NOT NULL, -- BTC, ETH, USDT
    fiat_currency VARCHAR(10) NOT NULL, -- USD, EUR, RUB
    price DECIMAL(20, 2) NOT NULL,
    min_amount DECIMAL(20, 2) NOT NULL,
    max_amount DECIMAL(20, 2) NOT NULL,
    payment_methods JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: P2P Сделки с эскроу
CREATE TABLE p2p_trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES p2p_offers(id),
    buyer_id UUID REFERENCES users(id),
    seller_id UUID REFERENCES users(id),
    amount DECIMAL(20, 2) NOT NULL,
    crypto_amount DECIMAL(30, 10) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, escrowed, completed, disputed, cancelled
    escrow_tx_hash VARCHAR(255), -- Транзакция блокировки в эскроу
    release_tx_hash VARCHAR(255), -- Транзакция освобождения из эскроу
    chat_messages JSONB, -- Массив сообщений чата
    dispute_reason TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- КОММЕНТАРИЙ: Свапы
CREATE TABLE swaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    account_id UUID REFERENCES accounts(id),
    tx_hash VARCHAR(255) UNIQUE,
    from_token_id UUID REFERENCES tokens(id),
    to_token_id UUID REFERENCES tokens(id),
    from_amount VARCHAR(100) NOT NULL,
    to_amount VARCHAR(100) NOT NULL,
    rate DECIMAL(30, 10),
    slippage DECIMAL(5, 2),
    provider VARCHAR(50), -- uniswap, pancakeswap, 1inch, jupiter
    platform_fee_amount VARCHAR(100), -- 0.3% комиссия
    platform_fee_usd DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Кэш цен токенов
CREATE TABLE token_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id UUID REFERENCES tokens(id) UNIQUE,
    price_usd DECIMAL(20, 10) NOT NULL,
    market_cap DECIMAL(20, 2),
    volume_24h DECIMAL(20, 2),
    change_24h DECIMAL(10, 2),
    last_updated TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Настройки пользователя
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) UNIQUE,
    theme VARCHAR(20) DEFAULT 'dark', -- dark, light
    language VARCHAR(10) DEFAULT 'en', -- en, ru
    currency VARCHAR(10) DEFAULT 'USD', -- USD, EUR, RUB
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    biometric_enabled BOOLEAN DEFAULT false,
    auto_lock_timeout INT DEFAULT 300, -- секунды
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Сессии (для JWT refresh tokens)
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(500) UNIQUE NOT NULL,
    device_info JSONB, -- User-Agent, IP, etc
    ip_address VARCHAR(50),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- КОММЕНТАРИЙ: Логи действий (для безопасности)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL, -- login, logout, send_tx, swap, etc
    details JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ИНДЕКСЫ для производительности
CREATE INDEX idx_accounts_wallet ON accounts(wallet_id);
CREATE INDEX idx_accounts_address ON accounts(address);
CREATE INDEX idx_balances_account ON balances(account_id);
CREATE INDEX idx_transactions_account ON transactions(account_id);
CREATE INDEX idx_transactions_hash ON transactions(tx_hash);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_p2p_trades_buyer ON p2p_trades(buyer_id);
CREATE INDEX idx_p2p_trades_seller ON p2p_trades(seller_id);
CREATE INDEX idx_swaps_user ON swaps(user_id);
CREATE INDEX idx_spin_history_user ON spin_history(user_id);
```

### День 3: Redis Setup и Конфигурация

**1.5 Создать src/config/database.ts:**

```typescript
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// КОММЕНТАРИЙ: Подключение к PostgreSQL (Supabase)
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  max: 20, // Максимум соединений в пуле
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// КОММЕНТАРИЙ: Проверка подключения при старте
pool.on("connect", () => {
  console.log("✅ Подключено к PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Ошибка подключения к PostgreSQL:", err);
  process.exit(-1);
});

export default pool;
```

**1.6 Создать src/config/redis.ts:**

```typescript
import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// КОММЕНТАРИЙ: Подключение к Redis (Upstash)
export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("connect", () => {
  console.log("✅ Подключено к Redis");
});

redis.on("error", (err) => {
  console.error("❌ Ошибка подключения к Redis:", err);
});

export default redis;
```

**1.7 Создать src/config/chains.ts:**

```typescript
import dotenv from "dotenv";

dotenv.config();

// КОММЕНТАРИЙ: Конфигурация RPC endpoints для всех блокчейнов
export const CHAIN_CONFIG = {
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    rpc: process.env.ETHEREUM_RPC!,
    explorer: "https://etherscan.io",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  bsc: {
    chainId: 56,
    name: "BNB Smart Chain",
    rpc: process.env.BSC_RPC!,
    explorer: "https://bscscan.com",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  },
  polygon: {
    chainId: 137,
    name: "Polygon",
    rpc: process.env.POLYGON_RPC!,
    explorer: "https://polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  },
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum One",
    rpc: process.env.ARBITRUM_RPC!,
    explorer: "https://arbiscan.io",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  },
  avalanche: {
    chainId: 43114,
    name: "Avalanche C-Chain",
    rpc: process.env.AVALANCHE_RPC!,
    explorer: "https://snowtrace.io",
    nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
  },
  solana: {
    name: "Solana",
    rpc: process.env.SOLANA_RPC!,
    explorer: "https://explorer.solana.com",
    nativeCurrency: { name: "SOL", symbol: "SOL", decimals: 9 },
  },
  bitcoin: {
    name: "Bitcoin",
    rpc: process.env.BITCOIN_RPC!,
    explorer: "https://blockstream.info",
    nativeCurrency: { name: "BTC", symbol: "BTC", decimals: 8 },
  },
  tron: {
    name: "TRON",
    rpc: process.env.TRON_RPC!,
    explorer: "https://tronscan.org",
    nativeCurrency: { name: "TRX", symbol: "TRX", decimals: 6 },
  },
  ton: {
    name: "TON",
    rpc: process.env.TON_RPC!,
    explorer: "https://tonscan.org",
    nativeCurrency: { name: "TON", symbol: "TON", decimals: 9 },
  },
};

export type ChainName = keyof typeof CHAIN_CONFIG;
```

---

**ЭТО ТОЛЬКО ЭТАП 1 (День 1-3) из backend промпта.**

Продолжить с:

- ЭТАП 2: Authentication & Security (День 4-6)
- ЭТАП 3: Wallet Management (День 7-9)
- ЭТАП 4: Blockchain Integration (День 10-15)
- ЭТАП 5: Spin Wheel Logic (День 16-18)
- ЭТАП 6: P2P Marketplace (День 19-23)
- ЭТАП 7: Swap Aggregation (День 24-27)
- ЭТАП 8: Workers & Cron Jobs (День 28-30)
- ЭТАП 9: Testing & Security Audit (День 31-35)
- ЭТАП 10: Deployment & Monitoring (День 36-40)
  🎯 ПРОМПТ #1: BACKEND РАЗРАБОТКА (ПРОДОЛЖЕНИЕ)

ЭТАП 2: AUTHENTICATION & SECURITY (День 4-6)
День 4: Система аутентификации
2.1 Установить зависимости:
bashnpm install bcrypt jsonwebtoken speakeasy qrcode
npm install @types/bcrypt @types/jsonwebtoken @types/speakeasy @types/qrcode
npm install zod # Для валидации
2.2 Создать src/services/auth/AuthService.ts:
typescriptimport bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../../config/database'
import { redis } from '../../config/redis'

interface RegisterData {
email: string
username: string
password: string
referralCode?: string
}

interface LoginData {
email: string
password: string
twoFactorCode?: string
}

export class AuthService {
private readonly SALT_ROUNDS = 12
private readonly JWT_SECRET = process.env.JWT_SECRET!
private readonly REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!

// КОММЕНТАРИЙ: Регистрация нового пользователя
async register(data: RegisterData) {
const { email, username, password, referralCode } = data

    // Проверка существования пользователя
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR username = $2',
      [email, username]
    )

    if (existingUser.rows.length > 0) {
      throw new Error('Пользователь с таким email или username уже существует')
    }

    // Хеширование пароля
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS)

    // Генерация реферального кода
    const userReferralCode = this.generateReferralCode()

    // Поиск реферера (если указан реферальный код)
    let referrerId = null
    if (referralCode) {
      const referrer = await pool.query(
        'SELECT id FROM users WHERE referral_code = $1',
        [referralCode]
      )
      if (referrer.rows.length > 0) {
        referrerId = referrer.rows[0].id
      }
    }

    // Создание пользователя
    const result = await pool.query(
      `INSERT INTO users (email, username, password_hash, referral_code, referred_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, username, referral_code, created_at`,
      [email, username, passwordHash, userReferralCode, referrerId]
    )

    const user = result.rows[0]

    // Создание настроек пользователя по умолчанию
    await pool.query(
      'INSERT INTO user_settings (user_id) VALUES ($1)',
      [user.id]
    )

    // Создание записи для спинов (1 бесплатный спин)
    await pool.query(
      'INSERT INTO user_spins (user_id, free_spins) VALUES ($1, 1)',
      [user.id]
    )

    // Если был referrer, начислить ему бонус
    if (referrerId) {
      await this.creditReferralBonus(referrerId, user.id)
    }

    // Генерация JWT токенов
    const tokens = await this.generateTokens(user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        referralCode: user.referral_code,
      },
      ...tokens,
    }

}

// КОММЕНТАРИЙ: Вход пользователя
async login(data: LoginData) {
const { email, password, twoFactorCode } = data

    // Поиск пользователя
    const result = await pool.query(
      `SELECT id, email, username, password_hash, two_factor_enabled, two_factor_secret
       FROM users WHERE email = $1`,
      [email]
    )

    if (result.rows.length === 0) {
      throw new Error('Неверный email или пароль')
    }

    const user = result.rows[0]

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль')
    }

    // Проверка 2FA (если включена)
    if (user.two_factor_enabled) {
      if (!twoFactorCode) {
        throw new Error('Требуется код двухфакторной аутентификации')
      }

      const isValidCode = await this.verify2FACode(
        user.two_factor_secret,
        twoFactorCode
      )

      if (!isValidCode) {
        throw new Error('Неверный код двухфакторной аутентификации')
      }
    }

    // Генерация токенов
    const tokens = await this.generateTokens(user.id)

    // Логирование входа
    await this.logAction(user.id, 'login', { email })

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      ...tokens,
    }

}

// КОММЕНТАРИЙ: Генерация access и refresh токенов
private async generateTokens(userId: string) {
// Access token (15 минут)
const accessToken = jwt.sign(
{ userId, type: 'access' },
this.JWT_SECRET,
{ expiresIn: '15m' }
)

    // Refresh token (7 дней)
    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      this.REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    // Сохранение refresh token в БД
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await pool.query(
      `INSERT INTO sessions (user_id, refresh_token, expires_at)
       VALUES ($1, $2, $3)`,
      [userId, refreshToken, expiresAt]
    )

    // Кэширование access token в Redis (15 минут)
    await redis.setex(`auth:${userId}`, 900, accessToken)

    return { accessToken, refreshToken }

}

// КОММЕНТАРИЙ: Обновление access token через refresh token
async refreshToken(refreshToken: string) {
try {
// Проверка refresh token
const decoded = jwt.verify(refreshToken, this.REFRESH_SECRET) as any

      // Проверка существования сессии
      const session = await pool.query(
        `SELECT user_id, expires_at FROM sessions
         WHERE refresh_token = $1 AND expires_at > NOW()`,
        [refreshToken]
      )

      if (session.rows.length === 0) {
        throw new Error('Невалидный или истекший refresh token')
      }

      const userId = session.rows[0].user_id

      // Генерация нового access token
      const accessToken = jwt.sign(
        { userId, type: 'access' },
        this.JWT_SECRET,
        { expiresIn: '15m' }
      )

      // Обновление кэша в Redis
      await redis.setex(`auth:${userId}`, 900, accessToken)

      return { accessToken }
    } catch (error) {
      throw new Error('Невалидный refresh token')
    }

}

// КОММЕНТАРИЙ: Выход (удаление сессии)
async logout(refreshToken: string) {
await pool.query(
'DELETE FROM sessions WHERE refresh_token = $1',
[refreshToken]
)
}

// КОММЕНТАРИЙ: Генерация уникального реферального кода
private generateReferralCode(): string {
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
let code = ''
for (let i = 0; i < 8; i++) {
code += chars.charAt(Math.floor(Math.random() \* chars.length))
}
return code
}

// КОММЕНТАРИЙ: Начисление бонуса рефереру
private async creditReferralBonus(referrerId: string, newUserId: string) {
// Создать запись о рефералe
await pool.query(
`INSERT INTO referrals (referrer_id, referred_id)
       VALUES ($1, $2)`,
[referrerId, newUserId]
)

    // Начислить бонус (например, 3 extra spins)
    await pool.query(
      `UPDATE user_spins SET paid_spins = paid_spins + 3
       WHERE user_id = $1`,
      [referrerId]
    )

    // TODO: Можно добавить начисление WLTX токенов

}

// КОММЕНТАРИЙ: Проверка 2FA кода (будет реализована в TwoFactorService)
private async verify2FACode(secret: string, code: string): Promise<boolean> {
// Заглушка, реализация в TwoFactorService
return true
}

// КОММЕНТАРИЙ: Логирование действий пользователя
private async logAction(
userId: string,
action: string,
details: any
) {
await pool.query(
`INSERT INTO audit_logs (user_id, action, details)
       VALUES ($1, $2, $3)`,
[userId, action, JSON.stringify(details)]
)
}
}

export default new AuthService()
2.3 Создать src/services/auth/TwoFactorService.ts:
typescriptimport speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import { pool } from '../../config/database'

export class TwoFactorService {
// КОММЕНТАРИЙ: Генерация секрета для 2FA
async generateSecret(userId: string) {
// Получить данные пользователя
const user = await pool.query(
'SELECT email, username FROM users WHERE id = $1',
[userId]
)

    if (user.rows.length === 0) {
      throw new Error('Пользователь не найден')
    }

    const { email, username } = user.rows[0]

    // Генерация секрета
    const secret = speakeasy.generateSecret({
      name: `CoinPlay (${email})`,
      issuer: 'CoinPlay Wallet',
    })

    // Сохранение секрета (временно, до подтверждения)
    await pool.query(
      'UPDATE users SET two_factor_secret = $1 WHERE id = $2',
      [secret.base32, userId]
    )

    // Генерация QR кода
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!)

    return {
      secret: secret.base32,
      qrCode: qrCodeUrl,
    }

}

// КОММЕНТАРИЙ: Включение 2FA после проверки кода
async enable2FA(userId: string, code: string) {
// Получить секрет пользователя
const user = await pool.query(
'SELECT two_factor_secret FROM users WHERE id = $1',
[userId]
)

    if (user.rows.length === 0) {
      throw new Error('Пользователь не найден')
    }

    const secret = user.rows[0].two_factor_secret

    if (!secret) {
      throw new Error('Секрет 2FA не сгенерирован')
    }

    // Проверка кода
    const isValid = this.verifyCode(secret, code)

    if (!isValid) {
      throw new Error('Неверный код')
    }

    // Активация 2FA
    await pool.query(
      'UPDATE users SET two_factor_enabled = true WHERE id = $1',
      [userId]
    )

    return { success: true }

}

// КОММЕНТАРИЙ: Отключение 2FA
async disable2FA(userId: string, code: string) {
// Получить секрет пользователя
const user = await pool.query(
'SELECT two_factor_secret FROM users WHERE id = $1',
[userId]
)

    if (user.rows.length === 0) {
      throw new Error('Пользователь не найден')
    }

    const secret = user.rows[0].two_factor_secret

    // Проверка кода перед отключением
    const isValid = this.verifyCode(secret, code)

    if (!isValid) {
      throw new Error('Неверный код')
    }

    // Отключение 2FA
    await pool.query(
      `UPDATE users
       SET two_factor_enabled = false, two_factor_secret = NULL
       WHERE id = $1`,
      [userId]
    )

    return { success: true }

}

// КОММЕНТАРИЙ: Проверка 2FA кода
verifyCode(secret: string, code: string): boolean {
return speakeasy.totp.verify({
secret,
encoding: 'base32',
token: code,
window: 2, // Разрешаем коды в пределах ±2 периодов (60 сек)
})
}
}

export default new TwoFactorService()
День 5: Middleware для защиты роутов
2.4 Создать src/middleware/auth.ts:
typescriptimport { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { redis } from '../config/redis'

// КОММЕНТАРИЙ: Расширение типа Request для добавления userId
declare global {
namespace Express {
interface Request {
userId?: string
}
}
}

// КОММЕНТАРИЙ: Middleware для проверки JWT токена
export const authenticateToken = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
// Получение токена из заголовка
const authHeader = req.headers.authorization
const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Токен не предоставлен' })
    }

    // Проверка токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.type !== 'access') {
      return res.status(401).json({ error: 'Неверный тип токена' })
    }

    // Проверка в Redis (дополнительная защита)
    const cachedToken = await redis.get(`auth:${decoded.userId}`)
    if (cachedToken !== token) {
      return res.status(401).json({ error: 'Токен невалиден или истек' })
    }

    // Добавление userId в request
    req.userId = decoded.userId

    next()

} catch (error) {
if (error instanceof jwt.TokenExpiredError) {
return res.status(401).json({ error: 'Токен истек' })
}
return res.status(403).json({ error: 'Невалидный токен' })
}
}

// КОММЕНТАРИЙ: Middleware для проверки KYC статуса (опционально)
export const requireKYC = async (
req: Request,
res: Response,
next: NextFunction
) => {
try {
const userId = req.userId!

    const result = await pool.query(
      'SELECT kyc_status FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' })
    }

    const kycStatus = result.rows[0].kyc_status

    if (kycStatus !== 'verified') {
      return res.status(403).json({
        error: 'Требуется верификация KYC',
        kycStatus,
      })
    }

    next()

} catch (error) {
res.status(500).json({ error: 'Ошибка проверки KYC' })
}
}
2.5 Создать src/middleware/validation.ts:
typescriptimport { Request, Response, NextFunction } from 'express'
import { z, ZodSchema } from 'zod'

// КОММЕНТАРИЙ: Middleware для валидации данных с помощью Zod
export const validate = (schema: ZodSchema) => {
return async (req: Request, res: Response, next: NextFunction) => {
try {
// Валидация body
await schema.parseAsync(req.body)
next()
} catch (error) {
if (error instanceof z.ZodError) {
return res.status(400).json({
error: 'Ошибка валидации',
details: error.errors.map(err => ({
field: err.path.join('.'),
message: err.message,
})),
})
}
res.status(500).json({ error: 'Ошибка сервера' })
}
}
}

// КОММЕНТАРИЙ: Схемы валидации
export const schemas = {
register: z.object({
email: z.string().email('Некорректный email'),
username: z
.string()
.min(3, 'Username должен быть не менее 3 символов')
.max(20, 'Username не должен превышать 20 символов')
.regex(/^[a-zA-Z0-9_]+$/, 'Username может содержать только буквы, цифры и \_'),
password: z
.string()
.min(8, 'Пароль должен быть не менее 8 символов')
.regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
.regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
.regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
referralCode: z.string().optional(),
}),

login: z.object({
email: z.string().email('Некорректный email'),
password: z.string().min(1, 'Пароль обязателен'),
twoFactorCode: z.string().length(6).optional(),
}),

enable2FA: z.object({
code: z.string().length(6, 'Код должен содержать 6 цифр'),
}),
}
2.6 Создать src/middleware/rateLimiter.ts:
typescriptimport rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { redis } from '../config/redis'

// КОММЕНТАРИЙ: Rate limiter для защиты от брутфорса
export const loginLimiter = rateLimit({
store: new RedisStore({
client: redis,
prefix: 'rl:login:',
}),
windowMs: 15 _ 60 _ 1000, // 15 минут
max: 5, // Максимум 5 попыток
message: 'Слишком много попыток входа. Попробуйте через 15 минут.',
standardHeaders: true,
legacyHeaders: false,
})

// КОММЕНТАРИЙ: Rate limiter для API запросов
export const apiLimiter = rateLimit({
store: new RedisStore({
client: redis,
prefix: 'rl:api:',
}),
windowMs: 15 _ 60 _ 1000, // 15 минут
max: 100, // Максимум 100 запросов
message: 'Слишком много запросов. Попробуйте позже.',
standardHeaders: true,
legacyHeaders: false,
})

// КОММЕНТАРИЙ: Rate limiter для spin (барабан)
export const spinLimiter = rateLimit({
store: new RedisStore({
client: redis,
prefix: 'rl:spin:',
}),
windowMs: 60 \* 1000, // 1 минута
max: 10, // Максимум 10 спинов в минуту (защита от злоупотребления)
message: 'Слишком много спинов. Подождите минуту.',
standardHeaders: true,
legacyHeaders: false,
})
День 6: Routes для аутентификации
2.7 Создать src/routes/auth.ts:
typescriptimport { Router } from 'express'
import AuthService from '../services/auth/AuthService'
import TwoFactorService from '../services/auth/TwoFactorService'
import { validate, schemas } from '../middleware/validation'
import { authenticateToken } from '../middleware/auth'
import { loginLimiter } from '../middleware/rateLimiter'

const router = Router()

// КОММЕНТАРИЙ: Регистрация нового пользователя
router.post(
'/register',
validate(schemas.register),
async (req, res) => {
try {
const result = await AuthService.register(req.body)
res.status(201).json(result)
} catch (error: any) {
res.status(400).json({ error: error.message })
}
}
)

// КОММЕНТАРИЙ: Вход пользователя (с rate limiting)
router.post(
'/login',
loginLimiter,
validate(schemas.login),
async (req, res) => {
try {
const result = await AuthService.login(req.body)
res.json(result)
} catch (error: any) {
res.status(401).json({ error: error.message })
}
}
)

// КОММЕНТАРИЙ: Обновление access token
router.post('/refresh', async (req, res) => {
try {
const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token обязателен' })
    }

    const result = await AuthService.refreshToken(refreshToken)
    res.json(result)

} catch (error: any) {
res.status(401).json({ error: error.message })
}
})

// КОММЕНТАРИЙ: Выход пользователя
router.post('/logout', authenticateToken, async (req, res) => {
try {
const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token обязателен' })
    }

    await AuthService.logout(refreshToken)
    res.json({ success: true })

} catch (error: any) {
res.status(400).json({ error: error.message })
}
})

// КОММЕНТАРИЙ: Генерация секрета для 2FA
router.post('/2fa/generate', authenticateToken, async (req, res) => {
try {
const userId = req.userId!
const result = await TwoFactorService.generateSecret(userId)
res.json(result)
} catch (error: any) {
res.status(400).json({ error: error.message })
}
})

// КОММЕНТАРИЙ: Включение 2FA
router.post(
'/2fa/enable',
authenticateToken,
validate(schemas.enable2FA),
async (req, res) => {
try {
const userId = req.userId!
const { code } = req.body
const result = await TwoFactorService.enable2FA(userId, code)
res.json(result)
} catch (error: any) {
res.status(400).json({ error: error.message })
}
}
)

// КОММЕНТАРИЙ: Отключение 2FA
router.post(
'/2fa/disable',
authenticateToken,
validate(schemas.enable2FA),
async (req, res) => {
try {
const userId = req.userId!
const { code } = req.body
const result = await TwoFactorService.disable2FA(userId, code)
res.json(result)
} catch (error: any) {
res.status(400).json({ error: error.message })
}
}
)

export default router

ЭТАП 3: WALLET MANAGEMENT (День 7-9)
День 7: Криптографический модуль
3.1 Установить зависимости:
bashnpm install bip39 bip32 ethers bitcoinjs-lib @solana/web3.js tronweb tonweb
npm install tweetnacl tweetnacl-util @scure/bip32 @scure/bip39
3.2 Создать src/services/wallet/KeystoreService.ts:
typescriptimport crypto from 'crypto'

interface EncryptOptions {
algorithm: string
iterations: number
}

export class KeystoreService {
private readonly ALGORITHM = 'aes-256-gcm'
private readonly ITERATIONS = 100000

// КОММЕНТАРИЙ: Шифрование seed phrase с паролем пользователя
async encryptKeystore(
mnemonic: string,
password: string
): Promise<string> {
// Генерация соли (32 байта)
const salt = crypto.randomBytes(32)

    // Деривация ключа из пароля (PBKDF2)
    const key = crypto.pbkdf2Sync(
      password,
      salt,
      this.ITERATIONS,
      32,
      'sha512'
    )

    // Генерация IV (Initialization Vector)
    const iv = crypto.randomBytes(16)

    // Шифрование AES-256-GCM
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv)
    let encrypted = cipher.update(mnemonic, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    // Получение auth tag для проверки целостности
    const authTag = cipher.getAuthTag()

    // Формат: salt:iv:authTag:encrypted
    const result = [
      salt.toString('hex'),
      iv.toString('hex'),
      authTag.toString('hex'),
      encrypted,
    ].join(':')

    return result

}

// КОММЕНТАРИЙ: Расшифровка keystore с паролем
async decryptKeystore(
encryptedData: string,
password: string
): Promise<string> {
try {
// Парсинг зашифрованных данных
const [saltHex, ivHex, authTagHex, encrypted] = encryptedData.split(':')

      const salt = Buffer.from(saltHex, 'hex')
      const iv = Buffer.from(ivHex, 'hex')
      const authTag = Buffer.from(authTagHex, 'hex')

      // Деривация ключа (тот же процесс что при шифровании)
      const key = crypto.pbkdf2Sync(
        password,
        salt,
        this.ITERATIONS,
        32,
        'sha512'
      )

      // Расшифровка
      const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv)
      decipher.setAuthTag(authTag)

      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')

      return decrypted
    } catch (error) {
      throw new Error('Неверный пароль или поврежденные данные')
    }

}

// КОММЕНТАРИЙ: Проверка силы пароля
validatePassword(password: string): {
valid: boolean
errors: string[]
} {
const errors: string[] = []

    if (password.length < 8) {
      errors.push('Пароль должен быть не менее 8 символов')
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну заглавную букву')
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну строчную букву')
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы одну цифру')
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Пароль должен содержать хотя бы один специальный символ')
    }

    return {
      valid: errors.length === 0,
      errors,
    }

}
}

export default new KeystoreService()
3.3 Создать src/services/wallet/DerivationService.ts:
typescriptimport { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39'
import _ as bitcoin from 'bitcoinjs-lib'
import { BIP32Factory } from 'bip32'
import _ as ecc from 'tiny-secp256k1'
import { ethers } from 'ethers'
import { Keypair } from '@solana/web3.js'
import nacl from 'tweetnacl'

// КОММЕНТАРИЙ: Пути деривации по BIP-44
const DERIVATION_PATHS = {
ethereum: "m/44'/60'/0'/0", // EVM chains
bitcoin: "m/84'/0'/0'/0", // Bitcoin (Native SegWit)
solana: "m/44'/501'/0'/0'", // Solana
tron: "m/44'/195'/0'/0", // TRON
ton: "m/44'/607'/0'/0", // TON
}

export class DerivationService {
private bip32 = BIP32Factory(ecc)

// КОММЕНТАРИЙ: Генерация seed phrase (12 или 24 слова)
generateMnemonic(wordCount: 12 | 24 = 12): string {
const strength = wordCount === 12 ? 128 : 256
return generateMnemonic(strength)
}

// КОММЕНТАРИЙ: Валидация seed phrase
validateMnemonic(mnemonic: string): boolean {
return validateMnemonic(mnemonic)
}
/ КОММЕНТАРИЙ: Конвертация mnemonic в seed
mnemonicToSeed(mnemonic: string, passphrase: string = ''): Buffer {
if (!this.validateMnemonic(mnemonic)) {
throw new Error('Невалидная seed phrase')
}
return mnemonicToSeedSync(mnemonic, passphrase)
}

// КОММЕНТАРИЙ: Деривация EVM аккаунта (Ethereum, BSC, Polygon, и т.д.)
deriveEVM(seed: Buffer, index: number = 0): {
address: string
privateKey: string
publicKey: string
} {
const path = `${DERIVATION_PATHS.ethereum}/${index}`
const node = this.bip32.fromSeed(seed)
const child = node.derivePath(path)

    if (!child.privateKey) {
      throw new Error('Не удалось сгенерировать приватный ключ')
    }

    const wallet = new ethers.Wallet(child.privateKey)

    return {
      address: wallet.address,
      privateKey: child.privateKey.toString('hex'),
      publicKey: wallet.publicKey,
    }

}

// КОММЕНТАРИЙ: Деривация Bitcoin аккаунта (Native SegWit - Bech32)
deriveBitcoin(seed: Buffer, index: number = 0): {
address: string
privateKey: string
publicKey: string
} {
const path = `${DERIVATION_PATHS.bitcoin}/${index}`
const node = this.bip32.fromSeed(seed)
const child = node.derivePath(path)

    if (!child.privateKey) {
      throw new Error('Не удалось сгенерировать приватный ключ')
    }

    // Native SegWit (P2WPKH) адрес
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: child.publicKey,
      network: bitcoin.networks.bitcoin,
    })

    if (!address) {
      throw new Error('Не удалось сгенерировать Bitcoin адрес')
    }

    return {
      address,
      privateKey: child.privateKey.toString('hex'),
      publicKey: child.publicKey.toString('hex'),
    }

}

// КОММЕНТАРИЙ: Деривация Solana аккаунта (Ed25519)
deriveSolana(seed: Buffer, index: number = 0): {
address: string
privateKey: Uint8Array
publicKey: string
} {
const path = `${DERIVATION_PATHS.solana}/${index}`
const node = this.bip32.fromSeed(seed)
const child = node.derivePath(path)

    if (!child.privateKey) {
      throw new Error('Не удалось сгенерировать приватный ключ')
    }

    // Solana использует Ed25519, нужно взять первые 32 байта
    const solanaPrivateKey = child.privateKey.slice(0, 32)
    const keypair = Keypair.fromSeed(solanaPrivateKey)

    return {
      address: keypair.publicKey.toBase58(),
      privateKey: keypair.secretKey,
      publicKey: keypair.publicKey.toBase58(),
    }

}

// КОММЕНТАРИЙ: Деривация TRON аккаунта (secp256k1)
deriveTron(seed: Buffer, index: number = 0): {
address: string
privateKey: string
publicKey: string
} {
const path = `${DERIVATION_PATHS.tron}/${index}`
const node = this.bip32.fromSeed(seed)
const child = node.derivePath(path)

    if (!child.privateKey) {
      throw new Error('Не удалось сгенерировать приватный ключ')
    }

    // TRON использует тот же механизм что и Ethereum (secp256k1)
    // но с другим форматом адреса (base58check с префиксом 0x41)
    const wallet = new ethers.Wallet(child.privateKey)

    // Конвертация Ethereum адреса в TRON адрес
    const tronAddress = this.convertEthToTronAddress(wallet.address)

    return {
      address: tronAddress,
      privateKey: child.privateKey.toString('hex'),
      publicKey: wallet.publicKey,
    }

}

// КОММЕНТАРИЙ: Деривация TON аккаунта (Ed25519)
deriveTon(seed: Buffer, index: number = 0): {
address: string
privateKey: Uint8Array
publicKey: string
} {
const path = `${DERIVATION_PATHS.ton}/${index}`
const node = this.bip32.fromSeed(seed)
const child = node.derivePath(path)

    if (!child.privateKey) {
      throw new Error('Не удалось сгенерировать приватный ключ')
    }

    // TON использует Ed25519
    const tonPrivateKey = child.privateKey.slice(0, 32)
    const keyPair = nacl.sign.keyPair.fromSeed(tonPrivateKey)

    // Для TON адреса нужна дополнительная обработка через tonweb
    // Здесь упрощенная версия
    const address = this.generateTonAddress(keyPair.publicKey)

    return {
      address,
      privateKey: keyPair.secretKey,
      publicKey: Buffer.from(keyPair.publicKey).toString('hex'),
    }

}

// КОММЕНТАРИЙ: Вспомогательная функция - конвертация ETH адреса в TRON
private convertEthToTronAddress(ethAddress: string): string {
// Убираем 0x префикс
const addressHex = ethAddress.slice(2)

    // Добавляем TRON префикс (0x41)
    const tronHex = '41' + addressHex

    // TODO: Добавить base58check encoding
    // Для полной реализации нужна библиотека tronweb

    return 'T' + tronHex // Заглушка, в реальности используй tronweb.address.fromHex()

}

// КОММЕНТАРИЙ: Вспомогательная функция - генерация TON адреса
private generateTonAddress(publicKey: Uint8Array): string {
// TODO: Полная реализация через tonweb
// Для упрощения возвращаем base64 от публичного ключа
return Buffer.from(publicKey).toString('base64')
}

// КОММЕНТАРИЙ: Деривация всех аккаунтов из одного seed
deriveAllChains(seed: Buffer): {
ethereum: ReturnType<typeof this.deriveEVM>
bitcoin: ReturnType<typeof this.deriveBitcoin>
solana: ReturnType<typeof this.deriveSolana>
tron: ReturnType<typeof this.deriveTron>
ton: ReturnType<typeof this.deriveTon>
} {
return {
ethereum: this.deriveEVM(seed, 0),
bitcoin: this.deriveBitcoin(seed, 0),
solana: this.deriveSolana(seed, 0),
tron: this.deriveTron(seed, 0),
ton: this.deriveTon(seed, 0),
}
}
}

export default new DerivationService()
День 8: Wallet Service
3.4 Создать src/services/wallet/WalletService.ts:
typescriptimport { pool } from '../../config/database'
import KeystoreService from './KeystoreService'
import DerivationService from './DerivationService'

interface CreateWalletData {
userId: string
password: string
walletName?: string
}

interface ImportWalletData {
userId: string
mnemonic: string
password: string
walletName?: string
}

export class WalletService {
// КОММЕНТАРИЙ: Создание нового кошелька
async createWallet(data: CreateWalletData) {
const { userId, password, walletName = 'Main Wallet' } = data

    try {
      // 1. Генерация seed phrase (12 слов)
      const mnemonic = DerivationService.generateMnemonic(12)

      // 2. Шифрование seed phrase с паролем
      const encryptedKeystore = await KeystoreService.encryptKeystore(
        mnemonic,
        password
      )

      // 3. Конвертация mnemonic в seed
      const seed = DerivationService.mnemonicToSeed(mnemonic)

      // 4. Деривация аккаунтов для всех сетей
      const accounts = DerivationService.deriveAllChains(seed)

      // 5. Начало транзакции в БД
      const client = await pool.connect()

      try {
        await client.query('BEGIN')

        // Создание записи кошелька
        const walletResult = await client.query(
          `INSERT INTO wallets (user_id, name, encrypted_keystore, xpub_evm, xpub_btc)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, created_at`,
          [
            userId,
            walletName,
            encryptedKeystore,
            accounts.ethereum.publicKey, // xpub для EVM
            accounts.bitcoin.publicKey,  // xpub для Bitcoin
          ]
        )

        const wallet = walletResult.rows[0]

        // Создание аккаунтов для каждой сети
        const accountsToCreate = [
          { chain: 'ethereum', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'bsc', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'polygon', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'arbitrum', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'avalanche', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'bitcoin', address: accounts.bitcoin.address, path: "m/84'/0'/0'/0/0" },
          { chain: 'solana', address: accounts.solana.address, path: "m/44'/501'/0'/0/0" },
          { chain: 'tron', address: accounts.tron.address, path: "m/44'/195'/0'/0/0" },
          { chain: 'ton', address: accounts.ton.address, path: "m/44'/607'/0'/0/0" },
        ]

        for (const acc of accountsToCreate) {
          await client.query(
            `INSERT INTO accounts (wallet_id, chain, address, derivation_path)
             VALUES ($1, $2, $3, $4)`,
            [wallet.id, acc.chain, acc.address, acc.path]
          )
        }

        await client.query('COMMIT')

        // 6. Возврат результата (БЕЗ приватных ключей!)
        return {
          wallet: {
            id: wallet.id,
            name: wallet.name,
            createdAt: wallet.created_at,
          },
          mnemonic, // ВАЖНО: Возвращаем только при создании, показываем пользователю ОДИН РАЗ
          accounts: accountsToCreate.map(acc => ({
            chain: acc.chain,
            address: acc.address,
          })),
        }
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error('Ошибка создания кошелька: ' + (error as Error).message)
    }

}

// КОММЕНТАРИЙ: Импорт существующего кошелька по seed phrase
async importWallet(data: ImportWalletData) {
const { userId, mnemonic, password, walletName = 'Imported Wallet' } = data

    try {
      // 1. Валидация seed phrase
      if (!DerivationService.validateMnemonic(mnemonic)) {
        throw new Error('Невалидная seed phrase')
      }

      // 2. Проверка что кошелек с такими адресами еще не существует
      const seed = DerivationService.mnemonicToSeed(mnemonic)
      const accounts = DerivationService.deriveAllChains(seed)

      const existingWallet = await pool.query(
        `SELECT id FROM accounts WHERE address = $1 LIMIT 1`,
        [accounts.ethereum.address]
      )

      if (existingWallet.rows.length > 0) {
        throw new Error('Кошелек с такими адресами уже существует')
      }

      // 3. Шифрование и сохранение (аналогично createWallet)
      const encryptedKeystore = await KeystoreService.encryptKeystore(
        mnemonic,
        password
      )

      const client = await pool.connect()

      try {
        await client.query('BEGIN')

        const walletResult = await client.query(
          `INSERT INTO wallets (user_id, name, encrypted_keystore, xpub_evm, xpub_btc)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, created_at`,
          [
            userId,
            walletName,
            encryptedKeystore,
            accounts.ethereum.publicKey,
            accounts.bitcoin.publicKey,
          ]
        )

        const wallet = walletResult.rows[0]

        const accountsToCreate = [
          { chain: 'ethereum', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'bsc', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'polygon', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'arbitrum', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'avalanche', address: accounts.ethereum.address, path: "m/44'/60'/0'/0/0" },
          { chain: 'bitcoin', address: accounts.bitcoin.address, path: "m/84'/0'/0'/0/0" },
          { chain: 'solana', address: accounts.solana.address, path: "m/44'/501'/0'/0/0" },
          { chain: 'tron', address: accounts.tron.address, path: "m/44'/195'/0'/0/0" },
          { chain: 'ton', address: accounts.ton.address, path: "m/44'/607'/0'/0/0" },
        ]

        for (const acc of accountsToCreate) {
          await client.query(
            `INSERT INTO accounts (wallet_id, chain, address, derivation_path)
             VALUES ($1, $2, $3, $4)`,
            [wallet.id, acc.chain, acc.address, acc.path]
          )
        }

        await client.query('COMMIT')

        return {
          wallet: {
            id: wallet.id,
            name: wallet.name,
            createdAt: wallet.created_at,
          },
          accounts: accountsToCreate.map(acc => ({
            chain: acc.chain,
            address: acc.address,
          })),
        }
      } catch (error) {
        await client.query('ROLLBACK')
        throw error
      } finally {
        client.release()
      }
    } catch (error) {
      throw new Error('Ошибка импорта кошелька: ' + (error as Error).message)
    }

}

// КОММЕНТАРИЙ: Получить все кошельки пользователя
async getUserWallets(userId: string) {
const result = await pool.query(
`SELECT id, name, backup_completed, is_active, created_at
       FROM wallets
       WHERE user_id = $1
       ORDER BY created_at DESC`,
[userId]
)

    return result.rows

}

// КОММЕНТАРИЙ: Получить аккаунты кошелька по сетям
async getWalletAccounts(walletId: string) {
const result = await pool.query(
`SELECT id, chain, address, label, is_active
       FROM accounts
       WHERE wallet_id = $1 AND is_active = true
       ORDER BY chain`,
[walletId]
)

    return result.rows

}

// КОММЕНТАРИЙ: Экспорт seed phrase (требует пароль)
async exportSeedPhrase(walletId: string, password: string) {
try {
// Получить encrypted keystore
const result = await pool.query(
'SELECT encrypted_keystore FROM wallets WHERE id = $1',
[walletId]
)

      if (result.rows.length === 0) {
        throw new Error('Кошелек не найден')
      }

      const encryptedKeystore = result.rows[0].encrypted_keystore

      // Расшифровать
      const mnemonic = await KeystoreService.decryptKeystore(
        encryptedKeystore,
        password
      )

      return { mnemonic }
    } catch (error) {
      throw new Error('Ошибка экспорта: ' + (error as Error).message)
    }

}

// КОММЕНТАРИЙ: Отметить что backup выполнен
async markBackupCompleted(walletId: string) {
await pool.query(
'UPDATE wallets SET backup_completed = true WHERE id = $1',
[walletId]
)
}

// КОММЕНТАРИЙ: Получить приватный ключ для подписи транзакции (временно в памяти)
async getPrivateKeyForSigning(
walletId: string,
chain: string,
password: string
): Promise<string | Uint8Array> {
try {
// Получить encrypted keystore
const walletResult = await pool.query(
'SELECT encrypted_keystore FROM wallets WHERE id = $1',
[walletId]
)

      if (walletResult.rows.length === 0) {
        throw new Error('Кошелек не найден')
      }

      // Расшифровать seed phrase
      const encryptedKeystore = walletResult.rows[0].encrypted_keystore
      const mnemonic = await KeystoreService.decryptKeystore(
        encryptedKeystore,
        password
      )

      // Конвертация в seed
      const seed = DerivationService.mnemonicToSeed(mnemonic)

      // Деривация приватного ключа для конкретной сети
      let privateKey: string | Uint8Array

      switch (chain) {
        case 'ethereum':
        case 'bsc':
        case 'polygon':
        case 'arbitrum':
        case 'avalanche':
          privateKey = DerivationService.deriveEVM(seed, 0).privateKey
          break
        case 'bitcoin':
          privateKey = DerivationService.deriveBitcoin(seed, 0).privateKey
          break
        case 'solana':
          privateKey = DerivationService.deriveSolana(seed, 0).privateKey
          break
        case 'tron':
          privateKey = DerivationService.deriveTron(seed, 0).privateKey
          break
        case 'ton':
          privateKey = DerivationService.deriveTon(seed, 0).privateKey
          break
        default:
          throw new Error('Неподдерживаемая сеть')
      }

      // ВАЖНО: Очистить seed из памяти
      seed.fill(0)

      return privateKey
    } catch (error) {
      throw new Error('Ошибка получения приватного ключа: ' + (error as Error).message)
    }

}
}

export default new WalletService()
День 9: Wallet Routes
3.5 Создать src/routes/wallet.ts:
typescriptimport { Router } from 'express'
import WalletService from '../services/wallet/WalletService'
import { authenticateToken } from '../middleware/auth'
import { validate } from '../middleware/validation'
import { z } from 'zod'

const router = Router()

// КОММЕНТАРИЙ: Схемы валидации
const createWalletSchema = z.object({
password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
walletName: z.string().max(100).optional(),
})

const importWalletSchema = z.object({
mnemonic: z.string().min(1, 'Seed phrase обязательна'),
password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
walletName: z.string().max(100).optional(),
})

const exportSeedSchema = z.object({
password: z.string().min(1, 'Пароль обязателен'),
})

// КОММЕНТАРИЙ: Создание нового кошелька
router.post(
'/create',
authenticateToken,
validate(createWalletSchema),
async (req, res) => {
try {
const userId = req.userId!
const { password, walletName } = req.body

      const result = await WalletService.createWallet({
        userId,
        password,
        walletName,
      })

      res.status(201).json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }

}
)

// КОММЕНТАРИЙ: Импорт существующего кошелька
router.post(
'/import',
authenticateToken,
validate(importWalletSchema),
async (req, res) => {
try {
const userId = req.userId!
const { mnemonic, password, walletName } = req.body

      const result = await WalletService.importWallet({
        userId,
        mnemonic,
        password,
        walletName,
      })

      res.status(201).json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }

}
)

// КОММЕНТАРИЙ: Получить все кошельки пользователя
router.get('/list', authenticateToken, async (req, res) => {
try {
const userId = req.userId!
const wallets = await WalletService.getUserWallets(userId)
res.json({ wallets })
} catch (error: any) {
res.status(500).json({ error: error.message })
}
})

// КОММЕНТАРИЙ: Получить аккаунты кошелька
router.get('/:walletId/accounts', authenticateToken, async (req, res) => {
try {
const { walletId } = req.params
const accounts = await WalletService.getWalletAccounts(walletId)
res.json({ accounts })
} catch (error: any) {
res.status(500).json({ error: error.message })
}
})

// КОММЕНТАРИЙ: Экспорт seed phrase (ОПАСНАЯ ОПЕРАЦИЯ!)
router.post(
'/:walletId/export-seed',
authenticateToken,
validate(exportSeedSchema),
async (req, res) => {
try {
const { walletId } = req.params
const { password } = req.body

      const result = await WalletService.exportSeedPhrase(walletId, password)

      // Логирование критичного действия
      await pool.query(
        `INSERT INTO audit_logs (user_id, action, details)
         VALUES ($1, 'export_seed', $2)`,
        [req.userId, JSON.stringify({ walletId })]
      )

      res.json(result)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }

}
)

// КОММЕНТАРИЙ: Отметить backup как выполненный
router.post('/:walletId/backup-completed', authenticateToken, async (req, res) => {
try {
const { walletId } = req.params
await WalletService.markBackupCompleted(walletId)
res.json({ success: true })
} catch (error: any) {
res.status(400).json({ error: error.message })
}
})

export default router

📊 SESSION REPORT #1 - Этапы 1-3
markdown# Backend Session Report #1

## Дата: [Текущая дата]

## Этапы: 1-3 (День 1-9)

### Что сделано:

#### ЭТАП 1: Инфраструктура (День 1-3)

- [x] Инициализация проекта (Node.js + TypeScript + Express)
- [x] Подключение к PostgreSQL (Supabase)
- [x] Подключение к Redis (Upstash)
- [x] Создание полной SQL схемы (18 таблиц)
- [x] Конфигурация RPC endpoints для всех блокчейнов
- [x] Настройка переменных окружения

#### ЭТАП 2: Authentication (День 4-6)

- [x] AuthService: регистрация, логин, JWT токены
- [x] TwoFactorService: 2FA с TOTP
- [x] Middleware: authenticateToken, rateLimiter
- [x] Валидация данных через Zod
- [x] Rate limiting для защиты от брутфорса
- [x] Routes: /auth/register, /login, /2fa/\*

#### ЭТАП 3: Wallet Management (День 7-9)

- [x] KeystoreService: шифрование AES-256-GCM
- [x] DerivationService: BIP-39/44 для всех сетей
- [x] WalletService: create, import, export
- [x] Поддержка 9 блокчейнов (EVM, Bitcoin, Solana, TRON, TON)
- [x] Routes: /wallet/create, /import, /list

### Файлы созданы:

```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts ✅
│   │   ├── redis.ts ✅
│   │   └── chains.ts ✅
│   ├── services/
│   │   ├── auth/
│   │   │   ├── AuthService.ts ✅
│   │   │   └── TwoFactorService.ts ✅
│   │   └── wallet/
│   │       ├── KeystoreService.ts ✅
│   │       ├── DerivationService.ts ✅
│   │       └── WalletService.ts ✅
│   ├── middleware/
│   │   ├── auth.ts ✅
│   │   ├── validation.ts ✅
│   │   └── rateLimiter.ts ✅
│   ├── routes/
│   │   ├── auth.ts ✅
│   │   └── wallet.ts ✅
│   └── types/
│       └── index.ts ✅
├── .env.example ✅
├── package.json ✅
└── tsconfig.json ✅
```

### Проблемы и решения:

**Проблема 1:** TRON и TON адреса требуют дополнительную обработку
**Решение:** Добавлены заглушки с TODO, полная реализация в следующих этапах

**Проблема 2:** Приватные ключи в памяти - риск безопасности
**Решение:** Очистка буферов после использования (buffer.fill(0))

### Тесты:

✅ AuthService: регистрация работает
✅ AuthService: логин с 2FA работает
✅ KeystoreService: шифрование/расшифровка работает
✅ DerivationService: генерация адресов для EVM работает
⚠️ DerivationService: TRON/TON требуют доработки

### Следующие шаги:

**ЭТАП 4 (День 10-15): Blockchain Integration**

- EVMService: отправка транзакций, баланс, gas estimation
- SolanaService: SOL и SPL токены
- BitcoinService: UTXO транзакции
- TronService: TRX и TRC-20
- TonService: TON и Jettons

**ЭТАП 5 (День 16-18): Spin Wheel**

- SpinService: weighted random
- PrizeService: выдача наград
- NFT Skins система

**ЭТАП 6 (День 19-23): P2P Marketplace**

- EscrowService: смарт-контракты
- TradeChat: real-time messaging
- DisputeService: разрешение споров

### Запуск для тестирования:

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Тестовые запросы
# POST http://localhost:3000/api/auth/register
# POST http://localhost:3000/api/wallet/create
```

### Безопасность:

✅ Пароли хешируются bcrypt (12 rounds)
✅ JWT токены с коротким TTL (15 мин)
✅ Refresh tokens в БД
✅ Seed phrases шифруются AES-256-GCM
✅ Rate limiting на всех endpoints
✅ 2FA support
✅ Audit logs для критичных действий

### Метрики:

- Строк кода: ~2,500
- Таблиц в БД: 18
- API endpoints: 12
- Поддерживаемых сетей: 9
- Время разработки: 9 дней
