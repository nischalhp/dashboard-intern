$(document).ready(function(){
          var data = "<table class='table'><col width='60%'><col width='20%'><col width='20%'>";
          data+="<thead><tr><th>Text</th><th>Date</th><th>Sentiment Bar</th></tr></thead></table><div id='tweetdiv'>";
          data+="<table class='table table-striped table-hover' id='tweettable' ><col width='60%'><col width='20%'><col width='20%'><tbody>";
          for(index in tweetdat){
          data+="<tr><td>"+ tweetdat[index]["tweet_text"]+ "</td><td>"+tweetdat[index]["Created_at"]+"</td><td id='"+tweetdat[index]['tweet_id'] +"' data='"+tweetdat[index]['classify']+" style='padding:15px'></td></tr>";
              console.log(tweetdat[index]["user_name"]);
          }
          data+="</tbody></table></div>"
          $("#tweetsdata").append(data);

        $('#tweettable').each(function () {
         console.log("rowfunc");
        var rows = this.rows;
            console.log(rows);
        $(rows).each(function(a,b) {
        var sentiment = $(b.children[2]).attr("data");
            var sentId  = $(b.children[2]).attr("id");
            console.log(sentiment);
            console.log(sentId);
        var object = document.getElementById(sentId);
        if(sentiment == "pos"){
        $("#"+sentId).html("<center><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></center>")
        }
        else {
        $("#"+sentId).html("<center><span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></center>")
        }
                                           });
        });

      });

function getPosCount(date){
    var count = 0 ;
    for(index  in  tweetdat){
        var createdAt = new Date(tweetdat[index]["Created_at"]);
        if((createdAt.toDateString().toString() == date.toDateString().toString()) && (tweetdat[index]["classify"] == "pos")){
        count = count + 1;
        }
    }
        return count;
    }

    function getNegCount(date){
    var count = 0 ;
    for(index  in  tweetdat){
        var createdAt = new Date(tweetdat[index]["Created_at"]);
        if((createdAt.toDateString().toString() == date.toDateString().toString()) && (tweetdat[index]["classify"] == "neg")){
        count = count + 1;
        }
    }
        return count;
    }

    function createBarGraph(){
    var dataPoints = [];
    var negdataPoints = [];
    var poscount = 0;
    var negcount = 0;
    var date = new Date();
        var dateCur;
    for(i=7;i>=0;i--){
    dateCur = new Date(date - 60*60*24*i*1000);
        console.log("dateCur"+ dateCur);
        var posdata = {};
        var negdata = {};
        posdata["label"] = dateCur.toLocaleDateString();
        posdata["y"] = getPosCount(dateCur);
        negdata["label"] = dateCur.toLocaleDateString();
        negdata["y"] = getNegCount(dateCur);
        dataPoints.push(posdata);
        negdataPoints.push(negdata);
    }
        console.log("dataPoints");
        console.log(dataPoints);
        console.log("dataPoints negative");
        console.log(negdataPoints);
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "theme2",
        animationEnabled: true,
      title:{
        text: "Last 7 days Response"
      },
        legend:{
                verticalAlign: "bottom",
                horizontalAlign: "center"
            },
      data: [//array of dataSeries
        { //dataSeries object
         /*** Change type "column" to "bar", "area", "line" or "pie"***/
         color: "#5AD3D1",
         legendText: "Positive",
         showInLegend: true,
         type: "column",
         name: "Positive",
        dataPoints: dataPoints,
        fontsize:20
       },
        {       color: "#FF5A5E",
                type: "column",
                showInLegend: true,
                legendText: "Negative",
                name: "Negative",
                axisYType: "secondary",
                dataPoints: negdataPoints
        }
       ]
     });
    chart.render();
}
