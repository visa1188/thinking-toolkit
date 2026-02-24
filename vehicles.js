document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const vehicles = ["🚗","🚲","🚕","🚓","🚌"];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...vehicles];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt">Tap this vehicle:</p>
      <div class="objects" id="options"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const options = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let current = null;

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Vehicles Mastered</h2>";
        localStorage.setItem("vehicles_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      options.innerHTML = "";

      vehicles.forEach(vehicle => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = vehicle;
        div.style.fontSize = "50px";
        div.textContent = vehicle;
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