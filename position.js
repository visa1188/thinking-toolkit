document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const concepts = ["above", "below", "inside", "outside"];

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    let remaining = [...concepts];

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div id="visual-area"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const visualArea = document.getElementById("visual-area");
    const feedback = document.getElementById("feedback");

    let current = null;

    function next() {

      if (remaining.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Position Mastered</h2>";
        localStorage.setItem("position_mastered", "true");
        return;
      }

      current = remaining[Math.floor(Math.random() * remaining.length)];

      prompt.textContent = `Tap the object that is ${current}.`;

      renderVisual(current);
    }

    function renderVisual(concept) {

      visualArea.innerHTML = "";

      if (concept === "above" || concept === "below") {

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";
        container.style.gap = "10px";

        const top = document.createElement("div");
        const bottom = document.createElement("div");

        [top, bottom].forEach(el => {
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
        });

        top.style.background = "black";
        bottom.style.background = "gray";

        top.dataset.role = "above";
        bottom.dataset.role = "below";

        container.appendChild(top);
        container.appendChild(bottom);

        visualArea.appendChild(container);

      } else {

        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";
        wrapper.style.gap = "40px";

        const box = document.createElement("div");
        box.style.width = "100px";
        box.style.height = "100px";
        box.style.border = "3px solid black";
        box.style.position = "relative";

        const inside = document.createElement("div");
        inside.style.width = "30px";
        inside.style.height = "30px";
        inside.style.background = "black";
        inside.style.borderRadius = "50%";
        inside.style.position = "absolute";
        inside.style.top = "35px";
        inside.style.left = "35px";
        inside.style.cursor = "pointer";
        inside.dataset.role = "inside";

        const outside = document.createElement("div");
        outside.style.width = "30px";
        outside.style.height = "30px";
        outside.style.background = "gray";
        outside.style.borderRadius = "50%";
        outside.style.position = "absolute";
        outside.style.top = "-40px";
        outside.style.left = "35px";
        outside.style.cursor = "pointer";
        outside.dataset.role = "outside";

        box.appendChild(inside);
        box.appendChild(outside);

        wrapper.appendChild(box);
        visualArea.appendChild(wrapper);
      }
    }

    visualArea.addEventListener("click", function (e) {

      const role = e.target.dataset.role;
      if (!role) return;

      if (role === current) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remaining = remaining.filter(c => c !== current);

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