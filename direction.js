document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const concepts = ["left", "right", "up", "down"];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...concepts];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects" id="options"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let current = null;

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Direction Mastered</h2>";
        localStorage.setItem("direction_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      prompt.textContent = `Tap the arrow pointing ${current}.`;

      optionsContainer.innerHTML = `
        <div class="object option" data-value="left" style="font-size:60px;">⬅️</div>
        <div class="object option" data-value="right" style="font-size:60px;">➡️</div>
        <div class="object option" data-value="up" style="font-size:60px;">⬆️</div>
        <div class="object option" data-value="down" style="font-size:60px;">⬇️</div>
      `;
    }

    optionsContainer.addEventListener("click", function (e) {

      const target = e.target.closest(".option");
      if (!target) return;

      if (target.dataset.value === current) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(c => c !== current);

        setTimeout(() => {
          feedback.textContent = "";
          next();
        }, 700);

      } else {

        feedback.textContent = "Try again.";
        feedback.style.color = "#555";
      }

    });

    next();
  }

});