// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navCta.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navCta.classList.remove('active');
        });
    });
});

// Header scroll effect - mantém fundo roxo fixo
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    // Mantém o fundo roxo fixo
    header.style.background = 'var(--primary-color)';
    header.style.boxShadow = 'var(--shadow-lg)';
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fechar todos os outros itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abrir o item clicado se não estiver ativo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Animações de scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Adicionar classe scroll-animate aos elementos
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .location-card, .value-item');
    
    sections.forEach(section => {
        section.classList.add('scroll-animate');
    });
    
    cards.forEach(card => {
        card.classList.add('scroll-animate');
    });
});

window.addEventListener('scroll', animateOnScroll);

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de envio
            setTimeout(() => {
                // Aqui você pode adicionar a lógica real de envio
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                
                // Resetar formulário
                contactForm.reset();
                
                // Restaurar botão
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Validação de formulário em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover mensagens de erro anteriores
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('error');
    
    // Validações específicas
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Digite um e-mail válido';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Digite um telefone válido';
    }
    
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--error-color)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

// Lazy loading para imagens (se houver)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Contador de números (para estatísticas se houver)
function animateNumbers() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Parallax suave para o hero
function parallaxHero() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Aplicar parallax apenas em desktop
if (window.innerWidth > 768) {
    window.addEventListener('scroll', parallaxHero);
}

// Tooltip para informações adicionais
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.position = 'absolute';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.background = 'var(--text-primary)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '0.5rem 1rem';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '0.875rem';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    
    // Adicionar seta
    tooltip.style.position = 'relative';
    tooltip.innerHTML += '<div class="tooltip-arrow"></div>';
    
    e.target.tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target.tooltip) {
        e.target.tooltip.remove();
        e.target.tooltip = null;
    }
}

// Inicializar tooltips
document.addEventListener('DOMContentLoaded', initTooltips);

// Adicionar efeito de hover nos cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .location-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar efeitos de hover
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Adicionar classe CSS para estilização de campos com erro
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    .tooltip-arrow {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--text-primary);
    }
    
    .nav-menu.active,
    .nav-cta.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--primary-dark);
        flex-direction: column;
        padding: 2rem;
        box-shadow: var(--shadow-lg);
        border-top: 1px solid var(--primary-light);
    }
    
    .nav-menu.active {
        gap: 1rem;
    }
    
    .nav-cta.active {
        margin-top: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

document.head.appendChild(style);

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce nas funções de scroll
const debouncedScrollHandler = debounce(animateOnScroll, 10);
const debouncedParallaxHandler = debounce(parallaxHero, 10);

window.addEventListener('scroll', debouncedScrollHandler);
if (window.innerWidth > 768) {
    window.addEventListener('scroll', debouncedParallaxHandler);
}

// Adicionar suporte para preferências de redução de movimento
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Desabilitar animações para usuários que preferem menos movimento
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}
