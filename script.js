// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
        
        // Close menu when clicking a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    const modalData = {
        okna: {
            title: "Okna a dveře",
            text: "Nabízíme kompletní řešení pro vaše okna a dveře. Od klasických plastových oken přes moderní hliníkové konstrukce až po stylová kastlová okna. Každý produkt je vyráběn s důrazem na kvalitu, tepelnou izolaci a dlouhou životnost. Naše eurookna splňují nejvyšší standardy a poskytují vynikající poměr ceny a výkonu.",
            image: "https://images.unsplash.com/photo-1545259742-24815b0e9cfc?w=600&h=400&fit=crop"
        },
        fasady: {
            title: "Fasády",
            text: "Specializujeme se na montáž moderních hliníkových a dřevěných fasád. Naše řešení kombinují estetiku s funkcionalitou a zajišťují dlouhodobou ochranu vašeho domu. Hliníkové fasády vynikají minimální údržbou a trvanlivostí, zatímco dřevěné fasády přidávají budově přirozený a elegantní vzhled.",
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop"
        },
        renovace: {
            title: "Renovace & servis",
            text: ["dodatečné opláštění eurooken hliníkem",
            "výměna a doplnění těsnění (včetně kastlových oken)",
            "renovace dřevěných oken a dveří"],
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop"
        }
    };
    
    // Get elements
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
    const serviceCards = document.querySelectorAll('.gallery-item img');
    
    // Open modal
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            
            const modalType = card.getAttribute('data-modal');
            const data = modalData[modalType];
            
            if (data) {
                modalImage.src = data.image;
                modalImage.alt = data.title;
                
                // Create list from text array
                if (Array.isArray(data.text)) {
                    modalText.innerHTML = '<ul>' + data.text.map(item => `<li><a href="gallery.html">${item}</a></li>`).join('') + '</ul>';
                } else {
                    modalText.textContent = data.text;
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modal && modalClose) {
        // Close modal
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Contact form handling via Formspree
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Odesílání...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.innerHTML = '<p class="form-success">Vaše zpráva byla úspěšně odeslána.</p>';
                } else {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Odeslat zprávu';
                    alert('Odeslání se nezdařilo. Zkuste to prosím znovu.');
                }
            } catch {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Odeslat zprávu';
                alert('Chyba sítě. Zkuste to prosím znovu.');
            }
        });
    }
    
    // Smooth scrolling for anchor links (if using same-page navigation)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});