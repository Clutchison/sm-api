/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import { MonsterRouter } from "./blocks/monster/monster.router";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const DB_URL: string = process.env.DB_URL as string;

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/block', MonsterRouter.instance().router);

// Error handling
app.use(errorHandler); // Handle errors
app.use(notFoundHandler); // Handle 404s

/**
 * Datasource Connection
 */
mongoose.set('strictQuery', false);
mongoose.connect(DB_URL)
  .then(() => console.log('Connected to database.'))
  .catch((err => console.log(err)));

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});