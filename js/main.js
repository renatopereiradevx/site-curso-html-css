const onReady = (callback) => {
    if (document.readyState !== 'loading') {
        callback();
        return;
    }

    document.addEventListener('DOMContentLoaded', callback);
};

const revealElements = () => {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) {
        return;
    }

    window.requestAnimationFrame(() => {
        reveals.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('show');
            }, index * 100);
        });
    });
};

const initSmoothScroll = () => {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        link.addEventListener('click', (event) => {
            try {
                const target = document.querySelector(href);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } catch (error) {
                console.warn('Smooth scroll failed for:', href, error);
            }
        });
    });
};

const initFaqToggle = () => {
    const toggles = document.querySelectorAll('.faq-toggle');
    if (!toggles.length) {
        return;
    }

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.closest('.faq-item');
            if (!faqItem) {
                return;
            }

            const isOpen = faqItem.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));

            document.querySelectorAll('.faq-item.open').forEach((item) => {
                if (item !== faqItem) {
                    item.classList.remove('open');
                    const button = item.querySelector('.faq-toggle');
                    if (button) {
                        button.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    });
};

onReady(() => {
    revealElements();
    initSmoothScroll();
    initFaqToggle();
});
