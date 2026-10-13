# Section Nav

Sticky in-page navigation with a mobile-collapsed dropdown, horizontal
scroll-on-overflow for desktop, and a custom scrollspy (built to
replace Bootstrap's ScrollSpy, which drops active state on
zero-height anchor targets).

## Features

- **Sticky**: `#sectionNav` uses `position: sticky` so it stays pinned near the top of the viewport while its section is in view. Set `top` in `section-nav.css` to match your site's fixed header height (or `0` if you have none).
- **Horizontal scroll on overflow (desktop)**: when the nav items don't fit in one row, prev/next buttons fade in and scroll the list by one item at a time, with a mask-image fade at the scrolled edge. Below the `lg` breakpoint the nav switches to the mobile dropdown instead (see below).
- **Mobile dropdown**: below `lg`, the nav collapses behind a "Select a Section" toggle button (Bootstrap's Collapse component), closing itself on section click, outside click, or scroll.
- **Custom scrollspy**: tracks scroll position against each linked section directly (rather than Bootstrap's built-in ScrollSpy) so it doesn't drop the active state on zero-height anchor targets. Also keeps `scroll-padding-top` in sync with the sticky nav's height so anchor jumps land below it instead of underneath it.

## Files

- `section-nav.html` — markup. The `<li>` items are usually looped from CMS data.
- `section-nav.css` — component styles + the shared scrollable-list styles (fade masks, prev/next buttons).
- `images/icon-arrow-right.svg`, `images/icon-arrow-right-white.svg` — prev/next button icons (referenced by `section-nav.css`).
- `section-nav.js` — the scrollspy logic, scroll-padding adjustment, and mobile-collapse close behaviors.
- `horizontal-scroll.js` — vanilla, dependency-free scroll/overflow logic for the prev/next buttons. Shared with other scrollable-list components (tabs, etc.) in the source project; trimmed here to just `.section-nav__item`.
- `preview.html` — standalone demo page (pulls Bootstrap + jQuery from a CDN just so it's viewable on its own — don't ship this file, and don't double-load Bootstrap/jQuery if your project already has them).

## Dependencies

- jQuery
- Bootstrap's Collapse component (for `data-bs-toggle="collapse"` on the mobile toggle button) — only the Collapse plugin is needed, not all of Bootstrap.
- A build step that supports native CSS nesting (Sass/PostCSS) or a modern browser, since `section-nav.css` uses `&` nesting.

## Integration steps

1. Drop `section-nav.html`'s markup where the nav should appear; wire the `<li>` loop to real content sections and matching anchor IDs.
2. Add `section-nav.css` and the two SVGs.
3. Load `horizontal-scroll.js`, then `section-nav.js` (after jQuery + Bootstrap).
