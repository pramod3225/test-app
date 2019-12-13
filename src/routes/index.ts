import { Router } from 'express';
import FeedRouter from './FeedRoute';

// Init router and path
const router = Router();



// Add sub-routes
router.use('/feeds', FeedRouter);

// Export the base-router
export default router;
