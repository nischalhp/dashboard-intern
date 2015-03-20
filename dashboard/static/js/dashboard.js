
      var tweetdat = [];      
      $(document).ready(function(){ 
            $.ajax({
              url:'/tweets',
              type:"GET",
              async:false,
              success:function(data){
              for( tweet in data["tweets"] ){
                var twt = data["tweets"][tweet];
                console.log(twt);
                  var tweetstructure = {};
                  tweetstructure["user_name"] = twt["user_name"];
                    tweetstructure["tweet_text"] = twt["tweet_text"];
                    tweetstructure["Created_at"] = twt["Created_at"];
                    tweetstructure["tweet_id"] = twt["tweet_ID"];
                    tweetstructure["_id"] =  twt["_id"];
                    tweetstructure["classify"] = twt["classify"];
                    tweetdat.push(tweetstructure);                    
                  }                   
                  console.log("final");   
                  console.log(tweetdat);
          var data = "<table class='table'><col width='60%'><col width='20%'><col width='20%'>";
          data += "<thead><tr><th>Text</th><th>Date</th><th>Sentiment</th></tr></thead></table><div id='tweetdiv'>";
          data+="<table class='table table-striped table-hover table-bordered' id='tweettable'><col width='60%'><col width='20%'><col width='20%'><tbody>";
          for(index in tweetdat){
          data+="<tr><td>"+ tweetdat[index]["tweet_text"]+ "</td><td>"+tweetdat[index]["Created_at"]+"</td><td id='"+tweetdat[index]['_id'] +"' data='"+tweetdat[index]['classify']+"' style='padding:15px'></td></tr>";
              console.log(tweetdat[index]["user_name"]);
          }
          data+="</tbody></table></div><table class='table'><col width='60%'><col width='20%'><col width='20%'><tfoot><tr><td></td><td></td><td></td></tr></tfoot></table>"
          $("#tweetsdata").append(data);
        $('#tweettable').each(function () {
         console.log("rowfunc");
        var rows = this.rows;
            console.log(rows);
        $(rows).each(function(a,b) {
        var sentiment = $(b.children[2]).attr("data").toString();
        var sentId  = $(b.children[2]).attr("id");
        console.log(sentiment);
        console.log(sentId);            
        var object = document.getElementById(sentId);
        var bool = sentiment.toLowerCase()=="pos";
        console.log(sentiment.toLowerCase());
        if( sentiment.toLowerCase()=="pos"){
        $("#"+sentId).html("<center><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span></center>");
        }
        else {
        $("#"+sentId).html("<center><span class='glyphicon glyphicon-thumbs-down' aria-hidden='true'></span></center>");
        }
                                           });
        });

              }
    });

        
        $.ajax({
              url:'/getcount',
              type:"GET",
              async:false,
              success:function(data){   
                var countcl = data;
                console.log("sdjncksdnc countcl");
                console.log(countcl["countcl"]);
                var posPercent =  ( countcl["countcl"][0]['cpos'] * 100.0)/( countcl["countcl"][0]['cpos'] +  countcl["countcl"][0]['cneg'] );
                var negPercent =  ( countcl["countcl"][0]['cneg'] * 100.0)/( countcl["countcl"][0]['cpos'] +  countcl["countcl"][0]['cneg'] );
                console.log("posPercent " + posPercent.toFixed(3) + " negPercent "+ negPercent.toFixed(3));
                posPercent = Math.round(posPercent.toFixed(2));
                negPercent = Math.round(negPercent.toFixed(2));
                var pieData = [
                              {
                        value: posPercent,
                        color: "#46BFBD",
                        highlight: "#5AD3D1",
                        label: "POSITIVE"
                                    },

                    {
                        value:negPercent,
                        color:"#F7464A",
                        highlight: "#FF5A5E",
                        label: "NEGATIVE"

                    }

                ];  

            window.onload = function(){
                var ctx = document.getElementById("chart-area").getContext("2d");
                window.myPie = new Chart(ctx).Pie(pieData);
                createBarGraph();

            };
          }
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
