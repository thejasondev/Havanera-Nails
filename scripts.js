document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');

    // Agrega un event listener a cada enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Oculta todas las secciones
                document.querySelectorAll('section').forEach(section => {
                    section.classList.add('d-none');
                });

                // Muestra la sección objetivo
                targetSection.classList.remove('d-none');
            }
        });
    });

    // Lógica para el botón "Ver más"
    const verMasBtn = document.getElementById('ver-mas-btn');
    if (verMasBtn) {
        verMasBtn.addEventListener('click', function() {
            const extraText = document.getElementById('extra-text');
            if (extraText) {
                extraText.style.display = extraText.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
});

//Galería lightbox!
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  }
  
  function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
  }
