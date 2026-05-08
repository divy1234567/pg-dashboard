export const fetchAllNamespaces = async () => {
    try {
        const response = await fetch(`/api/namespaces`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return [
            "All",
            ...new Set(data.items.map((item) => item.metadata.name)),
        ];
    } catch (error) {
        console.error("Error fetching namespaces:", error);
        return [];
    }
};

export const fetchAllQueues = async () => {
    try {
        const response = await fetch(`/api/all-queues`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return [
            "All",
            ...new Set(data.items.map((item) => item.metadata.name)),
        ];
    } catch (error) {
        console.error("Error fetching queues:", error);
        return [];
    }
};

export const calculateAge = (creationTimestamp) => {
    const created = new Date(creationTimestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds}s`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours}h`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
};

export const parseCPU = (cpu) => {
    if (cpu.endsWith("m")) {
        return parseFloat(cpu.slice(0, -1));
    }
    return parseFloat(cpu) * 1000;
};

export const parseMemoryToMi = (memoryStr) => {
    if (!memoryStr) return 0;
    const value = parseInt(memoryStr);
    if (memoryStr.includes("Gi")) return value * 1024;
    if (memoryStr.includes("Mi")) return value;
    if (memoryStr.includes("Ki")) return value / 1024;
    return value / 1024 / 1024; // default Bi
};

// Localise a filter dropdown value (e.g. "All", "Running") for display while
// keeping the raw English value intact for filter logic.
// Phase/state values per resource live under `<resource>.phase|state.*` in
// the locale files, plus a shared `common.table.all` for the wildcard.
//
// `filterType` is the column key:
//   "status"    → try pods.phase → jobs.phase → podgroups.phase
//   "state"     → queues.state
//   anything else (e.g. "namespace", "queue") falls through unchanged.
const SENTINEL = "__missing__";

export const localiseFilterValue = (t, filterType, value) => {
    if (value === "All") return t("common.table.all");
    if (!value) return value;

    const lower = String(value).toLowerCase();

    if (filterType === "status") {
        for (const ns of ["pods", "jobs", "podgroups"]) {
            const result = t(`${ns}.phase.${lower}`, {
                defaultValue: SENTINEL,
            });
            if (result !== SENTINEL) return result;
        }
        return value;
    }

    if (filterType === "state") {
        return t(`queues.state.${lower}`, { defaultValue: value });
    }

    // namespace, queue, or any other free-form value — pass through.
    return value;
};
