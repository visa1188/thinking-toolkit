document.addEventListener("DOMContentLoaded", function () {

  const sizes = ["small", "medium", "large"];
  let remainingSizes = [...sizes];

  const prompt = document.getElementById("size-prompt");
  const feedback = document.getElementById("size-feedback");
  const options = document.querySelectorAll(".size-option");

  let currentSize = null;

  function nextSize() {

    if (remainingSizes.length === 0) {
      prompt.textContent = "✓ Sizes Mastered";
      feedback.textContent = "";
      localStorage.setItem("sizes_mastered", "true");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingSizes.length);
    currentSize = remainingSizes[randomIndex];

    prompt.textContent = `Tap the ${currentSize} circle.`;
  }

  options.forEach(option => {
    option.addEventListener("click", () => {

      if (!currentSize) return;

      if (option.dataset.size === currentSize) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remainingSizes = remainingSizes.filter(s => s !== currentSize);

        setTimeout(() => {
          feedback.textContent = "";
          nextSize();
        }, 600);

      } else {

        feedback.textContent = "Try again.";
        feedback.style.color = "#555";

      }

    });
  });

  nextSize();

});