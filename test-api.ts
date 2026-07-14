import { apiClient } from "./src/services/api-client";

apiClient.get("/projects", { params: { page: 1, limit: 3 } })
    .then(data => {
        console.log("Is Array?", Array.isArray(data));
        console.log("Meta:", (data as any)._meta);
    })
    .catch(err => {
        console.error(err);
    });
