document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const sequences = [
    [1, 2, 3],
    [2, 3, 4],
    [1, 2, 3, 4]
  ];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...sequences];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>

      <p id="prompt">What comes next?</p>

      <div id="sequence-display"
          style="margin:20px 0; padding:15px;
                  border-bottom:2px solid #ddd;">
      </div>

      <div style="margin:15px 0; font-size:14px; color:#777;">
        Choose one:
      </div>

      <div class="objects" id="options"
          style="gap:30px;">
      </div>

      <p id="feedback" class="feedback"></p>
    `;

    const display = document.getElementById("sequence-display");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let current = null;
    let correctAnswer = null;

    function renderGroup(n) {
      let html = '<div style="display:flex; gap:6px; justify-content:center;">';
      for (let i = 0; i < n; i++) {
        html += '<span style="font-size:28px;">🍎</span>';
      }
      html += '</div>';
      return html;
    }

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Sequence Mastered</h2>";
        localStorage.setItem("sequence_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      const shown = current.slice(0, current.length - 1);
      correctAnswer = current[current.length - 1];

      display.innerHTML = shown.map(renderGroup).join("");

      const distractors = shuffle([1, 2, 3, 4, 5])
        .filter(n => n !== correctAnswer)
        .slice(0, 2);

      const finalOptions = shuffle([correctAnswer, ...distractors]);

      optionsContainer.innerHTML = "";

      finalOptions.forEach(opt => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = opt;
        div.innerHTML = renderGroup(opt);
        optionsContainer.appendChild(div);
      });
    }

    optionsContainer.addEventListener("click", function (e) {

      const target = e.target.closest(".option");
      if (!target) return;

      if (Number(target.dataset.value) === correctAnswer) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(s => s !== current);

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