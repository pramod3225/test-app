import { MockDb, IFeedData } from "../mock/MockDb";
import { IFeed } from '../models/Feed';


export class FeedController extends MockDb {

    public async search(term: string): Promise<IFeed[]> {
        try {
            const db: IFeedData = await super.openDb();
            const feeds:IFeed[] = this.filterFeedBySearchTerm(db.feeds, term);
            return feeds;
        } catch (err) {
            throw err;
        }
    }

    private filterFeedBySearchTerm(feeds:IFeed[],searchTerm: string): IFeed[] {
        if (!searchTerm){
            return feeds;
        }
        if (searchTerm.startsWith('"') && searchTerm.endsWith('"')) {
            searchTerm = searchTerm.slice(1, -1);
            const re = new RegExp(searchTerm, 'i');
            const fFeeds: IFeed[] = feeds.filter((feed: IFeed) => {
                if (feed.name.match(re) || feed.description.match(re)) {
                    return true;
                }
            });
            return feeds;
        }
        else if (searchTerm.length){
            const searchTokens: string[] = searchTerm.toLowerCase().split(' ');
            console.log(searchTokens);
            const fFeeds: IFeed[] = feeds.filter((feed: IFeed) => {
                const tokens = feed.name.toLowerCase().split(' ')
                    .concat(feed.description.toLowerCase().split(' '));
                if (tokens.length){
                    const intersection = tokens.filter((token:string) => {
                        return searchTokens.includes(token)
                    });
                    if(intersection.length){
                        return true;
                    }
                }                    
            });
            return feeds;
        }
        return []
    }
}