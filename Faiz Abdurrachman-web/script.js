// Smooth scrolling untuk navigasi
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animasi progress bar saat scroll ke section skills
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateProgressBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = 'fillBar 1.5s ease-out';
                }, 10);
            });
        }
    });
};

const skillsObserver = new IntersectionObserver(animateProgressBars, observerOptions);
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Animasi fade in untuk cards saat scroll
const fadeInOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
};

const fadeObserver = new IntersectionObserver(fadeInOnScroll, fadeInOptions);

// Observe semua cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    fadeObserver.observe(card);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 14, 39, 0.98)';
        nav.style.boxShadow = '0 2px 30px rgba(0, 255, 255, 0.2)';
    } else {
        nav.style.background = 'rgba(10, 14, 39, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
    }
});

// Active nav link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Console message untuk developer
console.log('%c👋 Hi there!', 'font-size: 20px; color: #00ffff;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #b0b0b0;');
console.log('%cFeel free to reach out if you want to collaborate! 🚀', 'font-size: 14px; color: #00ccff;');