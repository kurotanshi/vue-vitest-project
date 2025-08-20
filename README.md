# vue-vitest-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## GitHub Actions CI/CD

本專案已配置 GitHub Actions 自動化測試流程，當您建立或更新 Pull Request 時會自動執行測試。

### 工作流程配置

工作流程檔案位於 `.github/workflows/test.yml`，包含以下測試步驟：

1. **程式碼檢查 (Linting)** - 檢查程式碼風格和品質
2. **型別檢查 (Type Checking)** - 驗證 TypeScript 型別正確性
3. **單元測試 (Unit Testing)** - 執行所有測試案例
4. **測試覆蓋率 (Coverage Report)** - 產生測試覆蓋率報告

### 觸發條件

GitHub Actions 會在以下情況自動執行：

- 建立 Pull Request 到 `main`、`master` 或 `develop` 分支
- 推送程式碼到 `main`、`master` 或 `develop` 分支

### 測試環境

- **Node.js 版本**：18.x 和 20.x（矩陣測試）
- **作業系統**：Ubuntu Latest
- **套件管理**：npm（使用 `npm ci` 確保一致性）

### 使用方式

1. **建立功能分支**
   ```sh
   git checkout -b feature/your-feature-name
   ```

2. **開發並提交變更**
   ```sh
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

3. **建立 Pull Request**
   - 前往 GitHub repository
   - 點擊 "New pull request"
   - 選擇您的功能分支
   - GitHub Actions 會自動開始執行測試

4. **查看測試結果**
   - 在 Pull Request 頁面可以看到測試狀態
   - 點擊 "Details" 查看詳細的測試日誌
   - 所有測試通過後才能合併 PR

### 本地預先測試

在推送程式碼前，建議先在本地執行以下指令確保測試通過：

```sh
npm run lint         # 程式碼檢查
npm run type-check   # 型別檢查
npm run test:unit    # 單元測試
```

### 分支保護建議

為確保程式碼品質，建議在 GitHub 設定分支保護規則：

1. 前往 Settings → Branches
2. 新增規則保護 `main` 分支
3. 勾選以下選項：
   - Require a pull request before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - 選擇 "test" 作為必要的狀態檢查

### 測試覆蓋率（選用）

如需追蹤測試覆蓋率，可以整合 Codecov：

1. 前往 [Codecov](https://codecov.io/) 並連結您的 GitHub repository
2. 工作流程已配置上傳覆蓋率報告到 Codecov
3. 在 PR 中會自動顯示覆蓋率變化
