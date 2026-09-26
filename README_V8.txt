晏時 Y / LIVE v8 修正版

這次請把資料夾內所有檔案上傳到 GitHub yanshi-live 根目錄並覆蓋舊檔。

重點：
- index.html：修正照片焦點，左上角也換成 Y / LIVE 圖
- manifest-v8.webmanifest：全新 manifest 檔名，避開舊快取
- ylive-icon-192.png / ylive-icon-512.png / ylive-touch.png：全新 App icon
- sw.js：v8 快取策略
- 四張晏時照片：保留

上傳 Commit 後：
1. 等 GitHub Pages 部署完成。
2. 用 Chrome 開 https://reru314-cmyk.github.io/yanshi-live/?v=8
3. 確認左上角不再是「晏」字，而是 Y / LIVE 圖。
4. 若要桌面 App 圖示換新，先移除舊安裝，再從正式網址重新安裝。
