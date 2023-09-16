import '../styles/searchBar.css';

import { parseHTMLElement } from '../util';
/**
 * Returns a search bar that only shows elements that match its text
 * @param {HTMLElement[]} toSearch - Element shown when dropped down
 * @returns {HTMLElement}
 */
export function searchBar(toSearch) {
    let search = parseHTMLElement(`<input class='search-bar' type='text' placeholder='Search...'></input>`);

    search.onkeyup = () => {
        let filter = search.value.toUpperCase();
        for (const searchItem of toSearch) {
            let text = searchItem.innerText.toUpperCase();

            if (filter !== "" && !(text.match(filter))) {
                searchItem.classList.add("hide");
            } else {
                searchItem.classList.remove("hide");
            }
            
        }
    }
    return search;
}
