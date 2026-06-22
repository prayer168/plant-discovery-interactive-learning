// 闖關題：讀 data/quiz.json 並渲染。
export function initQuiz(quiz) {
  const root = document.getElementById("quiz-root");
  if (!root || !quiz || !Array.isArray(quiz.questions)) return;

  if (quiz.questions.length === 0) {
    root.innerHTML = "<p>題庫尚未建立，請於 data/quiz.json 加入題目。</p>";
    return;
  }

  let current = 0;
  let score = 0;

  function render() {
    const q = quiz.questions[current];
    root.innerHTML = `
      <p class="quiz-progress">第 ${current + 1} / ${quiz.questions.length} 題</p>
      <p class="quiz-stem">${q.stem}</p>
      <ul class="quiz-options">
        ${q.options.map((opt, i) => `<li><button data-i="${i}">${opt}</button></li>`).join("")}
      </ul>`;
    root.querySelectorAll("button[data-i]").forEach((btn) => {
      btn.addEventListener("click", () => answer(Number(btn.dataset.i)));
    });
  }

  function answer(i) {
    if (i === quiz.questions[current].answer) score += 1;
    current += 1;
    if (current < quiz.questions.length) {
      render();
    } else {
      root.innerHTML = `<p class="quiz-done">完成！答對 ${score} / ${quiz.questions.length} 題。</p>`;
    }
  }

  render();
}
