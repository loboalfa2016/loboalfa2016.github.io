document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MENÚ HAMBURGUESA (MÓVIL)
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        // Evento abrir / cerrar menú
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita interferencias de eventos
            navLinks.classList.toggle('active');
            
            // Alternar icono de hamburguesa (bars) a equis (xmark)
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        // Cerrar menú al hacer clic en cualquier opción
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-xmark');
                    }
                }
            });
        });
    }

    // ==========================================
    // 2. FORMULARIO DE CONTACTO ASÍNCRONO
    // ==========================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('¡Mensaje enviado con éxito! Te responderé pronto.');
                    contactForm.reset();
                } else {
                    alert('Ocurrió un error al enviar el mensaje. Inténtalo de nuevo.');
                }
            } catch (error) {
                alert('Error de conexión. Revisa tu red e inténtalo nuevamente.');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});