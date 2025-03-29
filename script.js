document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        "Descubra o poder da Inteligência Artificial",
        "Transforme seu futuro com IA",
        "Aprenda. Inove. Evolua.",
        "Domine as tecnologias do futuro",
        "Construa soluções inteligentes"
    ];

    const typingDelay = 70; // Delay between each character (faster typing)
    const erasingDelay = 35; // Delay between each character while erasing (faster erasing)
    const newTextDelay = 2500; // Longer pause between phrases
    let textArrayIndex = 0;
    let charIndex = 0;

    const typedTextSpan = document.getElementById("animated-text");

    function type() {
        if (charIndex < phrases[textArrayIndex].length) {
            typedTextSpan.textContent += phrases[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = phrases[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= phrases.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start the typing animation
    setTimeout(type, newTextDelay + 250);

    // Add scroll reveal animation for cards
    const cards = document.querySelectorAll('.rounded-xl');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Add smooth scroll for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const href = button.getAttribute('href');
            if (href) {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add parallax effect for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const background = document.querySelector('.absolute.inset-0 img');
        if (background) {
            background.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Animation Error:', e.message);
        // Fallback content if animation fails
        if (typedTextSpan) {
            typedTextSpan.textContent = "Descubra o poder da Inteligência Artificial";
        }
    });
});