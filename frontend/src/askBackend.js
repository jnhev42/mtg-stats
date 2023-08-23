
export async function setupAskBackend(element) {
    const resp = await fetch("https://backend.jnhev42.workers.dev/", { mode: "cors" });
    const text = await resp.text();
    element.innerHTML = text;
}