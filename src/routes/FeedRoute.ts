import { Request, Response, Router } from 'express';
import { FeedController } from "../controllers";
import { IFeed } from '../models';
import { logger } from "../helper";


const router: Router = Router();
const feedController = new FeedController();


router.get('/search', async (req: Request, res: Response) => {
    try {
        let { term } = req.query;
        const feeds: IFeed[] = await feedController.search(term)
        return res.status(200).json(feeds);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(500).json({
            error: err.message,
        });
    }
});

export default router;