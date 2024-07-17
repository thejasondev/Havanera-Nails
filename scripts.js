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

//Botón 'Ver más' de la sección de Inicio.
document.getElementById('ver-mas-btn').addEventListener('click', function() {
    const extraText = document.getElementById('extra-text');
    if (extraText.style.display === 'none') {
        extraText.style.display = 'block';
        this.textContent = 'Ver menos';
    } else {
        extraText.style.display = 'none';
        this.textContent = 'Ver más';
    }
            
    });
 });

//Galería lightbox!
let currentIndex = 0;

function openLightbox(img, index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    } else if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryItems[currentIndex].src;
}