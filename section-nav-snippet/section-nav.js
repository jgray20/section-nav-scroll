/*
  Section Nav behavior
  Requires: jQuery + Bootstrap's Collapse component (for the mobile toggle).
  Load after jQuery/Bootstrap and after horizontal-scroll.js.
*/
(function ($) {

    const sectionNav = document.querySelector('#sectionNav');
    if (!sectionNav) return;

    const AnchornavToggleButton = $('#sectionNavCollapseToggle');
    const AnchornavDefaultButtonText = AnchornavToggleButton.text();

    // Custom scrollspy substitute for the section nav — Bootstrap's built-in
    // ScrollSpy can drop the active state on zero-height anchor targets, so
    // this tracks each linked section's position directly instead.
    (function initSectionScrollSpy() {
        const navLinks = Array.from(document.querySelectorAll('.js-section-nav-list .nav-link'));
        if (!navLinks.length) return;

        const sections = navLinks.map(link => ({
            link,
            el: document.getElementById(link.getAttribute('href').slice(1))
        })).filter(s => s.el);

        let currentActive = null;

        function onScroll() {
            const offset = sectionNav.getBoundingClientRect().bottom + 30;
            let active = null;

            for (const section of sections) {
                if (section.el.getBoundingClientRect().top <= offset) {
                    active = section;
                }
            }

            if (active === currentActive) return;
            currentActive = active;

            navLinks.forEach(link => link.classList.remove('active'));

            if (active) {
                active.link.classList.add('active');
                AnchornavToggleButton.html(active.link.textContent.trim());
            } else {
                AnchornavToggleButton.html(AnchornavDefaultButtonText);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    })();

    // Since #sectionNav is sticky, keep the browser's anchor-jump target
    // (and any `scroll-into-view`) from landing underneath it.
    (function initScrollPadding() {
        function updateScrollPadding() {
            document.documentElement.style.scrollPaddingTop = (sectionNav.offsetHeight + 20) + 'px';
        }

        updateScrollPadding();
        window.addEventListener('resize', updateScrollPadding);
    })();

    // Close the mobile collapse when a section is chosen
    $('.section-nav__collapse .section-nav__item').on('click', function () {
        $(this).closest('.section-nav__collapse').collapse('hide');
    });

    // Close the mobile collapse when clicking outside it
    $(document).mouseup(function (e) {
        if (!$(e.target).is('.section-nav__collapse, .section-nav__collapse *')) {
            $('.section-nav__collapse').collapse('hide');
        }
    });

    // Close the mobile collapse on scroll
    $(globalThis).on('scroll.collapseOnScroll', function () {
        if ($('.section-nav__collapse').hasClass('show')) {
            $('.section-nav__collapse').collapse('hide');
        }
    });

})(jQuery);
