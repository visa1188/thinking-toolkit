document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const objects = [
    { name: "cup", emoji: "🥤" },
    { name: "ball", emoji: "⚽" },
    { name: "chair", emoji: "🪑" },
    { name: "book", emoji: "📖" },
    { name: "spoon", emoji: "🥄" },
    { name: "shoe", emoji: "👟" }
  ];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...objects];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects">
        ${objects.map(o => `
          <div class="object object-option" data-name="${o.name}">
            ${o.emoji}
          </div>
        `).join("")}
      </div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const feedback = document.getElementById("feedback");
    const options = document.querySelectorAll(".object-option");

    let current = null;

    function next() {
      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Basic Objects Mastered</h2>";
        localStorage.setItem("objects_mastered", "true");
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
          remaining = remaining.filter(o => o.name !== current.name);

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