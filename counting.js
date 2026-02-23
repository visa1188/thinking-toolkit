document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const quantities = [1, 2, 3, 4, 5];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...quantities];

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

    function shuffle(arr) {
      return arr.sort(() => Math.random() - 0.5);
    }

    // Render apples properly as individual elements
    function renderGroup(n) {
      let html = `
        <div style="display:flex; gap:8px; justify-content:center;">
      `;

      for (let i = 0; i < n; i++) {
        html += `<span style="font-size:32px;">🍎</span>`;
      }

      html += `</div>`;
      return html;
    }

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Counting Groups Mastered</h2>";
        localStorage.setItem("counting_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      // Improved prompt layout
      prompt.innerHTML = `
        <div>Tap the group that shows:</div>
        <div style="font-size:48px; margin-top:10px;">${current}</div>
      `;

      optionsContainer.innerHTML = "";

      const shuffled = shuffle([...quantities]);

      shuffled.forEach(q => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = q;
        div.innerHTML = renderGroup(q); // IMPORTANT: innerHTML
        optionsContainer.appendChild(div);
      });
    }

    optionsContainer.addEventListener("click", function (e) {

      const target = e.target.closest(".option");
      if (!target) return;

      if (Number(target.dataset.value) === current) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(n => n !== current);

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