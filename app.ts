import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { MonsterRouter } from './src/blocks/monster/monster.router';
import { errorHandler } from './src/middleware/error.middleware';
import { notFoundHandler } from './src/middleware/not-found.middleware';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routers
app.use('/api/block', MonsterRouter.instance().router);

// Error handling
app.use(errorHandler); // Handle errors
app.use(notFoundHandler); // Handle 404s
