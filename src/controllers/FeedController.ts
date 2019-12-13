import { MockDb, IFeedData } from "../mock/MockDb";
import { IFeed, IPaginatedFeed } from '../models/Feed';


export class FeedController {
    private mockDb: MockDb
    constructor() {
        this.mockDb = new MockDb(); 
    }    

    public async search(term: string, pageNo:number=1, pageSize:number=5): Promise<IPaginatedFeed> {
        try {            
            const db: IFeedData = await this.mockDb.openDb();
            let feeds:IFeed[] = this.filterFeedBySearchTerm(db.feeds, term);            
            let paginatedFeeds:IPaginatedFeed = this.filterFeedByPage(feeds, pageNo, pageSize);
            return paginatedFeeds;
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
            return fFeeds;
        }
        else if (searchTerm.length){
            const searchTokens: string[] = searchTerm.toLowerCase().split(' ');            
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
            return fFeeds;
        }
        return []
    }

    private filterFeedByPage(feeds:IFeed[], pageNo:number, pageSize:number):IPaginatedFeed{
        const len = feeds.length;
        let startIndex: number = (pageNo-1)* pageSize;
        let endIndex: number = startIndex + pageSize;
        endIndex = endIndex > len? feeds.length:endIndex;
               
        return <IPaginatedFeed>{
            feeds: feeds.slice(startIndex,endIndex),
            pageNo:pageNo,
            pageSize: pageSize,
            numberOfPages: Math.ceil(len/pageSize),
            totalFeeds:len

        }
    }
}