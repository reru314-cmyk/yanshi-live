晏時｜Y / LIVE v10 — GitHub LIVE 狀態讀取

本次只需覆蓋 / 新增三個檔案：
- index.html
- sw.js
- live-state.json

功能：
1. 首頁新增 STORY NOW / 當前劇情
2. 新增 LAST BEAT / 最後一拍
3. App 開啟時自動讀 live-state.json
4. 每 30 秒重新抓一次
5. live-state.json 不走 Service Worker 快取

之後只要 live-state.json 被更新，小手機最多約 30 秒會跟著刷新。

注意：
GitHub repository 目前是 Public，所以 live-state.json 只能放「可以公開的簡短狀態」。
完整私人接續仍留在 Google Doc《晏時｜LIVE 私人狀態》。
