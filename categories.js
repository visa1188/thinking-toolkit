document.addEventListener("DOMContentLoaded", function () {

  const continueBtn = document.getElementById("continue-btn");

  const groups = {
    fruits: ["🍎","🍌","🍇"],
    animals: ["🐶","🐱","🐮"],
    vehicles: ["🚗","🚲","🚕"]
  };

  continueBtn.addEventListener("click", startPractice);

  function startPractice() {

    const allItems = [...groups.fruits, ...groups.animals, ...groups.vehicles];

    let remainingCategories = Object.keys(groups);

    document.querySelector(".module-section").innerHTML = `
      <h2>Practice</h2>
      <p id="prompt"></p>
      <div class="objects" id="options"></div>
      <p id="feedback" class="feedback"></p>
    `;

    const prompt = document.getElementById("prompt");
    const optionsContainer = document.getElementById("options");
    const feedback = document.getElementById("feedback");

    let currentCategory = null;
    let selected = [];

    function next() {

      if (remainingCategories.length === 0) {
        document.querySelector(".module-section").innerHTML =
          "<h2>✓ Categories Mastered</h2>";
        localStorage.setItem("categories_mastered", "true");
        return;
      }

      currentCategory =
        remainingCategories[Math.floor(Math.random() * remainingCategories.length)];

      selected = [];
      prompt.textContent = `Tap all ${currentCategory}.`;

      optionsContainer.innerHTML = "";

      allItems.forEach(item => {
        const div = document.createElement("div");
        div.className = "object option";
        div.dataset.value = item;
        div.textContent = item;
        optionsContainer.appendChild(div);
      });
    }

    optionsContainer.addEventListener("click", function(e) {

      const target = e.target.closest(".option");
      if (!target) return;

      const value = target.dataset.value;

      if (groups[currentCategory].includes(value)) {
        target.style.opacity = "0.4";
        selected.push(value);

        if (selected.length === groups[currentCategory].length) {
          feedback.textContent = "✓ Correct.";
          feedback.style.color = "#2e7d32";

          remainingCategories =
            remainingCategories.filter(c => c !== currentCategory);

          setTimeout(() => {
            feedback.textContent = "";
            next();
          }, 700);
        }

      } else {
        feedback.textContent = "Try again.";
        feedback.style.color = "#555";
      }

    });

    next();
  }

});