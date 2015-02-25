from flask import Flask,jsonify, render_template, request
from flask.ext.pymongo import PyMongo


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/tweetDB2'
mongo = PyMongo(app)

@app.route('/')
@app.route('/index')
def index():
    tweets = mongo.db.RedMartcom.find({"classify": { "$exists":True}}).sort([("Created_at", -1)])
    countcl = mongo.db.countclassify.find({"cneg": {  "$exists":True}})
   
    for RedMart in tweets,countcl:
       
        return render_template('index.html',tweets=tweets,countcl=countcl)

if __name__ == '__main__':
    app.run(debug=True)


