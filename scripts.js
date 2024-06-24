document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Añadir evento de clic a cada enlace de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Obtener el ID de la sección a mostrar
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Ocultar todas las secciones
            sections.forEach(section => {
                section.classList.add('d-none');
            });

            // Mostrar la sección seleccionada
            targetSection.classList.remove('d-none');
        });
    });
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