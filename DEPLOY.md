# 🚀 GitHub Actions 部署指南

本專案使用 GitHub Actions 自動部署到 GitHub Pages。

## 📋 部署步驟

### 1. 準備 GitHub 倉庫

1. 在 GitHub 創建一個新的倉庫（如果還沒有）
2. 將本地代碼推送到 GitHub：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/你的倉庫名.git
git push -u origin main
```

### 2. 啟用 GitHub Pages

1. 進入倉庫的 **Settings**（設定）
2. 點擊左側的 **Pages**（頁面）
3. 在 **Source**（來源）選擇：
   - **Source**: `GitHub Actions`
4. 保存設定

### 3. 觸發部署

部署會在以下情況自動觸發：
- 推送到 `main` 或 `master` 分支
- 手動觸發（在 Actions 頁面點擊 "Run workflow"）

### 4. 查看部署狀態

1. 進入倉庫的 **Actions**（操作）標籤
2. 查看 "Deploy to GitHub Pages" 工作流程
3. 等待部署完成（通常需要 1-2 分鐘）

### 5. 訪問應用

部署完成後，應用會自動發布到：
```
https://你的用戶名.github.io/你的倉庫名/
```

例如：`https://username.github.io/Scoring-App/`

## ⚙️ 配置說明

### 更新倉庫名稱

如果倉庫名稱不是 "Scoring-App"，需要更新 `.github/workflows/deploy.yml` 中的 `BASE_URL`：

```yaml
BASE_URL: /你的倉庫名/
```

或者更新 `vite.config.js` 中的 `base` 配置。

### 自定義域名（可選）

如果想使用自定義域名：

1. 在倉庫根目錄創建 `CNAME` 文件
2. 內容寫入你的域名，例如：`scoring.yourdomain.com`
3. 在域名 DNS 設定中添加 CNAME 記錄指向 `你的用戶名.github.io`

## 🔧 故障排除

### 部署失敗

1. 檢查 Actions 頁面的錯誤訊息
2. 確認 Node.js 版本兼容（使用 18.x）
3. 檢查 `package.json` 中的依賴是否正確

### 頁面顯示 404

1. 確認 GitHub Pages 設定中 Source 選擇了 "GitHub Actions"
2. 檢查 `vite.config.js` 中的 `base` 路徑是否正確
3. 確認倉庫名稱與 base 路徑匹配

### 資源載入失敗

如果 CSS 或 JS 文件無法載入，通常是 `base` 路徑配置問題。確保：
- 倉庫名稱與 base 路徑一致
- base 路徑以 `/` 開頭和結尾

## 📱 使用方式

部署完成後，任何人都可以通過手機瀏覽器訪問應用網址，無需安裝任何應用程式。

## 🔄 更新應用

每次推送代碼到 main 分支時，GitHub Actions 會自動重新部署：

```bash
git add .
git commit -m "更新說明"
git push
```

部署通常需要 1-2 分鐘完成。

