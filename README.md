# Excel 圖表白板

由 [Vue(3.5.22)](https://vuejs.org/) 所構建，使用官方預設編譯器 [Vite](https://vitejs.dev/) 開發。

## Demo 檔案

可於 [public](https://github.com/Oboro1102/excel-flowboard/blob/main/public/) 中下載。

## Nodejs 版本

v24.11.1

## 技術列表

- [Vue](https://vuejs.org/) - Vue 是漸進式 JavaScript 框架。
- [Vue Router](https://router.vuejs.org/zh/) - Vue 的路由管理器。
- [VueUse](https://vueuse.org/) - Vue 泛用 Composition 函式庫。
- [VueFlow](https://vueflow.dev/) - 客制、高互動性的 Vue 3 流程圖元件。
- [primevue](https://primevue.org/vite/) - Vue 前端 UI 元件庫。
- [pinia](https://pinia.vuejs.org/zh/) - Vue 的狀態管理庫。
- [axios-cache-interceptor](https://axios-cache-interceptor.js.org/) - Axios 與緩存管理插件。
- [tailwindcss](https://tailwindcss.com/) - Utility 式 CSS 庫。
- [bootstrap-icons](https://icons.getbootstrap.com/) - 由 Bootstrap 提供的 svg icon 庫。
- [apexcharts](https://apexcharts.com/) - 圖表繪製套件。
- [crypto-js](https://github.com/brix/crypto-js) - 加密函式庫。
- [msw](https://mswjs.io/) - API模擬函式庫。

## 專案結構

基本上遵循 Vue + Vite 的預設開發結構：

- public/\* - 你的非程式碼、未處理的資源。
- src/\* - 你的專案原始碼。
- `api` - 全站使用的 API 封裝集結。
- `assets` - 全站使用靜態資源。
- `components` - 共用元件。
- `layout` - 共用模板。
- `mocks` - 模擬後端回應 API 呼叫使用。
- `router` - 全站路由管理。
- `stores` - 全站及共用元件狀態管理。
- `utils` - 通用函式、套件設定檔、型別及正則...等封裝集結。
- `views` - 「頁面」檔案。
- package.json - 專案使用套件列表。
- vite.config.ts - vite 設定檔。
- tsconfig.app.json - typescript 設定檔。

## 專案依賴套件安裝

```sh
pnpm install
```

### 開發模式

```sh
pnpm dev
```

進入 localhost:5173 即可預覽輸出結果。

### 打包

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
