(function () {
    'use strict';

    function onReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    function revealElements() {
        var reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) {
            return;
        }

        window.requestAnimationFrame(function () {
            reveals.forEach(function (el, index) {
                setTimeout(function () {
                    el.classList.add('show');
                }, index * 100);
            });
        });
    }

    function initSmoothScroll() {
        var anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            link.addEventListener('click', function (event) {
                try {
                    var target = document.querySelector(href);
                    if (target) {
                        event.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                } catch (error) {
                    console.warn('Smooth scroll failed for:', href, error);
                }
            });
        });
    }

    function initFaqToggle() {
        var toggles = document.querySelectorAll('.faq-toggle');
        if (!toggles.length) {
            return;
        }

        toggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var faqItem = toggle.closest('.faq-item');
                if (!faqItem) {
                    return;
                }

                var isOpen = faqItem.classList.toggle('open');
                toggle.setAttribute('aria-expanded', String(isOpen));

                // Close other FAQ items if there are any open
                document.querySelectorAll('.faq-item.open').forEach(function (item) {
                    if (item !== faqItem) {
                        item.classList.remove('open');
                        var button = item.querySelector('.faq-toggle');
                        if (button) {
                            button.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
            });
        });
    }

    onReady(function () {
        revealElements();
        initSmoothScroll();
        initFaqToggle();
    });
})();
