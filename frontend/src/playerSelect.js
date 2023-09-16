import { dropdown } from './components/dropdown';
import { searchBar } from './components/searchBar';
import { parseHTML, backendURL, parseHTMLElement, documentFragment } from './util';


export async function setupPlayerSelect(element) 
{   
    const resp = await fetch(backendURL + 'All_Players', { mode: "cors" });
    let playersData = await resp.json();
    let optionsUL = parseHTMLElement(`<ul> </ul>`);
    
    for (const playerData of playersData) {
        let optionLI = parseHTML(`<li><a href="/player/${playerData[0]}">${playerData[1]}</a></li> `)
        optionsUL.appendChild(optionLI);
    }

    let search = searchBar(optionsUL.children);
    let dropdownContent = documentFragment([search, optionsUL]);

    let dropdownElement = dropdown("Select Player", dropdownContent);

    element.appendChild(dropdownElement);
}
