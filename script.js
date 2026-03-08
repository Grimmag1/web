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
    
    // Gallery population from manifest
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        fetch('images/realizace/images.json')
            .then(res => res.json())
            .then(files => {
                files.forEach((filename, i) => {
                    const item = document.createElement('div');
                    item.className = 'gallery-item';
                    item.innerHTML = `
                        <img src="images/realizace/${filename}" alt="Realizace ${i + 1}">
                        <div class="gallery-overlay"><h3>Realizace ${i + 1}</h3></div>
                    `;
                    galleryGrid.appendChild(item);
                });
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