//mouse green light effact
const glow = document.querySelector('.mouse-glow');
document.addEventListener('mousemove', (e) => {
    
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});




//navBar box efectt
const marker = document.querySelector('#marker');
const items = document.querySelectorAll('.navbar ul li');
let currentNavItem = items[0];
function moveIndicator(e) {
    currentNavItem = e;
    marker.style.left = e.offsetLeft + 'px';
    marker.style.top = e.offsetTop + 'px';
    marker.style.width = e.offsetWidth + 'px';
    marker.style.height = e.offsetHeight + 'px';
}
window.onload = () => {
    moveIndicator(items[0]);
};

// Re-sync the marker whenever the viewport size changes (resizing/rotating
// a device changes each nav item's width/position, so the marker's old
// pixel values would otherwise stick around and overflow the navbar)
let resizeMarkerTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeMarkerTimeout);
    resizeMarkerTimeout = setTimeout(() => {
        marker.style.transition = 'none';
        moveIndicator(currentNavItem);
        requestAnimationFrame(() => {
            marker.style.transition = '';
        });
    }, 550); // wait past the 0.5s nav-link transition so we read the final size
});





//loading skills line animaton
const observerOptions = {
    threshold: 0.1

};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-box').forEach(box => {
    skillObserver.observe(box);
});






//hero rotating role text animaton
const skillList = ["Digital Solutions Consultant", "Project Manager", "Full Stack Web Development", "Software Development", "AI Automation", "Mobile App Development", "UI/UX Design", "Digital Marketing"];
let wordIdx = 0;
const target = document.getElementById('smoke-target');

function runSmokeAnimation() {
    target.innerHTML = '';
    let currentWord = skillList[wordIdx];

    currentWord.split('').forEach((char, i) => {
        let span = document.createElement('span');
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = 'letter fade-in';

        span.style.animationDelay = (i * 0.1) + 's';
        target.appendChild(span);
    });

    const typingDuration = currentWord.length * 100;

    setTimeout(() => {
        const letters = target.querySelectorAll('.letter');

        letters.forEach((span, i) => {
            setTimeout(() => {
                span.classList.remove('fade-in');
                span.classList.add('fade-out');
            }, i * 40);
        });

        const nextWordDelay = (currentWord.length * 40) + 50;
        setTimeout(() => {
            wordIdx = (wordIdx + 1) % skillList.length;
            runSmokeAnimation();
        }, nextWordDelay);

    }, typingDuration + 2000);
}

window.onload = runSmokeAnimation;





//bwebsite two site arrow
document.getElementById('scroll-down').addEventListener('click', function () {
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

document.getElementById('scroll-up').addEventListener('click', function () {
    window.scrollBy({
        top: -window.innerHeight,
        behavior: 'smooth'
    });
});





//Thank you sir hover love effect
const targetBtn = document.getElementById('targetBtn');
const mainBody = document.body;

function createExplosion() {
    mainBody.classList.add('pink-bg');

    for (let i = 0; i < 100; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerText = '❤️';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;

        const x = Math.cos(angle) * distance + "px";
        const y = Math.sin(angle) * distance + "px";
        const xEnd = (Math.cos(angle) * distance * 1.5) + "px";
        const duration = Math.random() * 2 + 2;
        const rotation = (Math.random() - 0.5) * 400 + "deg";

        heart.style.setProperty('--x', x);
        heart.style.setProperty('--y', y);
        heart.style.setProperty('--x-end', xEnd);
        heart.style.setProperty('--duration', duration + 's');
        heart.style.setProperty('--rotation', rotation);

        targetBtn.parentElement.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}

targetBtn.addEventListener('mouseenter', createExplosion);

targetBtn.addEventListener('mouseleave', () => {
    mainBody.classList.remove('pink-bg');
});

targetBtn.addEventListener('mousedown', createExplosion);





//web time & date logic
function startLiveDynamicClock() {
    const now = new Date();

    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const fullDateString = `${ day }/${month}/${ year }`;

    document.getElementById("digital-clock").innerText = timeString;
    document.getElementById("day-name").innerText = dayString;
    document.getElementById("full-date").innerText = fullDateString;
}

setInterval(startLiveDynamicClock, 1000);
startLiveDynamicClock();


//side 3 dot scroll icone logic
const mainNavbar = document.querySelector(".navbar");
const scrollIcon = document.getElementById("scroll-menu-icon");

window.onscroll = function () {
    if (window.scrollY > 80) {
        if (mainNavbar) mainNavbar.style.transform = "translateY(-100%)";
        scrollIcon.style.display = "flex";
    } else {
        if (mainNavbar) mainNavbar.style.transform = "translateY(0)";
        scrollIcon.style.display = "none";
        document.getElementById("side-drawer").classList.remove("open");
        scrollIcon.classList.remove("active");
    }
};


//side manu ber 
function toggleSideMenu() {
    const drawer = document.getElementById("side-drawer");
    drawer.classList.toggle("open");
    scrollIcon.classList.toggle("active");
}

//===================== PREMIUM EXPANSION JS =====================

//generic reveal-on-scroll for new premium sections (cards fade/slide in every time they enter view)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


//FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
            if (openItem !== item) openItem.classList.remove('open');
        });
        item.classList.toggle('open', !isOpen);
    });
});


//Testimonial slider
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDotsWrap = document.getElementById('testimonialDots');

if (testimonialTrack && testimonialDotsWrap) {
    const testimonialCards = testimonialTrack.querySelectorAll('.testimonial-card');
    let activeTestimonial = 0;

    testimonialCards.forEach((card, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => showTestimonial(i));
        testimonialDotsWrap.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => card.classList.toggle('active', i === index));
        testimonialDotsWrap.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
        activeTestimonial = index;
    }

    showTestimonial(0);

    setInterval(() => {
        showTestimonial((activeTestimonial + 1) % testimonialCards.length);
    }, 10000);
}