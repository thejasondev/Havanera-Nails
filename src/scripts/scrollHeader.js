document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.remove("bg-transparent");
      header.classList.add("bg-white", "shadow-md");
    } else {
      header.classList.add("bg-transparent");
      header.classList.remove("bg-white", "shadow-md");
    }
  });
});