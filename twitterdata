package twitterdata;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import java.net.UnknownHostException;
import java.util.List;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.UserMentionEntity;
import twitter4j.conf.ConfigurationBuilder;

public class Twitterdata {

    private ConfigurationBuilder cb;
    private DB db;
    private DBCollection items;
    public String id;

    public static void main(String[] args) throws InterruptedException {
        Twitterdata taskObj = new Twitterdata();
        taskObj.loadMenu();
    }

    public void loadMenu() throws InterruptedException {
        String keyword = "@RedMartcom";
        connectdb();
        int i = 0;
        while (i < 1) {
            cb = new ConfigurationBuilder();
            cb.setDebugEnabled(true);
            cb.setOAuthConsumerKey("EoYu7KIslMBOJmOfYJBzLJtyO");
            cb.setOAuthConsumerSecret("ric3FU3qI89N2voX7taiU3Oq3AomABCIuwZ1FTN7WAItJ2S99Y");
            cb.setOAuthAccessToken("3004108126-nfxrtKbO4nYWgCR6LKvdtBDqtNJ1TCIh809hXqQ");
            cb.setOAuthAccessTokenSecret("cJvIvnmvrvYdlsKLPHWjaUBxnq4GqEWIYyIvjQeSJG8af");
            getTweetByQuery(true, keyword);
            cb = null;
            Thread.sleep(60 * 1000 * 100); // wait
        }
    }

    public void connectdb() {
        try {

            initMongoDB();
            items = db.getCollection("RedMartcom");

            BasicDBObject index = new BasicDBObject("tweet_text", 1);
            items.ensureIndex(index,new BasicDBObject("unique", true));
        } catch (MongoException ex) {
            System.out.println("MongoException :" + ex.getMessage());
        }
    }

    public void initMongoDB() throws MongoException {
        try {
            System.out.println("Connecting to Mongo DB..");
            Mongo mongo;
            mongo = new Mongo("127.0.0.1");
            db = mongo.getDB("tweetDB2");
        } catch (UnknownHostException ex) {
            System.out.println("MongoDB Connection Error :" + ex.getMessage());
        }
    }

    public void getTweetByQuery(boolean loadRecords, String keyword) throws InterruptedException {
        TwitterFactory tf = new TwitterFactory(cb.build());
        Twitter twitter = tf.getInstance();
        if (cb != null) {
            try {
                Query query = new Query(keyword);
                query.setCount(100);
               
                QueryResult result;
                result = twitter.search(query);
                System.out.println(query);
                System.out.println("Getting Tweets...");
                List<Status> tweets = result.getTweets();
                for (Status tweet : tweets) {
                    BasicDBObject basicObj = new BasicDBObject();
                    basicObj.put("user_name", tweet.getUser().getScreenName());
                    basicObj.put("retweet_count", tweet.getRetweetCount());
                    basicObj.put("tweet_followers_count", tweet.getUser().getFollowersCount());
                    basicObj.put("source", tweet.getSource());
                    
                    basicObj.put("in_reply_to_screen_name",tweet.getInReplyToScreenName());
                    basicObj.put("in_reply_to_status_id",tweet.getInReplyToStatusId());
                    basicObj.put("in_reply_to_user_id",tweet.getInReplyToUserId());
                    basicObj.put("id",tweet.getId());
                    basicObj.put("User Description",tweet.getUser().getDescription());
                    basicObj.put("Profile Location",tweet.getUser().getLocation());
                    basicObj.put("Lang",tweet.getLang());
                    basicObj.put("Statuses_count",tweet.getUser().getStatusesCount());
                    basicObj.put("Friends_count", tweet.getUser().getFriendsCount());
                  
                   
               
                    basicObj.put("Profile Image URL",tweet.getUser().getProfileImageURL());
  
                    UserMentionEntity[] mentioned = tweet.getUserMentionEntities();
                    basicObj.put("tweet_mentioned_count", mentioned.length);
                    basicObj.put("tweet_ID", tweet.getId());
                    basicObj.put("tweet_text",tweet.getText());
                    basicObj.put("Created_at",tweet.getCreatedAt());
                    try {
                        items.save(basicObj);
                    } catch (Exception e) {
                        System.out.println("MongoDB Connection Error : " + e.getMessage());
                    }
                }

                if (loadRecords) {
                    getTweetsRecords();
                }
            } catch (TwitterException te) {
                System.out.println("te.getErrorCode() " + te.getErrorCode());
                System.out.println("te.getExceptionCode() " + te.getExceptionCode());
                System.out.println("te.getStatusCode() " + te.getStatusCode());
                if (te.getStatusCode() == 401) {
                    System.out.println("Twitter Error : \nAuthentication credentials (https://dev.twitter.com/pages/auth) were missing or incorrect.\nEnsure that you have set valid consumer key/secret, access token/secret, and the system clock is in sync.");
                } else {
                    System.out.println("Twitter Error : " + te.getMessage());
                }
            }
        } else {
            System.out.println("MongoDB is not Connected! Please check mongoDB intance running..");
        }
    }

    public void getTweetsRecords() throws InterruptedException {
        BasicDBObject fields = new BasicDBObject("_id", true).append("user_name", true).append("tweet_text", true);
        DBCursor cursor = items.find(new BasicDBObject(), fields);
        while (cursor.hasNext()) {
            System.out.println(cursor.next());
        }
    }
}
