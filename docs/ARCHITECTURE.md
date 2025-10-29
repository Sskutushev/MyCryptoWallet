# Архитектура DexSafe Wallet Pro

## Обзор

DexSafe Wallet Pro построен по принципу **Adaptive Modular Backend (АМБ)** с **Sidecar UPA Engine**.

## Компоненты системы

### 1. Frontend (React)
- **Презентационный слой** - UI компоненты
- **Бизнес-логика** - Hooks, Stores
- **Web3 слой** - Взаимодействие с блокчейнами

### 2. UPA Engine (Sidecar Service)
- **Address Analyzer** - определение типа адреса
- **Transaction Router** - выбор оптимального маршрута
- **Gas Abstraction** - расчет и оплата комиссий

### 3. Blockchain Layer
- **X1 EcoChain** - основная сеть (приоритет)
- **EVM Chains** - Ethereum, BSC, Polygon, Arbitrum
- **Smart Contracts** - Lending, DEX, Bridge

## Потоки данных

### Отправка токенов (UPA Flow):
```
User Input → Address Analyzer → Transaction Router → Gas Abstraction → Blockchain
```

### Кредитование:
```
Collateral Lock → LTV Calculation → Borrow Request → Smart Contract → Fund Transfer
```

## Безопасность

- **Некастодиальность**: Приватные ключи только на устройстве пользователя
- **Шифрование**: AES-256 для хранения
- **Биометрия**: Face ID / Touch ID
- **Transaction Validation**: Проверка адресов на фишинг

## Масштабируемость

- **Multi-chain**: Легкое добавление новых сетей
- **Modular**: Независимые модули (Lending, ЦФА, P2P)
- **Lazy Loading**: Динамическая загрузка модулей