import pymongo
from pymongo import MongoClient
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer


client = pymongo.MongoClient('mongodb://localhost:27017')
db = client['tweetDB2']
RedMartc = db['@RedMartcom']



def get_sentiments(data):
    
    
    
    blob = TextBlob(data['tweet_text'],analyzer=NaiveBayesAnalyzer())
    
    print  data['tweet_ID']
    
    RedMartc.update({"tweet_ID":{"$exists":True}},{"$set":{"classify":blob.sentiment.classification,"pos":blob.sentiment.p_pos,"neg":blob.sentiment.p_neg}},multi=True)

def visited():
    
    tweets = RedMartc.find({ "classify": { "$exists":False}})
    
    if RedMartc.find( { "classify": { "$exists":False}} ):
        print 'NO MORE TWEETS TO ANALYZE'
    
    for RedMart in tweets:
        get_sentiments(RedMart)
        time.sleep(5)

      
visited()

