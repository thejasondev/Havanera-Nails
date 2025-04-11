document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos las imágenes de la galería y elementos del modal
  const galleryImages: NodeListOf<HTMLImageElement> = document.querySelectorAll("#catalogo-completo img");
  const modal: HTMLElement | null = document.getElementById("modal");
  const modalImage: HTMLImageElement | null = document.getElementById("modalImage") as HTMLImageElement;
  const closeBtn: HTMLElement | null = document.getElementById("modalClose");
  const prevBtn: HTMLElement | null = document.getElementById("modalNext");
  const nextBtn: HTMLElement | null = document.getElementById("modalPrev");
  let currentIndex: number = 0;

  // Función para abrir el modal con la imagen seleccionada
  function openModal(index: number): void {
    if (!modal || !modalImage) return;
    
    currentIndex = index;
    const selectedImage = galleryImages[currentIndex];
    modalImage.src = selectedImage.src;
    modalImage.alt = selectedImage.alt;
    modal.classList.remove("hidden");
  }

  // Función para cerrar el modal
  function closeModal(): void {
    if (!modal) return;
    modal.classList.add("hidden");
  }

  // Función para mostrar la imagen anterior
  function showPrev(): void {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openModal(currentIndex);
  }

  // Función para mostrar la siguiente imagen
  function showNext(): void {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openModal(currentIndex);
  }

  // Asignamos el evento de click a cada imagen de la galería
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  // Eventos para los botones del modal
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      showPrev();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      showNext();
    });
  }

  // Cierra el modal si se hace click fuera del contenedor de la imagen
  if (modal) {
    modal.addEventListener("click", (e: Event) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Navegación por teclado: Esc para cerrar, flechas para navegar
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      showPrev();
    } else if (e.key === "ArrowRight") {
      showNext();
    }
  });
});
