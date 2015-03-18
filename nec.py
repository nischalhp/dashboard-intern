import pymongo
from pymongo import MongoClient
import time
import re
import datetime
import sys

sys.path.insert(0,'/usr/tmp/repositories/dashboard/sentiment_analysis_python')
import sentiment_analysis


print "hello"

client = pymongo.MongoClient('mongodb://localhost:27017/tweetDB2')
db = client['sentiment']
RedMartc = db['RedMartcom']



def get_sentiments(data):

    
    text = data['tweet_text']

    sentiment = sentiment_analysis.get_sentiment(text)
    
    print  data['tweet_ID']
    
    RedMartc.update({"tweet_ID":data['tweet_ID']},{"$set":{"classify":sentiment}},multi=True)

def visited():
    
    tweets = RedMartc.find({"classify": { "$exists":False}})
    for RedMart in tweets:
        get_sentiments(RedMart)
        time.sleep(5)

      
visited()
