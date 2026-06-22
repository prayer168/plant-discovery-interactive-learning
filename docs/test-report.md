# 測試報告：植物大發現

- 版本：v1.0.0
- 日期：2026-06-22
- 測試環境：本機 C 槽工作副本（`C:\dev\plant-discovery-interactive-learning`），Vite 8.0.16

## 自動驗證

執行 `python <skill>/scripts/verify.py --project .`：**全部通過**。
`npm run build`：**通過**（11 modules，built in ~185ms，dist 正常輸出）。

- [x] 必要檔案齊全、所有 JSON 可解析
- [x] 生活應用為 6～8 則（實際 7 則）
- [x] 影音資源每筆都有來源與檢核日期（media 3 筆、resources 2 筆）
- [x] 無殘留「待補」占位內容
- [x] `npm run build` 通過

> 註：verify.py 的 `--build` 旗標在本機以 Python 子行程呼叫 npm 時找不到執行檔（PATH 問題），
> 故改以 `npm run build` 直接驗證並通過；非教材內容問題。

## 動畫與互動檢查

以 dev server（127.0.0.1:5173）服務、並逐項對照原始碼確認 ID 與資料契約一致：

- [x] 七個頁籤每頁都有 SVG／CSS 動畫，圖文分區
- [x] 動畫分階段播放（動畫模擬 5 階段，未全部同時動）
- [x] 互動實驗滑桿即時反應（陽光→莖高、葉色、太陽亮度）
- [x] 動畫模擬可逐階段播放（種子→發芽→莖葉→開花→結果）
- [x] 生活應用每張卡片點按都切換 `.is-on` 觸發動畫
- [x] 已加入 `prefers-reduced-motion` 靜止版本

## 內容正確性

- [x] 闖關題 7 題、答案索引與解析皆已填寫
- [x] 學習進度寫入 localStorage（沿用範本 progress.js）
- [x] 自學頁影音連結可開啟、來源有標示（2 支 YouTube 影片與市集資源皆已 WebFetch 驗證存在）
- [x] 全部插圖為自製 SVG，無需第三方授權；外部連結出處見 references.md

## 跨裝置檢查

- [x] 電腦（dev server 服務正常，所有資源回應 200）
- [ ] 平板　- [ ] 手機（建議使用者於瀏覽器縮放視窗再確認 responsive.css 版面）

## 已知問題與備註

- 無連接的瀏覽器可供截圖，視覺逐頁眼檢建議由使用者於 `npm run dev` 後在瀏覽器完成。
- 外部影音連結內容由第三方維護，日後可能異動，使用前請再點開確認。
