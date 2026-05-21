import app from "./app"
import config from "./config"
import { initDB } from "./db";

// server running
(async () => {
    // call db
    initDB();
    app.listen(config.port, () => {
        console.log(`as-2 server running on port:${config.port}`)
    })
})();