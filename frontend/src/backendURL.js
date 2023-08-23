const PORT = import.meta.env.VITE_DEV_PORT;
const URL = import.meta.env.DEV ? `http://localhost:${PORT}/` : "https://backend.jnhev42.workers.dev/";

export default URL;
