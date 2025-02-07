const openIcon = document.querySelector("#menu-icon-open");
const closeIcon = document.querySelector("#menu-icon-close");
const menuButton = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.style.display === "block";

  if (isOpen) {
    //Menu is open, so close it
    mobileMenu.style.display = "none";
    openIcon.style.display = "inline-block"; // Show open icon
    closeIcon.style.display = "none"; // Hide close icon
  } else {
    //Menu is closed, so open it
    mobileMenu.style.display = "block";
    openIcon.style.display = "none"; // Hide open icon
    closeIcon.style.display = "inline-block"; // Show close icon
  }
});
