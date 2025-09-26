        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const navRightSection = document.getElementById('navRightSection');

        menuToggle.addEventListener('click', () => {
            navRightSection.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navRightSection.classList.remove('active');
                }
            });
        });
        // Navbar Visibility on Scroll
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Rolando para baixo
                navbar.classList.add('navbar-hidden');
            } else {
                // Rolando para cima
                navbar.classList.remove('navbar-hidden');
            }

            lastScrollY = currentScrollY;
        });

        // Scroll Reveal Animation
        function reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Initial check

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // Show success message (in production, this would send to a server)
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Reset form
            this.reset();
        });

        // Counter Animation for Stats
        function animateCounter(element, start, end, duration) {
            let current = start;
            const range = end - start;
            const increment = end > start ? 1 : -1;
            const stepTime = Math.abs(Math.floor(duration / range));
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = current + (element.dataset.suffix || '');
                
                if (current === end) {
                    clearInterval(timer);
                }
            }, stepTime);
        }

        // Animate stats when they come into view
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const text = stat.textContent.trim();

                        // Pular a animação para o texto '24/7'
                        if (text === '24/7') {
                            return;
                        }

                        const number = parseInt(text.replace(/\D/g, ''));
                        const suffix = text.replace(/[0-9]/g, '');
                        stat.dataset.suffix = suffix;
                        stat.textContent = '0' + suffix;
                        animateCounter(stat, 0, number, 2000);
                    });
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe stats grid
        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            statsObserver.observe(statsGrid);
        }

        // Parallax Effect for Hero Background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add Loading Animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });

        // Service Cards Hover Effect
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Dynamic Year in Footer
        const currentYear = new Date().getFullYear();
        const footerYear = document.querySelector('.footer-bottom p');
        if (footerYear) {
            footerYear.innerHTML = `&copy; 2025 VisionsX. Todos os direitos reservados.`;
        }

        // Typed Effect for Hero Title
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Apply typed effect on page load
        window.addEventListener('DOMContentLoaded', () => {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                typeWriter(heroTitle, originalText, 30);
            }
        });

        // Add active state to current nav item based on scroll position
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            const navItems = document.querySelectorAll('.nav-links a');
            const dotItems = document.querySelectorAll('.dot-nav a');

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });

            dotItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });

        // Performance Optimization - Throttle scroll events
        let ticking = false;
        function updateOnScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    reveal();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll);

        // Add subtle mouse follow effect to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                
                const moveX = (clientX - centerX) / 50;
                const moveY = (clientY - centerY) / 50;
                
                const shapes = document.querySelectorAll('.floating-shape');
                shapes.forEach((shape, index) => {
                    const speed = 1 + (index * 0.5);
                    shape.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
                });
            });
        }

        // Form validation with visual feedback
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ff4444';
                } else {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--secondary-color)';
            });
        });

        // Email validation
        document.getElementById('email').addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value !== '') {
                this.style.borderColor = '#ff4444';
                this.setCustomValidity('Por favor, insira um email válido');
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                this.setCustomValidity('');
            }
        });

        // Phone mask
        document.getElementById('phone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                    value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                }
                e.target.value = value;
            }
        });

        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isExpanded = question.getAttribute('aria-expanded') === 'true' || false;

                // Close other items for a cleaner accordion experience
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle the clicked item
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isExpanded);
            });
        });

        // Botão Voltar ao Topo
        const backToTopButton = document.querySelector('.back-to-top');
        console.log('Botão Voltar ao Topo selecionado:', backToTopButton);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
                console.log('Scroll > 300, adicionando classe active');
            } else {
                backToTopButton.classList.remove('active');
                console.log('Scroll <= 300, removendo classe active');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log('Botão Voltar ao Topo clicado');
        });

        console.log('VisionsX - Site carregado com sucesso!');

        // Testimonial Carousel
        const testimonialSlider = document.querySelector('.testimonials-grid');
        if (testimonialSlider) {
            const slides = document.querySelectorAll('.testimonial-card');
            const prevBtn = document.getElementById('prev-testimonial');
            const nextBtn = document.getElementById('next-testimonial');
            let currentIndex = 0;
            const totalSlides = slides.length;
            let intervalId;

            function updateCarousel() {
                const offset = currentIndex * -100;
                testimonialSlider.style.transform = `translateX(${offset}%)`;
            }

            function startCarousel() {
                intervalId = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    updateCarousel();
                }, 5000); // Muda a cada 5 segundos
            }

            function resetCarouselInterval() {
                clearInterval(intervalId);
                startCarousel();
            }

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateCarousel();
                resetCarouselInterval();
            });

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateCarousel();
                resetCarouselInterval();
            });

            startCarousel(); // Inicia o carrossel automático
        }