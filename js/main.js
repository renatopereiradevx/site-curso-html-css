// Robust JS for animations and smooth scroll
(function () {
    try {
        document.addEventListener('DOMContentLoaded', function () {
            try {
                // reveal elements (safe iteration and error handling)
                var reveals = document.querySelectorAll('.reveal');
                if (reveals && reveals.length) {
                    setTimeout(function () {
                        reveals.forEach(function (el, i) {
                            setTimeout(function () {
                                el.classList.add('show');
                            }, i * 120);
                        });
                    }, 150);
                }

                // Smooth scroll for anchor links
                var anchors = document.querySelectorAll('a[href^="#"]');
                anchors.forEach(function (a) {
                    // read raw href attribute
                    var href = a.getAttribute('href');
                    // ignore empty or plain '#' anchors which are not valid selectors
                    if (!href || href === '#') return;

                    a.addEventListener('click', function (e) {
                        // wrap selector usage in try/catch because some hrefs might not be valid selectors
                        try {
                            var target = document.querySelector(href);
                            if (target) {
                                e.preventDefault();
                                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        } catch (selErr) {
                            // invalid selector (rare) — fail gracefully
                            console.warn('Anchor navigation skipped due to invalid selector:', href, selErr);
                        }
                    });
                });


            } catch (innerErr) {
                console.error('Erro durante inicialização dos handlers da página:', innerErr);
            }
        });
    } catch (err) {
        // Catch any unexpected bootstrap / script loading issues
        console.error('Script initialization failed:', err);
    }
})();