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
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Open modal
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') return;
            
            const modalType = card.getAttribute('data-modal');
            const data = modalData[modalType];
            
            if (data) {
                modalTitle.textContent = data.title;
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

    // Open modal from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const modalParam = urlParams.get('modal');

    if (modalParam && modalData[modalParam]) {
        const data = modalData[modalParam];
        modalTitle.textContent = data.title;
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
    
    // Contact form handling
    //const contactForm = document.getElementById('contact-form');
    /*
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const jmeno = document.getElementById('jmeno').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefon = document.getElementById('telefon').value.trim();
            const zprava = document.getElementById('zprava').value.trim();
            
            // Validation
            if (jmeno === '') {
                alert('Vyplňte prosím své jméno.');
                return;
            }
            
            if (email === '') {
                alert('Vyplňte prosím svůj e-mail.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Zadejte platný e-mail.');
                return;
            }

            if (telefon === '') {
                alert('Vyplňte prosím svůj telefon.');
                return;
            }
            
            if (zprava === '') {
                alert('Vyplňte prosím zprávu.');
                return;
            }
            
            // Email to send
            const prijemce = 'dalibor.kalina2002@seznam.cz';
            const subject = encodeURIComponent('Nová zpráva z webu');
            
            let body = 'Jméno: ' + jmeno + '\n';
            body += 'Email: ' + email + '\n';
            if (telefon !== '') {
                body += 'Telefon: ' + telefon + '\n';
            }
            body += '\nZpráva:\n' + zprava;
            
            const bodyEncoded = encodeURIComponent(body);
            
            // Open email client
            window.location.href = `mailto:${prijemce}?subject=${subject}&body=${bodyEncoded}`;
        });
    }*/
    
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