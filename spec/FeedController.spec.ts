import { expect, assert } from "chai";
import * as sinon from "sinon";
import 'mocha';

import { FeedController } from "../src/controllers";
import { IPaginatedFeed, IFeed } from "../src/models";
import { MockDb, IFeedData} from "../src/mock/MockDb";



describe('Feed Controller',() => {
  const sandbox = sinon.createSandbox();
  let feedController: FeedController;
  let openDbStub: sinon.SinonStub;
  let feed1: IFeed = {name:'pramod mishra',image:'test image',description:'test description 1', dateLastEdited: new Date()}
  let feed2: IFeed = {name:'vinod mishra',image:'test image',description:'test description 2', dateLastEdited: new Date()}
  let feed3: IFeed = {name:'sanket mishra',image:'test image',description:'test description 3', dateLastEdited: new Date()}
  let feed4: IFeed = {name:'firstname sirname',image:'test image',description:'test description 4', dateLastEdited: new Date()}
  let feed5: IFeed = {name:'john dell',image:'test image',description:'test description 5', dateLastEdited: new Date()}
  let feed6: IFeed = {name:'tom dell',image:'test image',description:'test description 6', dateLastEdited: new Date()}

  beforeEach(async () => {   
    feedController = new FeedController();
    openDbStub = sandbox.stub(<any>MockDb.prototype, 'openDb');
    
  });

  afterEach(() => {
    feedController = null;
    sandbox.restore();
  });

  describe('search',() => {
    it('should filter the feeds', async () =>{
      const sampleFeedData :IFeedData = {feeds:[feed1]}
      openDbStub.returns(sampleFeedData);   
      const feeds:IPaginatedFeed = await feedController.search('pramod',1,5);
      expect(feeds.feeds).deep.equal(sampleFeedData.feeds);
    });

    it('should provide only page size feeds', async () =>{
      const sampleFeedData :IFeedData = {feeds:[feed1,feed2,feed3,feed4,feed5,feed6]}
      openDbStub.returns(sampleFeedData);   
      const feeds:IPaginatedFeed = await feedController.search('description',1,6);
      expect(feeds.feeds.length).equal(6);
    });
  
  });
});