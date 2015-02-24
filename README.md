# dashboard

Flask==0.10.1
Jinja2==2.7.3
MarkupSafe==0.23
PyYAML==3.11
Werkzeug==0.9.6
textblob==0.8.4

{ "classify": { "$exists":False}}

To run this application from the command line without Ant, try:
java -jar "/Users/burhan/NetBeansProjects/twitterdata/dist/twitterdata.jar"

cronjob
http://code.tutsplus.com/tutorials/scheduling-tasks-with-cron-jobs--net-8800

http://www.mkyong.com/java/java-cron-job-to-run-a-jar-file/

crontab -e 

i
# This cron job stores new tweets into mongodb at singapore 2:30 pm
30 14 * * * java -jar /Users/burhan/NetBeansProjects/twitterdata/dist/twitterdata.jar > /Imadwork/majorpro/task1/log/cron.log

# This cron job does sentiment analysis on tweets and stores it in mongodb
56 14 * * * /usr/local/bin/python /Imadwork/majorpro/task1/new.py >> /Imadwork/majorpro/task1/log/cron2.log


esc

:wq
