from flask import Flask,jsonify, render_template, request
from flask.ext.pymongo import PyMongo


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tweetDB2'
mongo = PyMongo(app)

@app.route('/')
@app.route('/index')
def index():
    tweets = mongo.db.RedMartcom.find({"classify": { "$exists":True}})
    for RedMart in tweets:
       
        return render_template('index.html',tweets=tweets)

if __name__ == '__main__':
    app.run(debug=True)


