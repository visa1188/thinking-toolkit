document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const pairs = [
    { cause: "🌧️", effect: "💧" },
    { cause: "🔥", effect: "💨" },
    { cause: "☀️", effect: "🧊" },
    { cause: "💡", effect: "✨" }
  ];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...pairs];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div id="cause-display" style="margin:20px 0; font-size:50px;"></div>
      <div style="margin:15px 0; color:#777;">Choose what happens:</div>
      <div class="objects" id="options" style="gap:30px;"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const causeDisplay = document.getElementById("cause-display");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let current = null;

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Cause & Effect Mastered</h2>";
        localStorage.setItem("cause-effect_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      prompt.textContent = "What happens because of this?";

      causeDisplay.textContent = current.cause;

      const wrongOptions = pairs
        .filter(p => p.effect !== current.effect)
        .map(p => p.effect);

      const selectedWrongs = shuffle(wrongOptions).slice(0, 2);

      const finalOptions = shuffle([current.effect, ...selectedWrongs]);

      optionsContainer.innerHTML = "";

      finalOptions.forEach(opt => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = opt;
        div.style.fontSize = "40px";
        div.textContent = opt;
        optionsContainer.appendChild(div);
      });
    }

    optionsContainer.addEventListener("click", function (e) {

      const target = e.target.closest(".option");
      if (!target) return;

      if (target.dataset.value === current.effect) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(p => p !== current);

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