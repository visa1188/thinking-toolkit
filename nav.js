document.addEventListener("DOMContentLoaded", function () {
  const navHTML = `
    <div class="nav">
      <a href="index.html">Home</a> |
      <a href="learning.html">Learning</a> |
      <a href="thinking.html">Thinking</a> |
      <a href="about.html">About</a>
    </div>
  `;

  const navContainer = document.getElementById("nav-placeholder");
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }
});