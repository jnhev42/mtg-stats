/**
 * @param {string} html
 * @returns {DocumentFragment}
 */
export function parseHTML(html) {
    let t = document.createElement('template');
    t.innerHTML = html;
    return t.content;
}

/**
 * @param {string} html
 * @returns {HTMLElement}
 */
export function parseHTMLElement(html) {
    let fragment = parseHTML(html);
    if (fragment.childElementCount !== 1) {
        throw new Error("Invalid HTML Element fragment");
    }
    return fragment.firstElementChild;
}

/**
 * @param {HTMLElement[]} elements
 * @returns {DocumentFragment}
 */
export function documentFragment(elements) {
    let fragment = document.createDocumentFragment();
    for (const element of elements) {
        fragment.appendChild(element);
    }
    return fragment;
}

const PORT = 8646;
export const backendURL = import.meta.env.DEV ? `http://localhost:${PORT}/` : "https://backend.jnhev42.workers.dev/";
