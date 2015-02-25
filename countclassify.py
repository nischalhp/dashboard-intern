import pymongo
from pymongo import MongoClient
import time
import re
import datetime

client = pymongo.MongoClient('mongodb://localhost:27017/tweetDB2')
db = client['tweetDB2']
countcl= db['countclassify']
RedMartc = db['RedMartcom']





def visited():
    
    posi = RedMartc.find({"classify":"pos"}).count()
    print posi
    negi = RedMartc.find({"classify":"neg"}).count()
    print negi
    countcl.update({"name":{"$exists":True}},{"$set":{"cpos":posi,"cneg":negi}},upsert=True)
 
visited() 