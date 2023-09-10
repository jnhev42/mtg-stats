import BACKEND_URL from './backendURL'

export async function setupAllPlayers(element) 
{
    const resp = await fetch(BACKEND_URL + 'All_Players', { mode: "cors" });
    let playerlist = await resp.json();
    element.innerHTML = "<li>" + playerlist.join("</li><li>") + "</li>"
}