import jsonfile from 'jsonfile';
import { IFeed } from 'src/models';

export interface IFeedData {
    feeds: IFeed[]
}

export class MockDb {

    private readonly dbFilePath = 'src/mock/MockData.json';
   

    public openDb(): Promise<IFeedData> {
        return jsonfile.readFile(this.dbFilePath);
    }

    protected saveDb(db: any): Promise<any> {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}
