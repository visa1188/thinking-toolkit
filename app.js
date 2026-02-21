document.addEventListener("DOMContentLoaded", function () {
  const objects = document.querySelectorAll('.object');

  objects.forEach(obj => {
    obj.addEventListener('click', () => {
      obj.style.outline = '4px solid #4CAF50';
      obj.style.borderRadius = '10px';
    });
  });
});