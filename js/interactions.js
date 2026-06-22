// 互動實驗、動畫模擬、生活應用卡片與自學資源的互動邏輯。

export function initInteractions() {
  // 3. 互動實驗：陽光滑桿即時驅動植物生長。
  const slider = document.getElementById("demo-slider");
  const bar = document.getElementById("demo-bar");
  const crown = document.getElementById("demo-crown");
  const leafL = document.getElementById("demo-leaf-l");
  const leafR = document.getElementById("demo-leaf-r");
  const sun = document.getElementById("demo-sun");
  const readout = document.getElementById("demo-readout");
  if (slider && bar && crown && readout) {
    const base = 100;                  // 土面 y 座標
    const update = () => {
      const v = Number(slider.value);
      const h = 18 + v * 0.62;          // 莖高隨陽光變高（18～80）
      const top = base - h;             // 莖頂 y 座標
      bar.setAttribute("y", top);
      bar.setAttribute("height", h);
      // 顏色：陽光少→偏黃（徒長），陽光多→深綠
      const r = Math.round(180 - v * 1.5);   // 180→30
      const g = Math.round(150 + v * 0.25);  // 150→175
      const b = Math.round(90 - v * 0.5);    // 90→40
      const color = `rgb(${r}, ${g}, ${b})`;
      crown.setAttribute("cy", top - 2);
      crown.setAttribute("fill", color);
      if (leafL) { leafL.setAttribute("cy", top + 14); leafL.setAttribute("fill", color); }
      if (leafR) { leafR.setAttribute("cy", top + 14); leafR.setAttribute("fill", color); }
      if (sun) sun.setAttribute("opacity", String(0.25 + v / 130));
      readout.textContent = v;
    };
    slider.addEventListener("input", update);
    update();
  }

  // 4. 動畫模擬：植物的一生，分階段切換。
  const scene = document.getElementById("sim-scene");
  const play = document.getElementById("sim-play");
  const caption = document.getElementById("sim-caption");
  if (scene && play && caption) {
    const stages = [
      "階段 1：種子在土裡，等待水分與溫度",
      "階段 2：種子發芽，向下長根、向上長芽",
      "階段 3：長出莖和葉，開始行光合作用",
      "階段 4：開花，準備授粉",
      "階段 5：結成果實，裡面藏著新的種子",
    ];
    play.addEventListener("click", () => {
      const next = (Number(scene.dataset.stage) + 1) % stages.length;
      scene.dataset.stage = String(next);
      caption.textContent = stages[next];
    });
  }
}

// 5. 生活應用：渲染 6～8 則可互動卡片。
export function renderApply(content) {
  const root = document.getElementById("apply-root");
  const cases = content && content.sections && content.sections.apply
    ? content.sections.apply.cases : null;
  if (!root || !Array.isArray(cases) || cases.length === 0) {
    if (root) root.innerHTML = "<p>生活應用尚未建立，請於 data/content.json 加入 6～8 則情境。</p>";
    return;
  }
  root.innerHTML = "";
  cases.forEach((c) => {
    const card = document.createElement("article");
    card.className = "apply-card";
    card.innerHTML = `
      ${c.svg || ""}
      <h3>${c.title || ""}</h3>
      <p>${c.caption || ""}</p>
      <button class="btn" type="button">${c.action || "看看會怎樣"}</button>
      ${c.source ? `<p class="credit">來源：${c.source}</p>` : ""}`;
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => card.classList.toggle("is-on"));
    root.appendChild(card);
  });
}

// 7. 自學資源：渲染影音教材與延伸連結，務必顯示來源。
export function renderResources(data) {
  const mediaRoot = document.getElementById("media-root");
  const linkRoot = document.getElementById("resources-root");

  if (mediaRoot) {
    const media = Array.isArray(data.media) ? data.media : [];
    mediaRoot.innerHTML = media.length
      ? media.map((m) => `
          <article class="media-card">
            <h3>${m.title || ""}</h3>
            <p>${m.type || "影音"}・適用 ${m.grade || ""}</p>
            <a href="${m.url}" target="_blank" rel="noopener">開啟資源</a>
            <p class="credit">來源：${m.source || "（待補）"}・檢核 ${m.checkedDate || ""}</p>
          </article>`).join("")
      : "<p>影音教材尚未建立，請於 data/resources.json 的 media 加入。</p>";
  }

  if (linkRoot) {
    const links = Array.isArray(data.resources) ? data.resources : [];
    linkRoot.innerHTML = links.length
      ? "<ul>" + links.map((r) => `
          <li><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a>
          <span class="credit">（${r.type || ""}・檢核 ${r.checkedDate || ""}）</span></li>`).join("") + "</ul>"
      : "<p>延伸資源尚未建立。</p>";
  }
}
