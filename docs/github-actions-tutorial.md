# GitHub Actions 自動化測試教學

本文件說明如何設定 GitHub Actions 來自動執行 Vue.js 專案的測試流程。

## 📋 目錄

- [概述](#概述)
- [檔案結構](#檔案結構)
- [設定詳解](#設定詳解)
- [工作流程說明](#工作流程說明)
- [常見問題與解決方案](#常見問題與解決方案)
- [最佳實踐](#最佳實踐)

## 概述

GitHub Actions 是 GitHub 提供的 CI/CD 服務，可以在程式碼推送或 PR 時自動執行測試、建構和部署等任務。我們的設定會在每次推送或 PR 時自動執行：

- ✅ ESLint 程式碼品質檢查
- ✅ TypeScript 型別檢查
- ✅ Vitest 單元測試

## 檔案結構

```
.github/
└── workflows/
    └── test.yml    # GitHub Actions 工作流程設定檔
```

## 設定詳解

### 完整的 test.yml 設定檔

```yaml
name: Run Tests

# 觸發條件
on:
  pull_request:
    branches: [ main, master, develop ]
  push:
    branches: [ main, master, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    # 環境變數設定
    env:
      CI: true
      NODE_ENV: test
    
    # 測試策略
    strategy:
      matrix:
        node-version: [20.x]
    
    steps:
    # 步驟 1: 檢出程式碼
    - name: Checkout code
      uses: actions/checkout@v4
    
    # 步驟 2: 設定 Node.js 環境
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'  # 快取 npm 依賴以加速安裝
    
    # 步驟 3: 顯示環境資訊（用於除錯）
    - name: Check Node and npm versions
      run: |
        node --version
        npm --version
    
    # 步驟 4: 安裝依賴套件
    - name: Install dependencies
      run: |
        echo "Installing dependencies..."
        npm ci  # 使用 ci 而非 install 確保版本一致性
    
    # 步驟 5: 列出已安裝套件（用於除錯）
    - name: List installed packages
      run: |
        echo "Installed packages:"
        npm list --depth=0
    
    # 步驟 6: 執行 ESLint 檢查
    - name: Run linter
      run: |
        echo "Running ESLint..."
        npm run lint || exit 1
    
    # 步驟 7: 執行 TypeScript 型別檢查
    - name: Run type check
      run: |
        echo "Running TypeScript type check..."
        npm run type-check || exit 1
    
    # 步驟 8: 執行單元測試
    - name: Run unit tests
      run: |
        echo "Running unit tests..."
        npm run test:unit:ci || exit 1
```

## 工作流程說明

### 1. 觸發條件 (on)

```yaml
on:
  pull_request:
    branches: [ main, master, develop ]
  push:
    branches: [ main, master, develop ]
```

- **pull_request**: 當有 PR 建立或更新時觸發
- **push**: 當推送到指定分支時觸發
- **branches**: 指定要監控的分支

### 2. 環境設定 (env)

```yaml
env:
  CI: true
  NODE_ENV: test
```

- **CI: true**: 告訴工具目前在 CI 環境中執行
- **NODE_ENV: test**: 設定為測試環境，影響 Vite 和其他工具的行為

### 3. 測試策略 (strategy)

```yaml
strategy:
  matrix:
    node-version: [20.x]
```

- 使用矩陣策略可以同時測試多個 Node.js 版本
- 目前只使用 Node.js 20.x 以確保穩定性

### 4. 執行步驟 (steps)

每個步驟都有明確的功能：

| 步驟 | 說明 | 關鍵指令 |
|------|------|----------|
| Checkout code | 取得程式碼 | `actions/checkout@v4` |
| Setup Node.js | 安裝 Node.js | `actions/setup-node@v4` |
| Install dependencies | 安裝套件 | `npm ci` |
| Run linter | 程式碼檢查 | `npm run lint` |
| Run type check | 型別檢查 | `npm run type-check` |
| Run unit tests | 單元測試 | `npm run test:unit:ci` |

## 常見問題與解決方案

### 問題 1: 測試在 CI 環境中卡住

**原因**: Vitest 預設以監視模式執行

**解決方案**: 建立專門的 CI 測試指令

```json
// package.json
{
  "scripts": {
    "test:unit": "vitest",          // 本地開發用（監視模式）
    "test:unit:ci": "vitest run"    // CI 用（單次執行）
  }
}
```

### 問題 2: Node.js 版本相容性問題

**原因**: 某些套件可能需要特定 Node.js 版本

**解決方案**: 在 package.json 中明確指定版本需求

```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### 問題 3: ESLint 在 CI 中失敗

**原因**: `--fix` 參數會修改檔案，CI 環境應該只檢查

**解決方案**: 分離本地和 CI 的 lint 指令

```json
{
  "scripts": {
    "lint": "eslint .",           // CI 用（只檢查）
    "lint:fix": "eslint . --fix"  // 本地用（自動修復）
  }
}
```

### 問題 4: 快取問題

**症狀**: 即使 package.json 更新了，CI 還是使用舊版套件

**解決方案**: 
- 使用 `npm ci` 而非 `npm install`
- 清除 GitHub Actions 快取（Settings → Actions → Caches）

## 最佳實踐

### 1. 使用明確的錯誤處理

```yaml
- name: Run tests
  run: npm run test || exit 1  # 確保錯誤被正確報告
```

### 2. 加入除錯資訊

```yaml
- name: Check environment
  run: |
    echo "Node version: $(node --version)"
    echo "NPM version: $(npm --version)"
    echo "Working directory: $(pwd)"
```

### 3. 使用環境變數控制行為

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    vue(),
    // 只在開發環境載入開發工具
    process.env.NODE_ENV === 'development' ? vueDevTools() : undefined,
  ].filter(Boolean)
})
```

### 4. 分離設定檔

保持 `vite.config.ts` 和 `vitest.config.ts` 分離，避免設定衝突：

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    // 測試專用設定
  }
})
```

### 5. 優化 CI 執行速度

- 使用 `npm ci` 而非 `npm install`
- 啟用 npm 快取：`cache: 'npm'`
- 只安裝生產依賴（如果可能）
- 考慮並行執行測試

## 進階設定

### 加入測試覆蓋率報告

```yaml
- name: Generate coverage report
  run: npm run test:unit:ci -- --coverage
  
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

### 設定分支保護規則

1. 前往 GitHub repository → Settings → Branches
2. 新增規則保護 `main` 分支
3. 勾選 "Require status checks to pass before merging"
4. 選擇 "test" 作為必要檢查

### 加入建構步驟

```yaml
- name: Build project
  run: npm run build
  
- name: Upload build artifacts
  uses: actions/upload-artifact@v3
  with:
    name: dist
    path: dist/
```

## 除錯技巧

### 1. 啟用詳細日誌

```yaml
- name: Run tests with verbose output
  run: npm run test:unit:ci -- --reporter=verbose
```

### 2. 保存失敗時的日誌

```yaml
- name: Upload logs on failure
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: error-logs
    path: |
      npm-debug.log
      yarn-error.log
```

### 3. 使用 SSH 進行除錯

在複雜問題時，可以使用 [action-tmate](https://github.com/mxschmitt/action-tmate) 進行遠端除錯：

```yaml
- name: Setup tmate session
  if: ${{ failure() }}
  uses: mxschmitt/action-tmate@v3
```

## 總結

正確設定的 GitHub Actions 可以：

- 🚀 自動化測試流程，減少人工錯誤
- 📊 提供即時的程式碼品質回饋
- 🛡️ 保護主要分支免受有問題的程式碼影響
- 👥 提升團隊協作效率

遵循本文件的設定和最佳實踐，可以建立一個穩定、高效的 CI/CD 流程。

## 相關資源

- [GitHub Actions 官方文件](https://docs.github.com/en/actions)
- [Vitest 官方文件](https://vitest.dev/)
- [Vue.js 測試指南](https://vuejs.org/guide/scaling-up/testing.html)
- [npm ci vs npm install](https://docs.npmjs.com/cli/v8/commands/npm-ci)

---

最後更新：2024年8月