function scrollToSection(sectionID) {
    const element = document.getElementById(sectionID);
    element.scrollIntoView({ behavior: 'smooth'});
}

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.1)'
    }
});

const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('nav button');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navButtons.forEach(btn => btn.classList.remove('nav-active'));
            
            const activeBtn = Array.from(navButtons).find(btn => 
                btn.onclick.toString().includes(sectionId)
            );
            if (activeBtn) activeBtn.classList.add('nav-active');
        }
    });
}, { threshold: 0.7 });

sections.forEach(section => observer.observe(section));

const skillItems = document.querySelectorAll('.skill-item');
const projectItems = document.querySelectorAll('.proyecto');

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

[...skillItems, ...projectItems].forEach(item => {
    item.style.opacity = '0';
    animateOnScroll.observe(item);
});


const certificados = [
    'certificados/Certificado_Dev_IA.pdf'
];

let currentSlide = 0;

function openModal(index) {
    currentSlide = index;
    const modal = document.getElementById('certificadoModal');
    const pdfViewer = document.getElementById('pdfViewer');

    modal.style.display = 'block';
    pdfViewer.src = certificados[currentSlide];

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('certificadoModal');
    modal.style.display = 'none';

    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide >= certificados.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = certificados.length - 1;
    }
    
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.src = certificados[currentSlide];
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

window.onclick = function(event) {
    const modal = document.getElementById('certificadoModal');
    if (event.target === modal) {
        closeModal();
    }
}