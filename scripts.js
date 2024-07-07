document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function showSection(sectionId) {
        sections.forEach(section => section.classList.add("d-none"));
        document.getElementById(sectionId).classList.remove("d-none");
    }

    // Mostrar la sección correcta al cargar la página
    function loadSectionFromHash() {
        const hash = window.location.hash.substring(1); // Quita el '#' del hash
        if (hash) {
            showSection(hash);
        } else {
            showSection("inicio");
        }
    }

    // Manejar clic en enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetSection = link.getAttribute("href").substring(1);
            showSection(targetSection);
            history.pushState(null, null, `#${targetSection}`);
        });
    });

    // Manejar cambios en el hash
    window.addEventListener("hashchange", loadSectionFromHash);

    // Inicializa la sección correcta
    loadSectionFromHash();
});


document.getElementById("logo-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir la acción por defecto del enlace

    // Obtener todas las secciones
    const sections = document.querySelectorAll('section');

    // Ocultar todas las secciones
    sections.forEach(section => {
        section.classList.add('d-none');
    });

    // Mostrar la sección de inicio
    const inicioSection = document.getElementById("inicio");
    inicioSection.classList.remove('d-none');

    // Desplazarse suavemente a la sección de inicio
    inicioSection.scrollIntoView({ behavior: "smooth" });
});

//Botón 'Ver más' de la sección de Inicio.
document.getElementById('ver-mas-btn').addEventListener('click', function() {
    var extraText = document.getElementById('extra-text');
    if (extraText.style.display === 'none') {
        extraText.style.display = 'block';
        this.textContent = 'Ver menos';
    } else {
        extraText.style.display = 'none';
        this.textContent = 'Ver más';
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
