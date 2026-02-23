document.addEventListener("DOMContentLoaded", function () {

  const colors = ["red", "blue", "green", "yellow"];
  let remainingColors = [...colors];

  const prompt = document.getElementById("color-prompt");
  const feedback = document.getElementById("color-feedback");
  const options = document.querySelectorAll(".color-option");

  let currentColor = null;

  function nextColor() {

    if (remainingColors.length === 0) {
      prompt.textContent = "✓ Colors Mastered";
      feedback.textContent = "";
      localStorage.setItem("colors_mastered", "true");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingColors.length);
    currentColor = remainingColors[randomIndex];

    prompt.textContent = `Tap the ${currentColor} circle.`;
  }

  options.forEach(option => {
    option.addEventListener("click", () => {

      if (!currentColor) return;

      if (option.dataset.color === currentColor) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remainingColors = remainingColors.filter(c => c !== currentColor);

        setTimeout(() => {
          feedback.textContent = "";
          nextColor();
        }, 600);

      } else {

        feedback.textContent = "Try again.";
        feedback.style.color = "#555";

      }

    });
  });

  nextColor();

});