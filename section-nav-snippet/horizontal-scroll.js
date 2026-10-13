/*
  Horizontal scroll-on-overflow for .scrollable-list components.
  Vanilla JS, no dependencies. Drives the fade masks and prev/next
  buttons defined in section-nav.css.
*/

const scrollThreshold = 5;
const listItemSelector = '.section-nav__item';

function horizontalScrollFade(el) {
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    el.classList.toggle('scrolled', scrollLeft > scrollThreshold);
    el.classList.toggle('end-scrolled', scrollLeft >= maxScrollLeft - scrollThreshold);
}

function isOverflown(el) {
    return el.scrollWidth > el.clientWidth + 1;
}

function checkNavOverflow(lists) {
    lists.forEach(item => item.classList.toggle('js-is-overflown', isOverflown(item)));
}

function debounce(fn, delay) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
    };
}

function initScrollableList(wrapper) {
    const list = wrapper.querySelector('.scrollable-list');
    if (!list) return;

    const prevBtn = wrapper.querySelector('.scrollable-list__btn-prev');
    const nextBtn = wrapper.querySelector('.scrollable-list__btn-next');

    // Cache the item element reference; width is read at click time to stay responsive
    const listItem = list.querySelector(listItemSelector);

    // Update scroll fade classes as the list is scrolled
    let scheduledAnimationFrame = false;
    list.addEventListener('scroll', () => {
        if (scheduledAnimationFrame) return;
        scheduledAnimationFrame = true;
        requestAnimationFrame(() => {
            scheduledAnimationFrame = false;
            horizontalScrollFade(list);
        });
    });

    // Scroll the list by one item width in the given direction
    function handleScroll(direction) {
        if (!listItem) return;
        const newPosition = direction === 'next'
            ? list.scrollLeft + listItem.offsetWidth
            : Math.max(0, list.scrollLeft - listItem.offsetWidth);

        list.scrollTo({ left: newPosition, behavior: 'smooth' });
    }

    prevBtn?.addEventListener('click', () => handleScroll('prev'));
    nextBtn?.addEventListener('click', () => handleScroll('next'));
}

document.addEventListener('DOMContentLoaded', () => {
    const scrollableLists = document.querySelectorAll('.scrollable-list');
    const wrappers = document.querySelectorAll('.scrollable-list__wrapper');

    checkNavOverflow(scrollableLists);
    wrappers.forEach(initScrollableList);

    window.addEventListener('resize', debounce(() => checkNavOverflow(scrollableLists), 150));
});
