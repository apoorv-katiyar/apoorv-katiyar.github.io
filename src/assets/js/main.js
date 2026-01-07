/**
 * APOORV KATIYAR PORTFOLIO
 * Optimized JavaScript
 * @version 2.0
 */

'use strict';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Apply theme immediately to prevent flash
    applyTheme();
    
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
}

// ===================================
// THEME MANAGEMENT
// ===================================
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animation feedback
        themeToggle.style.transform = 'scale(0.9)';
        requestAnimationFrame(() => {
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        });
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

    let commandHistory = [];
    let historyIndex = -1;

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
        
        whoami: () => ({ type: 'success', text: 'apoorv-katiyar' }),
        
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
Twitter:   twitter.com/KatiyarApoorv`
        }),
        
        date: () => ({ type: 'output', text: new Date().toLocaleString() }),
        
        clear: () => {
            terminalOutput.innerHTML = '';
            return null;
        },
        
        theme: () => {
            document.querySelector('.theme-toggle')?.click();
            const theme = document.documentElement.getAttribute('data-theme');
            return { type: 'success', text: `Theme: ${theme === 'dark' ? 'light' : 'dark'} mode` };
        },
        
        ls: () => ({ type: 'output', text: 'about.txt  skills.txt  projects/  contact.txt  awards.txt  README.md' }),
        pwd: () => ({ type: 'output', text: '/home/apoorv-katiyar/portfolio' }),
        
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
            
            return files[file] 
                ? { type: 'output', text: files[file] }
                : { type: 'error', text: `cat: ${file}: No such file or directory` };
        },
        
        echo: (args) => ({ type: 'output', text: args.join(' ') || '' }),
        
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
                       Certs: KCNA, Docker, GitHub`
        }),
        
        sudo: () => ({ type: 'error', text: "Nice try! 😄 But you don't have sudo access here." }),
        exit: () => ({ type: 'info', text: 'Thanks for visiting! Scroll down to explore more. 👇' }),
        
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

    // Escape HTML to prevent XSS
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // Add line to terminal
    const addLine = (text, type = 'output', isCommand = false) => {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        
        if (isCommand) {
            line.innerHTML = `<span class="prompt">$</span> <span class="command">${escapeHtml(text)}</span>`;
        } else {
            line.innerHTML = text.replace(/\n/g, '<br>');
        }
        
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    };

    // Process command
    const processCommand = (input) => {
        const trimmed = input.trim();
        if (!trimmed) return;

        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;
        addLine(trimmed, 'output', true);

        const [cmd, ...args] = trimmed.split(' ');
        const cmdLower = cmd.toLowerCase();

        if (commands[cmdLower]) {
            const result = commands[cmdLower](args);
            if (result) addLine(result.text, result.type);
        } else {
            addLine(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    };

    // Keyboard handling
    terminalInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Enter':
                processCommand(terminalInput.value);
                terminalInput.value = '';
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
                break;
            case 'Tab':
                e.preventDefault();
                const input = terminalInput.value.toLowerCase();
                const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
                if (matches.length === 1) terminalInput.value = matches[0];
                break;
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    commands.clear();
                }
                break;
        }
    });

    // Focus terminal on click
    terminal.addEventListener('click', () => terminalInput.focus());
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle?.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===================================
// SCROLL EFFECTS
// ===================================
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let ticking = false;

    const updateScroll = () => {
        navbar.style.boxShadow = window.scrollY > 50 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : 'none';
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });
}

// ===================================
// SCROLL TO TOP
// ===================================
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;

    let ticking = false;

    const updateVisibility = () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateVisibility);
            ticking = true;
        }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===================================
// TYPING EFFECT
// ===================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const roles = ['DevOps Engineer', 'Cloud Architect', 'Automation Expert', 'Code Fanatic'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    const type = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        typingElement.textContent = currentRole.substring(0, charIndex);

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            delay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500;
        }

        setTimeout(type, delay);
    };

    setTimeout(type, 1500);
}

// ===================================
// INTERSECTION OBSERVER
// ===================================
function initIntersectionObserver() {
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .blog-card, .about-content, .contact-content, .stat-card, .cert-card, .award-item'
    );

    if (!animateElements.length) return;

    // Add initial styles
    const style = document.createElement('style');
    style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    animateElements.forEach((el, i) => {
        el.style.cssText = `opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s;`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px', threshold: 0.1 });

    animateElements.forEach(el => observer.observe(el));
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
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
        
        submitBtn.innerHTML = '<span class="material-icons-round">hourglass_empty</span> Sending...';
        submitBtn.disabled = true;
        status.textContent = '';
        status.className = 'form-status';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                status.className = 'form-status success';
                form.reset();
                submitBtn.innerHTML = '<span class="material-icons-round">check_circle</span> Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch {
            status.textContent = '✗ Oops! Something went wrong. Please email me directly.';
            status.className = 'form-status error';
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
