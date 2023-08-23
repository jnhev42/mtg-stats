import BACKEND_URL from './backendURL'

export async function setupAskBackend(element) {
    const resp = await fetch(BACKEND_URL, { mode: "cors" });
    const text = await resp.text();
    element.innerHTML = text;
}