import express from "express";
import routes from "./routes/indexRoutes.js";
import helmet from "helmet";
import cors from "cors"
import { corsOption } from "./config/cors.js";
import { generalLimiter } from "./config/rateLimit.js";
import morgan from "morgan";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors(corsOption));
app.use(cookieParser());
app.use(helmet());

app.use(generalLimiter);

app.use(morgan("dev", {
    stream: {
        write: (message) => logger.info(message.trim()),
    },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use("/uploads", express.static("uploads"));

app.use("/api", routes);

app.use(errorHandler);

export default app;