from flask import Flask,jsonify ,render_template, request
from flask.ext.pymongo import PyMongo
import json


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sentiment'
mongo = PyMongo(app)


@app.route('/tweets', methods=['GET'])
def tweets():
	allTweets = []
	tweets = mongo.db.RedMartcom.find({"classify": { "$exists":True}}).sort([("Created_at", -1)])
	for tweet in tweets:
		tweetstructure = {}
		tweetstructure["user_name"] = tweet["user_name"]
		tweetstructure["tweet_text"] = tweet["tweet_text"]
		tweetstructure["Created_at"] = tweet["Created_at"]
		tweetstructure["tweet_id"] = tweet["tweet_ID"]
		tweetstructure["_id"] =  str(tweet["_id"])
		tweetstructure["classify"] = tweet["classify"]

		allTweets.append(tweetstructure)
	return jsonify(tweets=allTweets)

@app.route('/getcount', methods=['GET'])
def get_count():
	cnt = []
	countcl = mongo.db.countclassify.find({"cneg": {"$exists":True}}).sort([("_id", -1)])[0]
	countclass = {}
	countclass["cneg"] = countcl["cneg"];
	countclass["cpos"] = countcl["cpos"];
	cnt.append(countclass)

	return jsonify(countcl=cnt)

@app.route('/')
@app.route('/index')
def index():
	tweets = mongo.db.RedMartcom.find({"classify": {"$exists":True}}).sort([("Created_at", -1)])
	countcl = mongo.db.countclassify.find()
	
	tweetsOut = []
	for tweet in tweets:
		tweetText = tweet["tweet_text"]
		tweetText = tweetText.encode('utf-8').replace('\n','').replace('\r','')
		tweet["tweet_text"] = tweetText.decode('utf-8')
		tweetsOut.append(tweet)


	for RedMart in tweets,countcl:

		return render_template('index.html',countcl=countcl)



if __name__ == '__main__':
    app.run(debug=True)
    #app.run(debug=True)


