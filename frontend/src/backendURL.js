const PORT = 8646;
const URL = import.meta.env.DEV ? `http://localhost:${PORT}/` : "https://backend.jnhev42.workers.dev/";

export default URL;
