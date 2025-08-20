# Vue 3.5 + Vitest + GitHub Actions 設定完成

## 專案結構
- Vue 3.5 專案已建立在 `vue-vitest-project/` 資料夾
- 包含 TypeScript、Vue Router、Pinia、Vitest、ESLint 和 Prettier

## 測試設定
- **Vitest** 已配置完成
- 建立了範例元件 `BaseCounter.vue` 和對應的單元測試
- 測試檔案位於 `src/components/__tests__/`

## GitHub Actions 設定
- 工作流程檔案：`.github/workflows/test.yml`
- 觸發條件：當 PR 建立或更新時自動執行
- 測試內容：
  - Linting (程式碼風格檢查)
  - Type checking (型別檢查)
  - Unit tests (單元測試)
  - Coverage report (測試覆蓋率報告)

## 使用方式

### 本地開發
```bash
cd vue-vitest-project
npm run dev          # 啟動開發伺服器
npm run test:unit    # 執行單元測試
npm run lint         # 執行程式碼檢查
npm run type-check   # 執行型別檢查
```

### GitHub 整合
1. 初始化 Git repository：
   ```bash
   cd vue-vitest-project
   git init
   git add .
   git commit -m "Initial commit with Vue 3.5 and Vitest setup"
   ```

2. 連結到 GitHub repository：
   ```bash
   git remote add origin https://github.com/你的帳號/你的專案.git
   git branch -M main
   git push -u origin main
   ```

3. 當你建立 Pull Request 時，GitHub Actions 會自動執行測試

## 測試策略
- 使用 Node.js 18.x 和 20.x 進行矩陣測試
- 自動產生測試覆蓋率報告
- 可選：整合 Codecov 進行覆蓋率追蹤

## 下一步
1. 將專案推送到 GitHub
2. 在 GitHub 上設定分支保護規則，要求 PR 必須通過測試
3. 開始開發你的 Vue 應用程式！