const openIcon: HTMLElement | null = document.querySelector('#menu-icon-open');
const closeIcon: HTMLElement | null = document.querySelector('#menu-icon-close');
const menuButton: HTMLElement | null = document.querySelector('#menu-toggle');
const mobileMenu: HTMLElement | null = document.querySelector('#mobile-menu');
const mobileMenuLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('#mobile-menu a');

if (menuButton && openIcon && closeIcon && mobileMenu) {
  // Inicializar el estado del menú
  mobileMenu.style.display = 'none';
  openIcon.style.display = 'inline-block';
  closeIcon.style.display = 'none';

  // Función para alternar el menú
  const toggleMenu = (show: boolean): void => {
    if (show) {
      mobileMenu.style.display = 'block';
      openIcon.style.display = 'none';
      closeIcon.style.display = 'inline-block';
      document.body.classList.add('menu-open', 'overflow-hidden');
    } else {
      mobileMenu.style.display = 'none';
      openIcon.style.display = 'inline-block';
      closeIcon.style.display = 'none';
      document.body.classList.remove('menu-open', 'overflow-hidden');
    }
  };

  // Manejador de click para el botón de menú
  menuButton.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'block';
    toggleMenu(!isOpen);
  });

  // Cerrar menú al hacer clic en un enlace
  mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Manejador para cambios de tamaño de pantalla
  const handleResize = (): void => {
    // Si la pantalla es grande (lg en Tailwind es 1024px), asegurémonos de que el menú móvil esté oculto
    if (window.innerWidth >= 1024) {
      toggleMenu(false);
    }
  };

  // Escuchar eventos de redimensionamiento
  window.addEventListener('resize', handleResize);

  // También verificar al cargar la página
  document.addEventListener('DOMContentLoaded', handleResize);

  // Verificar inmediatamente al ejecutar el script
  handleResize();
}
