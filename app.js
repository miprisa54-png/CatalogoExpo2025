// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del navbar
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Toggle menú hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el evento se propague
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (navbar && !navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    });

    // Prevenir que los clics dentro del menú lo cierren
    if (navLinks) {
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Cerrar menú al cambiar el tamaño de la ventana (responsive)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Intersection Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a elementos
    document.querySelectorAll('.project-item, .profile').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Hacer los project-item clickeables
    document.querySelectorAll('.project-item').forEach(item => {
        item.style.cursor = 'pointer';
    });
});