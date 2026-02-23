document.addEventListener("DOMContentLoaded", function () {
  const objects = document.querySelectorAll('.object');

  objects.forEach(obj => {
    obj.addEventListener('click', () => {

      // Remove highlight from all
      objects.forEach(o => {
        o.style.outline = '';
        o.style.borderRadius = '';
      });

      // Highlight selected
      obj.style.outline = '4px solid #4CAF50';
      obj.style.borderRadius = '10px';
    });
  });

  const completeBtn = document.querySelector('.complete-btn');

  if (completeBtn) {
    const sessionKey = completeBtn.dataset.session;

    // Check localStorage
    if (localStorage.getItem(sessionKey) === "done") {
      completeBtn.classList.add("completed");
      completeBtn.textContent = "✓ Session Completed";
      completeBtn.disabled = true;
    }

    completeBtn.addEventListener('click', () => {
      localStorage.setItem(sessionKey, "done");
      completeBtn.classList.add("completed");
      completeBtn.textContent = "✓ Session Completed";
      completeBtn.disabled = true;
    });
  }

  // Mark completed sessions on sessions page
  const sessionLinks = document.querySelectorAll('.session-link');

  sessionLinks.forEach(link => {
    const sessionKey = link.dataset.session;

    if (localStorage.getItem(sessionKey) === "done") {
      link.classList.add("completed");
    }
  });

  /* -------- Learning Mastery Indicator -------- */

  const learningLinks = document.querySelectorAll(".learning-link");

  learningLinks.forEach(link => {
    const moduleName = link.dataset.module;
    const mastered = localStorage.getItem(moduleName + "_mastered") === "true";

    if (mastered) {
      link.textContent =
        link.textContent.trim() + " — Mastered";
    } else {
      link.textContent =
        link.textContent.trim() + " — In Progress";
    }
  });

});