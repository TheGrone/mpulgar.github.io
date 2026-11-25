// ==========================================================================
// PORTAFOLIO MATÍAS PULGAR SALINAS - INTERACTIVIDAD Y FUNCIONALIDADES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. CONTROL DE TEMA OSCURO / CLARO
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('mpulgar_theme');

    if (savedTheme) {
        body.className = savedTheme;
    } else {
        body.className = 'light-theme';
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
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
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
    // 4. MODAL DEL CURRÍCULUM VITAE (CV)
    // ----------------------------------------------------
    const openCvBtn = document.getElementById('openCvModalBtn');
    const closeCvBtn = document.getElementById('closeCvModalBtn');
    const cvModalCloseBackdrop = document.getElementById('cvModalCloseBackdrop');
    const cvModal = document.getElementById('cvModal');

    function openModal() {
        if (cvModal) {
            cvModal.classList.add('active');
            cvModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        }
    }

    function closeModal() {
        if (cvModal) {
            cvModal.classList.remove('active');
            cvModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restablece scroll
        }
    }

    if (openCvBtn) openCvBtn.addEventListener('click', openModal);
    if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);
    if (cvModalCloseBackdrop) cvModalCloseBackdrop.addEventListener('click', closeModal);

    // Cerrar modal al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // 5. RESALTADO DE NAVEGACIÓN SEGÚN EL SCROLL
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

    // ----------------------------------------------------
    // 6. BOTÓN VOLVER AL INICIO HACIA ARRIBA
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // 7. CHATBOT INTERACTIVO HACIA WHATSAPP
    // ----------------------------------------------------
    const WHATSAPP_NUMBER = '56977262607';
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');

    function toggleChatbot(forceState) {
        if (!chatbotWindow) return;
        const isOpen = typeof forceState === 'boolean'
            ? forceState
            : !chatbotWindow.classList.contains('open');
        chatbotWindow.classList.toggle('open', isOpen);
        chatbotWindow.setAttribute('aria-hidden', String(!isOpen));
        if (isOpen && chatbotInput) {
            setTimeout(() => chatbotInput.focus(), 150);
        }
    }

    function appendMessageAndWhatsAppLink(userText) {
        if (!chatbotMessages) return;

        const userBubble = document.createElement('div');
        userBubble.className = 'chat-msg user-msg';
        userBubble.textContent = userText;
        chatbotMessages.appendChild(userBubble);

        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(userText)}`;

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-msg bot-msg';
        botBubble.innerHTML = `¡Perfecto! Haz clic en el botón para continuar esta conversación directamente en el WhatsApp de Matías:<br><a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="whatsapp-action-link">Abrir WhatsApp &rarr;</a>`;
        chatbotMessages.appendChild(botBubble);

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => toggleChatbot());
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => toggleChatbot(false));
    }

    quickReplyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const msg = btn.getAttribute('data-msg');
            if (msg) appendMessageAndWhatsAppLink(msg);
        });
    });

    if (chatbotForm && chatbotInput) {
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatbotInput.value.trim();
            if (!text) return;
            chatbotInput.value = '';
            appendMessageAndWhatsAppLink(text);
        });
    }
});
