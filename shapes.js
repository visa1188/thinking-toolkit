document.addEventListener("DOMContentLoaded", function () {

  const shapes = ["circle", "square", "triangle", "star"];
  let remainingShapes = [...shapes];

  const prompt = document.getElementById("shape-prompt");
  const feedback = document.getElementById("shape-feedback");
  const options = document.querySelectorAll(".shape-option");

  let currentShape = null;

  function nextShape() {

    if (remainingShapes.length === 0) {
      prompt.textContent = "✓ Shapes Mastered";
      feedback.textContent = "";
      localStorage.setItem("shapes_mastered", "true");
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingShapes.length);
    currentShape = remainingShapes[randomIndex];

    prompt.textContent = `Tap the ${currentShape}.`;
  }

  options.forEach(option => {
    option.addEventListener("click", () => {

      if (!currentShape) return;

      if (option.dataset.shape === currentShape) {

        feedback.textContent = "✓ Correct.";
        feedback.style.color = "#2e7d32";

        remainingShapes = remainingShapes.filter(s => s !== currentShape);

        setTimeout(() => {
          feedback.textContent = "";
          nextShape();
        }, 600);

      } else {

        feedback.textContent = "Try again.";
        feedback.style.color = "#555";

      }

    });
  });

  nextShape();

});