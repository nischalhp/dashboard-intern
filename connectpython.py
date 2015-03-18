import pymongo
from pymongo import MongoClient

client = pymongo.MongoClient('mongodb://localhost:27017/tweetDB2', max_pool_size=20)
db = client['sentiment']
RedMartcom = db['RedMartcom']
tweets = RedMartcom.find()
print "Find TWEETS"
for tweet in tweets:
    print tweet['tweet_text']




