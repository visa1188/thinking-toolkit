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
});