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
