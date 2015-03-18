from flask import Flask,jsonify, render_template, request
from flask.ext.pymongo import PyMongo


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/sentiment'
mongo = PyMongo(app)

@app.route('/')
@app.route('/index')
def index():
    tweets = mongo.db.RedMartcom.find({"classify": { "$exists":True}}).sort([("Created_at", -1)])
    countcl = mongo.db.countclassify.find({"cneg": {  "$exists":True}})

    tweetsOut = []
    for tweet in tweets:
    	tweetText = tweet["tweet_text"]
    	tweetText = tweetText.encode('utf-8').replace('\n','').replace('\r','')
    	tweet["tweet_text"] = tweetText.decode('utf-8')
    	tweetsOut.append(tweet)


    for RedMart in tweets,countcl:

        return render_template('index.html',tweets=tweetsOut,countcl=countcl)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
    #app.run(debug=True)


