import app from "./app";
import db from './utils/pg'
import config from "./config/config";

(async function () {
    // Connect Database
    await db();
    const PORT = config.PORT || 3000;
    const server = app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}`);
    })

    process.on("unhandledRejection", (err) => {
        console.log(`Error: ${err}`);
        // Close server & exit process
        server.close(() => process.exit(1));
    });
})();