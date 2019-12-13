import { Request, Response, Router } from 'express';
import { FeedController } from "../controllers";
import { IPaginatedFeed } from '../models';
import { logger } from "../helper";


const router: Router = Router();
const feedController = new FeedController();


router.get('/search', async (req: Request, res: Response) => {
    try {
        let { term, pageNo, pageSize  } = req.query;
        
        pageNo = isNaN(parseInt(pageNo))?1: parseInt(pageNo);
        pageSize = isNaN(parseInt(pageSize))?5: parseInt(pageSize);
        
        const feeds: IPaginatedFeed = await feedController.search(term, pageNo, pageSize)
        return res.status(200).json(feeds);
    } catch (err) {
        logger.error(err.message, err);
        return res.status(500).json({
            error: err.message,
        });
    }
});

export default router;