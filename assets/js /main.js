// ========================================
// أكاديمية الفلاح - الملف الرئيسي
// ========================================

(function() {
    'use strict';

    // ========== العناصر DOM ==========
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const backToTop = document.getElementById('backToTop');
    const header = document.getElementById('header');

    // ========== نظام الوضع المظلم (Dark Mode) ==========
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // ========== القائمة المتنقلة (Mobile Menu) ==========
    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // إغلاق القائمة عند النقر على رابط فيها
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });

    // ========== رأس متحرك (Sticky Header with Shadow) ==========
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll();

    // ========== زر العودة للأعلى (Back to Top) ==========
    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    if (backToTop) {
        window.addEventListener('scroll', handleBackToTop);
        backToTop.addEventListener('click', scrollToTop);
    }

    // ========== التنقل النشط (Active Navigation) ==========
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        let current = '';
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();

    // ========== تحريك الأرقام الإحصائية (Statistics Counter) ==========
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            if (stat.dataset.animated === 'true') return;
            
            const finalValue = parseInt(stat.getAttribute('data-count'));
            if (isNaN(finalValue)) return;
            
            let current = 0;
            const duration = 1500;
            const increment = Math.ceil(finalValue / 30);
            let interval = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    stat.textContent = finalValue + '+';
                    clearInterval(interval);
                    stat.dataset.animated = 'true';
                } else {
                    stat.textContent = current + '+';
                }
            }, 50);
        });
    }

    // مراقبة عند ظهور العنصر في الشاشة
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.about-stats-card');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // ========== تأثيرات ظهور العناصر (Fade In on Scroll) ==========
    const fadeElements = document.querySelectorAll('.scholarship-card, .feature-card, .channel-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // ========== منع النقر على الروابط المعطلة (للصفحات المنتهية) ==========
    const disabledBtns = document.querySelectorAll('.btn[disabled]');
    disabledBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // ========== إغلاق القائمة عند تغيير حجم الشاشة ==========
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1024) {
                closeMobileMenu();
            }
        }, 250);
    });

    // ========== تحسين أداء الروابط (Preload للروابط الداخلية) ==========
    const internalLinks = document.querySelectorAll('a[href^="#"], a[href^="index"], a[href^="iraq"], a[href^="saudi"], a[href^="turkey"], a[href^="diyanet"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && href !== 'index') {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        });
    });

    // ========== تهيئة الصفحة ==========
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
        
        // إزالة preloader إذا وجد
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }

        // إضافة حماية للروابط الخارجية (فتح في تبويب جديد)
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    });

})();
