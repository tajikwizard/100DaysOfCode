document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".item-header");

  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentNode;
      item.classList.toggle("open");
      const hiddenBox = item.querySelector(".hidden-box");
      if (item.classList.contains("open")) {
        hiddenBox.style.display = "block";
      } else {
        hiddenBox.style.display = "none";
      }
    });
  });
});
