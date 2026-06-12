# micro-front-main-shell

Главная точка входа пользователя в микрофронтенд-архитектуре. Host-приложение на Angular с Native Module Federation.

## Стек

- Angular 19 (standalone components)
- Angular Material
- Native Federation (`@angular-architects/native-federation`)
- Signals для глобального состояния
- SCSS + CSS Grid (`grid-template-areas`)
- ESLint + Prettier

## Быстрый старт

```bash
npm install
npm start
```

Приложение: http://localhost:4200

## Скрипты

| Команда                | Описание                  |
| ---------------------- | ------------------------- |
| `npm start`            | Dev-сервер                |
| `npm run build`        | Production-сборка         |
| `npm test`             | Unit-тесты (Karma)        |
| `npm run lint`         | ESLint                    |
| `npm run lint:fix`     | ESLint с автоисправлением |
| `npm run format`       | Prettier                  |
| `npm run format:check` | Проверка форматирования   |

## Структура

```
src/app/
├── core/
│   ├── interceptors/   # auth, error, loading
│   ├── layout/         # header, footer, navigation, main-layout
│   └── services/       # AppStateService (signals)
├── shared/
│   └── types/          # общие типы API
├── features/
│   ├── home/
│   └── security/       # смена пароля
└── app.routes.ts
```

## Module Federation

Host регистрирует remote-точки в `src/environments/environment.ts`:

```typescript
remoteEntries: {
  cloudberry: 'http://localhost:4201/remoteEntry.json',
}
```

Инициализация — в `src/main.ts` через `initFederation()`.

### Cloudberry (remote)

Remote-приложение: [`micro-front-cloudberry`](../micro-front-cloudberry) — FinOps SPA.

```bash
# Терминал 1 — remote (порт 4201)
cd ../micro-front-cloudberry && npm start

# Терминал 2 — host (порт 4200)
npm start
```

Маршрут в shell: `/cloudberry/dashboard` (и остальные страницы Cloudberry под `/cloudberry/*`).

## Окружения

| Файл                                   | Назначение |
| -------------------------------------- | ---------- |
| `src/environments/environment.ts`      | local/dev  |
| `src/environments/environment.prod.ts` | production |

## Безопасность

- Секреты не хранятся в репозитории (`.env` в `.gitignore`)
- Шаблон переменных: `.env.example`
- Проверка зависимостей: `npm audit`

## CI

GitHub Actions (`.github/workflows/ci.yml`): lint → format check → test → build.

## Домен приложения

Shell-приложение объединяет:

- общий layout (шапка, навигация, контент, подвал)
- локальные фичи (security — смена пароля)
- remote micro frontends через Module Federation
