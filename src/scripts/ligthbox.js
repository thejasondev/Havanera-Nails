document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos las imágenes de la galería y elementos del modal
  const galleryImages = document.querySelectorAll("#catalogo-completo img");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const closeBtn = document.getElementById("modalClose");
  const prevBtn = document.getElementById("modalPrev");
  const nextBtn = document.getElementById("modalNext");
  let currentIndex = 0;

  // Función para abrir el modal con la imagen seleccionada
  function openModal(index) {
    currentIndex = index;
    const selectedImage = galleryImages[currentIndex];
    modalImage.src = selectedImage.src;
    modalImage.alt = selectedImage.alt;
    modal.classList.remove("hidden");
  }

  // Función para cerrar el modal
  function closeModal() {
    modal.classList.add("hidden");
  }

  // Función para mostrar la imagen anterior
  function showPrev() {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openModal(currentIndex);
  }

  // Función para mostrar la siguiente imagen
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openModal(currentIndex);
  }

  // Asignamos el evento de click a cada imagen de la galería
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  // Eventos para los botones del modal
  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showNext();
  });

  // Cierra el modal si se hace click fuera del contenedor de la imagen
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Navegación por teclado: Esc para cerrar, flechas para navegar
  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("hidden")) return;
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    } else if (e.key === "ArrowRight") {
      showNext();
    }
  });
});
