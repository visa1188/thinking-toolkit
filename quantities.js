document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const numbers = [1, 2, 3, 4, 5];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let rounds = 5;

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects" id="options"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let correctAnswer = null;

    function renderGroup(n) {
      let html = '<div style="display:flex; gap:8px; justify-content:center;">';
      for (let i = 0; i < n; i++) {
        html += '<span style="font-size:32px;">🍎</span>';
      }
      html += '</div>';
      return html;
    }

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    function next() {

      if (rounds === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Comparing Quantities Mastered</h2>";
        localStorage.setItem("quantities_mastered", "true");
        return;
      }

      feedback.textContent = "";

      let a = numbers[Math.floor(Math.random() * numbers.length)];
      let b = numbers[Math.floor(Math.random() * numbers.length)];

      while (a === b) {
        b = numbers[Math.floor(Math.random() * numbers.length)];
      }

      const askMore = Math.random() > 0.5;

      correctAnswer = askMore
        ? (a > b ? "A" : "B")
        : (a < b ? "A" : "B");

      prompt.textContent = askMore
        ? "Which group has more?"
        : "Which group has less?";

      optionsContainer.innerHTML = "";

      const groups = [
        { label: "A", value: a },
        { label: "B", value: b }
      ];

      shuffle(groups).forEach(group => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.label = group.label;
        div.innerHTML = renderGroup(group.value);
        optionsContainer.appendChild(div);
      });

      rounds--;
    }

    optionsContainer.addEventListener("click", function (e) {

      const target = e.target.closest(".option");
      if (!target) return;

      if (target.dataset.label === correctAnswer) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        setTimeout(next, 700);

      } else {

        feedback.textContent = "Try again.";
        feedback.style.color = "#555";
      }

    });

    next();
  }

});