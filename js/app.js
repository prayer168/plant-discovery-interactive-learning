// 教材進入點：載入資料並初始化各模組。
import { initNavigation } from "./navigation.js";
import { initInteractions, renderApply, renderResources } from "./interactions.js";
import { initProgress } from "./progress.js";
import { initQuiz } from "./quiz.js";

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (e) {
    console.warn(`[app] 無法載入 ${path}`, e);
    return null;
  }
}

async function main() {
  initNavigation();
  initInteractions();
  initProgress();

  const [content, quiz, resources] = await Promise.all([
    loadJSON("./data/content.json"),
    loadJSON("./data/quiz.json"),
    loadJSON("./data/resources.json"),
  ]);

  if (content) renderApply(content);
  if (quiz) initQuiz(quiz);
  if (resources) renderResources(resources);
}

document.addEventListener("DOMContentLoaded", main);
