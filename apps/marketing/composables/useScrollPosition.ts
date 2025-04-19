import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Default scroll threshold in pixels.
 * @constant {number}
 */
const DEFAULT_THRESHOLD = 60;

/**
 * Custom Vue Composition API hook that tracks the window scroll position
 * and provides a reactive flag indicating whether the scroll is within
 * the defined threshold from the top of the page.
 *
 * @param {number} threshold - The pixel distance from the top at which the
 *                             'isAtTop' flag becomes false.
 * @returns {{ isAtTop: import('vue').Ref<boolean>, scrollToTop: Function }}
 *          An object containing the reactive 'isAtTop' flag and a
 *          'scrollToTop' function for smooth scrolling to the top.
 */
export function useScrollPosition(threshold = DEFAULT_THRESHOLD) {
    // Reactive reference indicating if the window is scrolled within the threshold
    const isAtTop = ref(true);

    // Update handler that sets 'isAtTop' based on current scroll position
    const update = () => {
        isAtTop.value = window.scrollY <= threshold;
    };

    // Register scroll listener on mount and initialize the flag
    onMounted(() => {
        window.addEventListener('scroll', update);
        update();
    });

    // Clean up scroll listener on unmount to prevent memory leaks
    onUnmounted(() => {
        window.removeEventListener('scroll', update);
    });

    // Smoothly scrolls the window back to the top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Expose the reactive flag and the scrollToTop function
    return {
        isAtTop,
        scrollToTop
    };
}