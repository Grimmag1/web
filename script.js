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
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
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