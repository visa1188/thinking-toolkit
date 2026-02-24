document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const vegetables = ["🥕","🥦","🥔","🌽","🥒"];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...vegetables];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt">Tap this vegetable:</p>
      <div class="objects" id="options"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const options = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let current = null;

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Vegetables Mastered</h2>";
        localStorage.setItem("vegetables_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      options.innerHTML = "";

      vegetables.forEach(veg => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = veg;
        div.style.fontSize = "50px";
        div.textContent = veg;
        options.appendChild(div);
      });
    }

    options.addEventListener("click", function(e){
      const target = e.target.closest(".option");
      if (!target) return;

      if (target.dataset.value === current) {
        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(v => v !== current);

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