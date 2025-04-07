// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 100);
    });
}

// Intersection Observer for skill bars
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Form submission handling
const contactForm = document.querySelector('.contact-form');

// Initialize EmailJS with your public key
emailjs.init("i0oc4ouqz2aAsQk4_");

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form data
    const formData = {
        user_name: contactForm.querySelector('#name').value,
        user_email: contactForm.querySelector('#email').value,
        message: contactForm.querySelector('#message').value,
        to_name: 'Souvik',
        timestamp: new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'long',
            timeZone: 'Asia/Kolkata'  // Indian timezone
        })
    };

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_9w1z7qc',
            'template_10bqpb3',
            formData
        );

        if (response.status === 200) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        // Show detailed error message
        console.error('EmailJS Error Details:', error);
        alert('Oops! Something went wrong. Please try again later or contact me directly at csouvik50@gmail.com');
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

const animateProjectCards = () => {
    projectCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
        
        if (isVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initial check for visible project cards
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

animateProjectCards();

// Check for visible project cards on scroll
window.addEventListener('scroll', animateProjectCards);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Function to set theme based on preference
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.classList.replace(theme === 'dark' ? 'fa-moon' : 'fa-sun', 
                              theme === 'dark' ? 'fa-sun' : 'fa-moon');
}

// Check for system preference first
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Only use saved theme if it exists, otherwise use system preference
if (savedTheme === null) {
    // First visit - use system preference
    setTheme(systemPrefersDark ? 'dark' : 'light');
} else {
    // Use saved preference
    setTheme(savedTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('theme') === null) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const cursor = document.querySelector('.cursor');
const text = "Hi, I'm Souvik Chakraborty";
let index = 0;

function type() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust typing speed here (lower = faster)
    } else {
        // Remove cursor after typing is complete
        cursor.style.display = 'none';
    }
}

// Start typing effect when the page loads
window.addEventListener('load', () => {
    setTimeout(type, 500); // Delay before starting the typing effect
}); 