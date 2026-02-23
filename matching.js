document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const pairs = [
    { item: "👟", match: "🦶" },
    { item: "🥤", match: "💧" },
    { item: "🔑", match: "🔒" },
    { item: "📖", match: "👀" }
  ];

  continueBtn.addEventListener("click", startPractice);

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

    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Matching Mastered</h2>";
        localStorage.setItem("matching_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      prompt.innerHTML = `
        <div>What matches with:</div>
        <div class="object" style="margin-top:10px;">${current.item}</div>
      `;

      // Build distractor options
      const wrongOptions = pairs
        .filter(p => p.match !== current.match)
        .map(p => p.match);

      const selectedWrongs = shuffle(wrongOptions).slice(0, 2);

      const finalOptions = shuffle([current.match, ...selectedWrongs]);

      optionsContainer.innerHTML = "";

      finalOptions.forEach(opt => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = opt;
        div.textContent = opt;
        optionsContainer.appendChild(div);
      });
    }

    optionsContainer.addEventListener("click", function(e) {

      const target = e.target.closest(".option");
      if (!target) return;

      if (target.dataset.value === current.match) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(p => p.item !== current.item);

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