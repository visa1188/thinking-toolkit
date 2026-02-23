document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const sequences = [
    ["🌱", "🌿", "🌳"],
    ["🥚", "🐣", "🐔"],
    ["☀️", "🌅", "🌙"]
  ];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...sequences];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects" id="sequence-display" style="gap:40px;"></div>
      <div style="margin:15px 0; color:#777;">Choose one:</div>
      <div class="objects" id="options" style="gap:30px;"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const display = document.getElementById("sequence-display");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let currentSequence = null;
    let currentIndex = null;
    let correctAnswer = null;

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Before and After Mastered</h2>";
        localStorage.setItem("before-after_mastered", "true");
        return;
      }

      currentSequence = remaining[Math.floor(Math.random() * remaining.length)];

      currentIndex = Math.floor(Math.random() * currentSequence.length);

      display.innerHTML = currentSequence
        .map(item => `<div style="font-size:40px;">${item}</div>`)
        .join("");

      const askBefore = Math.random() > 0.5;

      if (askBefore && currentIndex > 0) {
        correctAnswer = currentSequence[currentIndex - 1];
        prompt.innerHTML = `
          Tap what comes before 
          <div style="font-size:40px; margin-top:8px;">
            ${currentSequence[currentIndex]}
          </div>
        `;
      } else if (!askBefore && currentIndex < currentSequence.length - 1) {
        correctAnswer = currentSequence[currentIndex + 1];
        prompt.innerHTML = `
          Tap what comes after 
          <div style="font-size:40px; margin-top:8px;">
            ${currentSequence[currentIndex]}
          </div>
        `;
      } else {
        // If at edges, flip question
        correctAnswer = currentSequence[1];
        prompt.innerHTML = `
          Tap what comes after 
          <div style="font-size:40px; margin-top:8px;">
            ${currentSequence[0]}
          </div>
        `;
      }

      const distractors = shuffle(currentSequence.filter(i => i !== correctAnswer)).slice(0, 2);

      const finalOptions = shuffle([correctAnswer, ...distractors]);

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

      if (target.dataset.value === correctAnswer) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(seq => seq !== currentSequence);

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