import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { MonsterRouter } from './src/blocks/monster/monster.router';
import { errorHandler } from './src/middleware/error.middleware';
import { notFoundHandler } from './src/middleware/not-found.middleware';
import { ChallengeRatingRouter } from './src/blocks/monster/challenge-rating/challenge-rating.router';
import { SizeRouter } from './src/blocks/size/size-router';
import { AlignmentRouter } from './src/blocks/alignment/alignment-router';

export const app = express();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// Routers
app.use('/api/block/monster', MonsterRouter.instance().router);
app.use('/api/block/cr', ChallengeRatingRouter.instance().router);
app.use('/api/block/size', SizeRouter.instance().router);
app.use('/api/block/alignment', AlignmentRouter.instance().router);

// Error handling
app.use(errorHandler); // Handle errors
app.use(notFoundHandler); // Handle 404s
