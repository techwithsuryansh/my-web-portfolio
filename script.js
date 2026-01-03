// Simple and clean JavaScript

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    
    // Save preference
    if (body.classList.contains('light')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Menu Toggle - FIXED
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = mobileToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--accent)';
        }
    });
});

// Contact Form
const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

emailjs.init("WVuI4iijgNv1mcJ2J"); // must be here OR in HTML

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  sendBtn.textContent = "Sending...";
  sendBtn.disabled = true;

  emailjs.sendForm(
    "service_fnvqzak",      // 🔴 YOUR SERVICE ID
    "template_4x59y08",      // 🔴 YOUR TEMPLATE ID
    this
  )
  .then(() => {
    alert("Message sent successfully ✅");
    sendBtn.textContent = "Send Message";
    sendBtn.disabled = false;
    contactForm.reset();
  })
  .catch((error) => {
    console.error("EmailJS error:", error);
    alert("Failed to send message ❌");
    sendBtn.textContent = "Send Message";
    sendBtn.disabled = false;
  });
});




// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('Portfolio loaded! Hamburger menu is working.');
