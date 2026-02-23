document.addEventListener("DOMContentLoaded", function () {

  const content = document.getElementById("numbers-content");
  const continueBtn = document.getElementById("continue-btn");

  let phase = 1;

  function renderExplore(range) {
    content.innerHTML = `
      <h2>Explore</h2>
      <div class="objects">
        ${range.map(n => `<div class="object">${n}</div>`).join("")}
      </div>
    `;
    continueBtn.style.display = "inline-block";
  }

  function renderPractice(range, onComplete) {

    let remaining = [...range];

    content.innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects">
        ${range.map(n => `<div class="object number-option" data-number="${n}">${n}</div>`).join("")}
      </div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const feedback = document.getElementById("feedback");
    const options = document.querySelectorAll(".number-option");

    let current = null;

    function next() {
      if (remaining.length === 0) {
        onComplete();
        return;
      }
      current = remaining[Math.floor(Math.random() * remaining.length)];
      prompt.textContent = `Tap the number ${current}.`;
    }

    options.forEach(option => {
      option.addEventListener("click", () => {
        if (option.dataset.number === current) {
          feedback.textContent = "✓ Correct.";
          feedback.style.color = "#2e7d32";
          remaining = remaining.filter(n => n !== current);
          setTimeout(() => {
            feedback.textContent = "";
            next();
          }, 600);
        } else {
          feedback.textContent = "Try again.";
          feedback.style.color = "#555";
        }
      });
    });

    next();
  }

  function nextPhase() {
    continueBtn.style.display = "none";
    phase++;

    if (phase === 2) renderPractice(["1","2","3","4","5"], () => continueBtn.style.display = "inline-block");
    if (phase === 3) renderExplore(["6","7","8","9","10"]);
    if (phase === 4) renderPractice(["6","7","8","9","10"], () => continueBtn.style.display = "inline-block");
    if (phase === 5) renderPractice(["1","2","3","4","5","6","7","8","9","10"], () => {
      content.innerHTML = "<h2>✓ Numbers Mastered</h2>";
      localStorage.setItem("numbers_mastered", "true");
    });
  }

  continueBtn.addEventListener("click", nextPhase);

  // Start Phase 1
  renderExplore(["1","2","3","4","5"]);

});