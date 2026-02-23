document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const animals = [
    { name: "dog", emoji: "🐶" },
    { name: "cat", emoji: "🐱" },
    { name: "cow", emoji: "🐮" },
    { name: "elephant", emoji: "🐘" },
    { name: "lion", emoji: "🦁" }
  ];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...animals];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects">
        ${animals.map(a => `
          <div class="object animal-option" data-name="${a.name}">
            ${a.emoji}
          </div>
        `).join("")}
      </div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const feedback = document.getElementById("feedback");
    const options = document.querySelectorAll(".animal-option");

    let current = null;

    function next() {
      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Animals Mastered</h2>";
        localStorage.setItem("animals_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];
      prompt.textContent = `Tap the ${current.name}.`;
    }

    options.forEach(option => {
      option.addEventListener("click", () => {
        if (option.dataset.name === current.name) {
          feedback.textContent = "✓ Correct.";
          feedback.style.color = "#2e7d32";
          remaining = remaining.filter(a => a.name !== current.name);

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

});