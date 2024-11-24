import {app} from "./app/app.js";
import {logger} from "./app/logging.js";

app.listen(process.env.PORT, () => {
    logger.info("App started on port 3000");
});