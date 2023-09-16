import '../styles/dropdown.css';

import { parseHTMLElement } from '../util';

/**
 * Returns an element that wraps the content in a dropdown button
 * @param {string} text - The text in button indicating the dropdown
 * @param {HTMLElement} content - Element shown when dropped down
 * @returns {HTMLElement}
 */
export function dropdown(text, content) {
    let container = parseHTMLElement(`
    <div class="dropdown">
        <button class='dropdown-button'>${text}</button>
        <div class='dropdown-content hide'></div>
    </div>
    `);

    let contentContainer = container.querySelector('.dropdown-content');
    contentContainer.appendChild(content);
    let button = container.querySelector('.dropdown-button');
    button.onclick = () => { contentContainer.classList.toggle("hide") };
    return container;
}
