# Vue 3 + Vitest 專案模板

![CI Status](https://github.com/newfom/vue-vitest-project/actions/workflows/test.yml/badge.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)
![Vue Version](https://img.shields.io/badge/vue-3.5.18-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

一個現代化的 Vue 3 專案模板，整合了 Vitest 測試框架和 GitHub Actions CI/CD 流程。

## ✨ 特色功能

- ⚡️ **Vue 3.5** - 使用最新的 Composition API
- 🚀 **Vite** - 極速的開發建構工具
- 🦾 **TypeScript** - 完整的型別支援
- 🧪 **Vitest** - 由 Vite 驅動的單元測試框架
- 📦 **Pinia** - 官方推薦的狀態管理解決方案
- 🛣️ **Vue Router** - 官方路由管理器
- 🎨 **ESLint + Prettier** - 程式碼品質與格式化工具
- 🤖 **GitHub Actions** - 自動化 CI/CD 流程
- 📊 **測試覆蓋率** - 整合 @vitest/coverage-v8

## 📋 系統需求

- Node.js >= 20.0.0
- npm >= 10.0.0

## 🚀 快速開始

### 1. 複製專案

```bash
git clone https://github.com/kurotanshi/vue-vitest-project.git
cd vue-vitest-project
```

### 2. 安裝依賴

```bash
npm install
```

### 3. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 http://localhost:5173

## 📝 可用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 建構生產版本 |
| `npm run preview` | 預覽生產版本 |
| `npm run test:unit` | 執行單元測試（監視模式） |
| `npm run test:unit:ci` | 執行單元測試（CI 模式） |
| `npm run lint` | 執行 ESLint 檢查 |
| `npm run lint:fix` | 執行 ESLint 並自動修復 |
| `npm run type-check` | 執行 TypeScript 型別檢查 |
| `npm run format` | 使用 Prettier 格式化程式碼 |

## 🏗️ 專案結構

```
vue-vitest-project/
├── .github/
│   └── workflows/
│       └── test.yml          # GitHub Actions 設定
├── docs/
│   └── github-actions-tutorial.md  # CI/CD 詳細教學
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/              # 靜態資源
│   ├── components/          # Vue 元件
│   │   ├── BaseCounter.vue  # 範例元件
│   │   └── __tests__/       # 元件測試
│   ├── router/              # 路由設定
│   ├── stores/              # Pinia 狀態管理
│   ├── views/               # 頁面元件
│   ├── App.vue              # 根元件
│   └── main.ts              # 應用程式入口
├── .eslintrc.config.ts      # ESLint 設定
├── .prettierrc.json         # Prettier 設定
├── package.json             # 專案設定
├── tsconfig.json            # TypeScript 設定
├── vite.config.ts           # Vite 設定
└── vitest.config.ts         # Vitest 設定
```

## 🧪 測試

### 執行測試

```bash
# 監視模式（開發時使用）
npm run test:unit

# 單次執行（CI 使用）
npm run test:unit:ci

# 產生覆蓋率報告
npm run test:unit:ci -- --coverage
```

### 撰寫測試

測試檔案位於 `src/components/__tests__/` 目錄。範例：

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCounter from '../BaseCounter.vue'

describe('BaseCounter', () => {
  it('increments count when button is clicked', async () => {
    const wrapper = mount(BaseCounter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('1')
  })
})
```

## 🤖 GitHub Actions CI/CD

本專案已配置自動化測試流程，會在以下情況觸發：

- 建立或更新 Pull Request
- 推送到 `main` 分支

### CI 流程包含

1. ✅ ESLint 程式碼檢查
2. ✅ TypeScript 型別檢查  
3. ✅ Vitest 單元測試

### 查看 CI 狀態

- 在 Pull Request 頁面查看測試狀態
- 點擊 Actions 標籤查看所有工作流程
- 詳細設定請參考 [GitHub Actions 教學文件](./docs/github-actions-tutorial.md)

## 🛠️ IDE 設定

### 推薦的 VSCode 擴充套件

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 官方支援
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) - TypeScript 支援
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 程式碼檢查
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 程式碼格式化
- [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) - 測試瀏覽器

### 設定檔

專案已包含 `.vscode/extensions.json`，開啟專案時 VSCode 會自動推薦安裝擴充套件。

## 📚 相關文件

- [Vue 3 文件](https://vuejs.org/)
- [Vite 文件](https://vite.dev/)
- [Vitest 文件](https://vitest.dev/)
- [Pinia 文件](https://pinia.vuejs.org/)
- [Vue Router 文件](https://router.vuejs.org/)
- [GitHub Actions 文件](https://docs.github.com/en/actions)

## 🔧 疑難排解

### 常見問題

**問題：測試在 CI 環境中失敗**
- 確保使用 `npm run test:unit:ci` 而非 `npm run test:unit`
- 檢查 Node.js 版本是否 >= 20.0.0

**問題：ESLint 錯誤**
- 執行 `npm run lint:fix` 自動修復
- 確保編輯器已安裝 ESLint 擴充套件

**問題：TypeScript 錯誤**
- 執行 `npm run type-check` 查看詳細錯誤
- 確保 VSCode 使用專案的 TypeScript 版本

更多問題解決方案請參考 [GitHub Actions 教學文件](./docs/github-actions-tutorial.md)

## 🤝 貢獻指南

1. Fork 此專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 建立 Pull Request

### Commit 規範

請遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

- `feat:` 新功能
- `fix:` 錯誤修復
- `docs:` 文件更新
- `style:` 程式碼風格調整
- `refactor:` 重構
- `test:` 測試相關
- `chore:` 建構工具或輔助工具的變動

## 📄 授權

MIT License - 詳見 [LICENSE](LICENSE) 檔案

## 👥 作者

- GitHub: [@kurotanshi](https://github.com/kurotanshi)

## ⭐ 支援專案

如果這個專案對你有幫助，請給它一個 ⭐️！

---

Built with ❤️ using Vue 3 + Vite + Vitest