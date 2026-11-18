// ==========================================================================
// PORTAFOLIO MATÍAS PULGAR - INTERACTIVIDAD Y MODO OSCURO/CLARO
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. CONTROL DE TEMA OSCURO / CLARO
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // Verificar si hay una preferencia guardada en localStorage
    const savedTheme = localStorage.getItem('mpulgar_theme');

    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Detectar si el sistema prefiere modo oscuro
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.className = prefersDark ? 'dark-theme' : 'light-theme';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light-theme' : 'dark-theme';

            body.className = newTheme;
            localStorage.setItem('mpulgar_theme', newTheme);
        });
    }

    // ----------------------------------------------------
    // 2. MENÚ MÓVIL (HAMBURGUESA)
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en cualquier enlace
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    // ----------------------------------------------------
    // 3. FILTRADO DE PROYECTOS (CATEGORÍAS)
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.tarjeta-proyecto');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Pequeña animación de entrada
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------------------
    // 4. RESALTADO DE NAVEGACIÓN SEGÚN EL SCROLL
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});
