// ===================================
// APOORV KATIYAR PORTFOLIO - Main JS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initScrollToTop();
    initTypingEffect();
    initIntersectionObserver();
    initSmoothScroll();
    initThemeToggle();
    initInteractiveTerminal();
    initContactForm();
});

// ===================================
// THEME TOGGLE
// ===================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// ===================================
// INTERACTIVE TERMINAL
// ===================================
function initInteractiveTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminal = document.getElementById('terminal');
    
    if (!terminalInput || !terminalOutput) return;

    // Command history
    let commandHistory = [];
    let historyIndex = -1;

    // Available commands and their outputs
    const commands = {
        help: () => ({
            type: 'info',
            text: `Available commands:
  help       - Show this help message
  whoami     - Display user info
  about      - Learn about me
  skills     - View my technical skills
  projects   - See my achievements
  experience - Work history
  certs      - Certifications
  contact    - Get my contact info
  social     - Social media links
  neofetch   - System info style
  date       - Current date & time
  clear      - Clear the terminal
  theme      - Toggle dark/light mode
  ls         - List files
  cat [file] - Read a file
  hire       - Let's work together!`
        }),
        
        whoami: () => ({
            type: 'success',
            text: 'apoorv-katiyar'
        }),
        
        about: () => ({
            type: 'output',
            text: `Hi! I'm Apoorv Katiyar 👋
Application Development Analyst @ Accenture

🎯 4+ Years in DevOps & CI/CD
📍 Based in Bengaluru, India
🎓 B.Tech CSE - LPU (2017-2021)

Currently leading CI/CD migrations and
building reusable pipeline components!`
        }),
        
        skills: () => ({
            type: 'output',
            text: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 CI/CD: GitLab CI/CD, GitHub Actions, Jenkins
📦 Containers: Docker, Kubernetes
☁️  Cloud: AWS (EC2, S3, IAM, RDS, ELB)
🏗️  IaC: Terraform, CPC Templates
🔒 Security: SonarQube, Snyk
💻 Languages: Python, Linux, Shell`
        }),
        
        projects: () => ({
            type: 'output',
            text: `Key Achievements:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. GitLab → GitHub Actions Migration
   → 🏆 Client Champion Award
   
2. CPC Templates (Node.js, Java, Python, .NET)
   → Used by multiple teams
   
3. DORA Metrics Implementation
   → Better deployment insights
   
4. CI/CD for 50+ Apps
   → ⚡ 50% faster deployments`
        }),
        
        contact: () => ({
            type: 'success',
            text: `📧 Email: Katiyar.apoorv97@gmail.com
📱 Phone: +91 8960050564
🔗 LinkedIn: linkedin.com/in/apoorvkatiyar
💻 GitHub: github.com/apoorv-katiyar

Feel free to reach out!`
        }),
        
        social: () => ({
            type: 'info',
            text: `Social Links:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GitHub:    github.com/apoorv-katiyar
LinkedIn:  linkedin.com/in/apoorvkatiyar
Twitter:   twitter.com/KatiyarApoorv
Instagram: instagram.com/ap00rvkatiyar`
        }),
        
        date: () => ({
            type: 'output',
            text: new Date().toString()
        }),
        
        clear: () => {
            terminalOutput.innerHTML = '';
            return null;
        },
        
        theme: () => {
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) themeToggle.click();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            return {
                type: 'success',
                text: `Theme switched to ${currentTheme === 'dark' ? 'light' : 'dark'} mode!`
            };
        },
        
        ls: () => ({
            type: 'output',
            text: 'about.txt  skills.txt  projects/  contact.txt  awards.txt  README.md'
        }),
        
        pwd: () => ({
            type: 'output',
            text: '/home/apoorv-katiyar/portfolio'
        }),
        
        cat: (args) => {
            const file = args[0];
            if (!file) return { type: 'error', text: 'Usage: cat <filename>' };
            
            const files = {
                'about.txt': 'Application Development Analyst @ Accenture | 4+ Years DevOps',
                'skills.txt': 'GitLab CI/CD, GitHub Actions, Docker, Kubernetes, AWS, Terraform, Python, Linux',
                'contact.txt': 'Email: Katiyar.apoorv97@gmail.com | Phone: +91 8960050564',
                'README.md': '# Apoorv Katiyar - DevOps Engineer\nSpecializing in CI/CD, Cloud, and Automation',
                'awards.txt': '🏆 XTRA MILE Award\n🏆 Client Champion Award\n🏆 Commitment of Excellence'
            };
            
            if (files[file]) {
                return { type: 'output', text: files[file] };
            }
            return { type: 'error', text: `cat: ${file}: No such file or directory` };
        },
        
        echo: (args) => ({
            type: 'output',
            text: args.join(' ') || ''
        }),
        
        neofetch: () => ({
            type: 'info',
            text: `
       ██╗  ██╗██╗
       ██║ ██╔╝██║     apoorv-katiyar@accenture
       █████╔╝ ██║     ─────────────────────────
       ██╔═██╗ ██║     Role: Application Dev Analyst
       ██║  ██╗██║     Exp: 4+ years DevOps
       ╚═╝  ╚═╝╚═╝     Stack: CI/CD, K8s, AWS
                       Location: Bengaluru, IN
                       Certs: KCNA, Docker, GitHub
`
        }),
        
        sudo: () => ({
            type: 'error',
            text: 'Nice try! 😄 But you don\'t have sudo access here.'
        }),
        
        exit: () => ({
            type: 'info',
            text: 'Thanks for visiting! Scroll down to explore more. 👇'
        }),
        
        hire: () => ({
            type: 'success',
            text: `🎉 Great choice! Let's connect:
📧 Email: Katiyar.apoorv97@gmail.com
📱 Phone: +91 8960050564
🔗 LinkedIn: linkedin.com/in/apoorvkatiyar`
        }),
        
        experience: () => ({
            type: 'output',
            text: `Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Accenture, Bangalore
   Application Development Analyst
   Feb 2022 - Present

📍 Wiculty Learning Solutions
   Research Analyst Intern
   Apr 2021 - Sep 2021`
        }),
        
        certs: () => ({
            type: 'success',
            text: `Certifications:
✓ KCNA - Kubernetes & Cloud Native Associate
✓ GitHub Actions - KodeKloud
✓ Docker - KodeKloud
✓ JIO Digital Championship (Platinum)`
        })
    };

    // Add command line to output
    function addLine(text, type = 'output', isCommand = false) {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        
        if (isCommand) {
            line.innerHTML = `<span class="prompt">$</span> <span class="command">${escapeHtml(text)}</span>`;
        } else {
            line.innerHTML = text.replace(/\n/g, '<br>');
        }
        
        terminalOutput.appendChild(line);
        scrollTerminal();
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Scroll terminal to bottom
    function scrollTerminal() {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Process command
    function processCommand(input) {
        const trimmed = input.trim();
        if (!trimmed) return;

        // Add to history
        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        // Show command in output
        addLine(trimmed, 'output', true);

        // Parse command and arguments
        const parts = trimmed.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Execute command
        if (commands[cmd]) {
            const result = commands[cmd](args);
            if (result) {
                addLine(result.text, result.type);
            }
        } else {
            addLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    }

    // Handle input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(terminalInput.value);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Simple tab completion
            const input = terminalInput.value.toLowerCase();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            commands.clear();
        }
    });

    // Focus terminal on click
    terminal.addEventListener('click', () => {
        terminalInput.focus();
    });
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

// ===================================
// SCROLL EFFECTS
// ===================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===================================
// SCROLL TO TOP
// ===================================
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// TYPING EFFECT
// ===================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = [
        'DevOps Engineer',
        'Cloud Architect',
        'Automation Expert',
        'Code Fanatic'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing after initial delay
    setTimeout(type, 1500);
}

// ===================================
// INTERSECTION OBSERVER - Scroll Animations
// ===================================
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .blog-card, .about-content, .contact-content'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Staggered animation for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
    });

    // Staggered animation for blog cards
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ===================================
// SMOOTH SCROLL for anchor links
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle edge case for just "#"
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Get navbar height for offset
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.form-submit');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="material-icons-round">hourglass_empty</span> Sending...';
        submitBtn.disabled = true;
        status.textContent = '';
        status.className = 'form-status';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                status.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                status.className = 'form-status success';
                form.reset();
                
                // Reset button with success state briefly
                submitBtn.innerHTML = '<span class="material-icons-round">check_circle</span> Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error
            status.textContent = '✗ Oops! Something went wrong. Please try again or email me directly.';
            status.className = 'form-status error';
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
