# Echo Sprout: Ten Tiny Worlds

《回聲芽：十個小世界》是一款原創 2D 橫向卷軸平台遊戲，使用 TypeScript + Phaser 3 + Vite + Electron 製作。

> 本專案僅使用程式繪製圖形與 WebAudio 音效，不依賴外部版權素材。

## Features

- 原創角色與世界觀（小芽 Echo Sprout）
- 10 個可解鎖關卡
- 收集物、敵人、移動平台、陷阱、檢查點
- 本機存檔（關卡解鎖、最佳收集紀錄）
- 可打包成 Windows 安裝程式（NSIS）

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`：啟動 Vite 開發伺服器（預設 http://localhost:5173）
- `npm run build`：編譯前端
- `npm run build:electron`：編譯 Electron 主程序
- `npm run dist:win`：輸出 Windows 安裝包（`release/`）
- `npm run lint`：執行 ESLint
- `npm run format`：執行 Prettier

## Play Controls

- 移動：`← →` 或 `A D`
- 跳躍：`↑` 或 `W`
- 返回關卡選單：`ESC`

## Packaging Notes

在 Windows 上執行：

```bash
npm install
npm run dist:win
```

安裝包會輸出到 `release/` 目錄。
