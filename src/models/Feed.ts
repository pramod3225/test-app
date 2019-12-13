
export interface IFeed {
    name: string;
    image: string;
    description: string;
    dateLastEdited: Date;
}

export interface IPaginatedFeed {
    pageNo: number,
    pageSize: number,
    numberOfPages: number,
    feeds: IFeed[],

}

export class Feed implements IFeed {

    public name: string;
    public image: string;
    public description: string;
    public dateLastEdited: Date;

    constructor(feed: IFeed) {
        this.name = feed.name;
        this.image = feed.image;
        this.description = feed.description;
        this.dateLastEdited = feed.dateLastEdited;
    }
}
