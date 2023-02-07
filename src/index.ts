import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from '../app';

/**
 * Environment Variable Setup
 */
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
if (!PORT) process.exit(1);

/**
 * Datasource Connection
 */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL as string)
  .then(() => console.log('Connected to database.'))
  .catch((err => console.log(err)));

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});