document.addEventListener("DOMContentLoaded", function () {

  // Render Explore Icons
  document.getElementById("explore-big").innerHTML = Icons.circleLarge();
  document.getElementById("explore-small").innerHTML = Icons.circleSmall();
  document.getElementById("explore-tall").innerHTML = Icons.tallBar();
  document.getElementById("explore-short").innerHTML = Icons.shortBar();
  document.getElementById("explore-full").innerHTML = Icons.glassFull();
  document.getElementById("explore-empty").innerHTML = Icons.glassEmpty();
  document.getElementById("explore-hot").innerHTML = Icons.flame();
  document.getElementById("explore-cold").innerHTML = Icons.snowflake();

  const continueBtn = document.getElementById("continue-btn");

  const pairs = [
    { key: "big", opposite: "small" },
    { key: "tall", opposite: "short" },
    { key: "full", opposite: "empty" },
    { key: "hot", opposite: "cold" }
  ];

  continueBtn.addEventListener("click", startPractice);

  function renderIcon(word) {
    switch(word) {
      case "big": return Icons.circleLarge();
      case "small": return Icons.circleSmall();
      case "tall": return Icons.tallBar();
      case "short": return Icons.shortBar();
      case "full": return Icons.glassFull();
      case "empty": return Icons.glassEmpty();
      case "hot": return Icons.flame();
      case "cold": return Icons.snowflake();
    }
  }

  function startPractice() {

    let remaining = [...pairs];

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
          "<h2>✓ Opposites Mastered</h2>";
        localStorage.setItem("opposites_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];
      prompt.textContent = `Tap the opposite of ${current.key}.`;

      optionsContainer.innerHTML = "";

      pairs.forEach(pair => {
        [pair.key, pair.opposite].forEach(word => {
          const div = document.createElement("div");
          div.className = "option";
          div.dataset.word = word;
          div.innerHTML = renderIcon(word);
          optionsContainer.appendChild(div);
        });
      });
    }

    optionsContainer.addEventListener("click", function(e) {
      const target = e.target.closest(".option");
      if (!target) return;

      if (target.dataset.word === current.opposite) {
        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(p => p.key !== current.key);

        setTimeout(() => {
          feedback.textContent = "";
          next();
        }, 600);
      } else {
        feedback.textContent = "Try again.";
        feedback.style.color = "#555";
      }
    });

    next();
  }

});