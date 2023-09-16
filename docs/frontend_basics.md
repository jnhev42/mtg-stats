# A file by file breakdown
### Easy ones
`.gitignore` tells git what files never to track
`package-lock.json` stores specific versions of our dependencies that we use, not important for us
`/node_modules/` this is where all the code for the libraries we use is, in this case just `vite`

### `package.json`
This contains information for `npm` (node [package manager](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management)) to run our project. 
First it has the name and version of our project and `private : true` meaning it shouldn't be published. This is because `npm` models all projects as packages, even ones nobody ever imports.
`type: module` is saying we are using `import` in our javascript.
`scripts` includes all the stuff you can do with `npm run <script name>`.
`devDependencies` includes packages we need to develop the app but aren't required when a user runs the app in the browser. Our only one is `vite` which does a few things, obviously the nice hot reloading, as well as "compiling" our website to be sent to users. This doesn't mean compiling the javascript but rather bundling all the scripts into one file to make it easier & faster to send over the network (and do the same with `.css`). This process is called minification because it makes the files smaller.

### `/public/`
This contains assets actually hosted on our server rather than being minified by Vite. Right now it only has our icon (which happens to be the genderfluid logo for a placeholder).

### `index.html`
This is the file that Vite starts from when minifying, then it sees the `<script>` element and goes to `src/main.js`. The file itself contains a `<head>` with some basic metadata and a `<body>` that contains a single `div` whic our `main.js` will change.

# `/src/` The tough part
Now since any one of these files can't be understood on its own you might need to jump around this explanation a bit

### `main.js`
```js
// load the stylesheet about the whole document
import './styles/common.css'
import { setupPlayerSelect } from './playerSelect.js'

// change main div's content
document.querySelector('#app').innerHTML = `
  <div id="player-select"> </div>      
`;

// change the content of the player-select div to contain
// the player selector logic
setupPlayerSelect(document.querySelector('#player-select'));
```



### `playerSelect.js`
```js
import { dropdown } from './components/dropdown';
import { searchBar } from './components/searchBar';
import { parseHTML, backendURL, parseHTMLElement, documentFragment } from './util';
// look at how these imports are used in the

export async function setupPlayerSelect(element) 
{   
    // fetch the player list from the backend
    const resp = await fetch(backendURL + 'All_Players', { mode: "cors" });
    let playersData = await resp.json();

    // create the list all of the options are within
    let optionsUL = parseHTMLElement(`<ul> </ul>`);
    for (const playerData of playersData) {
        // create links to go to each player's page
        let optionLI = parseHTML(`<li><a href="/player/${playerData[0]}">${playerData[1]}</a></li> `)
        optionsUL.appendChild(optionLI);
    }

    // the search bar should go through the list we just created so we pass
    // the childen of optionsUL (which is all the <li>s)
    let search = searchBar(optionsUL.children);

    // we want the search above the options in the dropdown
    let dropdownContent = documentFragment([search, optionsUL]);

    // create a dropdown with a search
    let dropdownElement = dropdown("Select Player", dropdownContent);

    // and finally add that to our div in main!
    element.appendChild(dropdownElement);
}
```

### `util.js`
This stores various utility functions to be used thoughout the project for convenience. I reccomend reading some MDN documentation about the types involved in these functions but all they really do is make our code shorter and clearer.
```js
// This is a JSDoc comment, it specifies the input & output
// types for a function
/**
 * @param {string} html
 * @returns {DocumentFragment}
 */
// This is a roundabout way of doing it but its the only way
export function parseHTML(html) {
    let t = document.createElement('template');
    t.innerHTML = html;
    return t.content;
}

/**
 * @param {string} html
 * @returns {HTMLElement}
 */
// Also a pretty strange looking approach
export function parseHTMLElement(html) {
    let fragment = parseHTML(html);
    if (fragment.childElementCount !== 1) {
        throw new Error("Invalid HTML Element fragment");
    }
    return fragment.firstElementChild;
}

// a document fragment is just a fancy version of a list
// of elements that we have to use for complicated reasons
// this function is most useful for when you want to add 
// more than one HTML element in a list without having to
// create a whole new element to put them both in
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

// the URL of our backend server
// changes depending on whether its running locally 
// or on a server
const PORT = 8646;
export const backendURL = import.meta.env.DEV ? `http://localhost:${PORT}/` : "https://backend.jnhev42.workers.dev/";
```

## `/components/`
Now this is the big idea here, these are functions that generate parts of our page that can be re-used in different places to make our code shorter. They are easy to reuse because they are **pure** which is a fancy way of saying that if you put in the same inputs you will always get the same outputs - meaning you don't change any global variables in the function. The benefits of this can be seen in `playerSelect.js` where the two components, `dropdown.js` and `searchBar.js` work together to make a searchable dropdown without knowing about each other at all.

### `searchBar.js`

```js
import '../styles/searchBar.css';

import { parseHTMLElement } from '../util';
/**
 * Returns a search bar that only shows elements that match its text
 * @param {HTMLElement[]} toSearch - Element shown when dropped down
 * @returns {HTMLElement}
 */
export function searchBar(toSearch) {
    // this is the HTML element we're adding functionality to
    let search = parseHTMLElement(`<input class='search-bar' type='text' placeholder='Search...'></input>`);
    // every time a user types a key into the box this is run
    search.onkeyup = () => {
        // this is what the user has inputted
        // uppercase to make our search case-insensitive
        let filter = search.value.toUpperCase();
        for (const searchItem of toSearch) {
            // this also has to be made uppercase
            // its the "text" of the element being searched
            let text = searchItem.innerText.toUpperCase();
            // if the filter is empty then we show all of them
            // othewise we only want to show something if it matches
            // the users search
            // confusingly we are adding/removing hide rather than the other
            // way around but it still works the same
            if (filter !== "" && !(text.match(filter))) {
                searchItem.classList.add("hide");
            } else {
                searchItem.classList.remove("hide");
            }
            
        }
    }
    // return the newly created element with the input event handler
    return search;
}
```

### `dropdown.js`
```js
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
    // when the button is clicked show or hide the content
    button.onclick = () => { contentContainer.classList.toggle("hide") };
    return container;
}
```

