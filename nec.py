import pymongo
from pymongo import MongoClient
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
import time
import re
import datetime

client = pymongo.MongoClient('mongodb://localhost:27017/tweetDB2')
db = client['tweetDB2']
RedMartc = db['RedMartcom']



def get_sentiments(data):

    
    text = data['tweet_text']
    
    blob = TextBlob(text,analyzer=NaiveBayesAnalyzer())
    
    
    print  data['tweet_ID']
    
    print  blob.sentiment.classification
    
    RedMartc.update({"tweet_ID":data['tweet_ID']},{"$set":{"classify":blob.sentiment.classification,"pos":blob.sentiment.p_pos,"neg":blob.sentiment.p_neg}},multi=True)


def visited():
    
    tweets = RedMartc.find({"classify": { "$exists":False}})
    for RedMart in tweets:
        get_sentiments(RedMart)
        time.sleep(5)

      
visited()