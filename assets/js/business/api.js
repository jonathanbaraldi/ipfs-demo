var fraudReport=function(chartType){

    url = "../assets/json/api-fraud-report.json";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(json) {
         
            $.each(json, function(i, item){
                
                if (item.PREDICTION=="Legitimate") {
                    var status = "btn-primary";
                } else {
                    var status = "btn-danger";
                }

                date = formatDate(item.DATE);

                date = date.slice(0,-8);
                date = date.replace('-','/');

                var line =  "<tr>"
                       +"     <td>"+date+"</td>"
                       +"     <td>"+item.LEGITIMATE+"</td>"
                       +"     <td>"+item.FRAUD+"</td>"
                       +" </tr>";

                $('.fraud-report #fraud tbody').append(line);

            });

            if($(".fraud-report #fraud").length!==0){


                if (chartType) {
                    $('.row.fraud-report #fraud').attr('data-graph-type', chartType);    
                } else {
                    $('.row.fraud-report #fraud').attr('data-graph-type', 'area');
                }
                

                $('.fraud-report #fraud')
                .bind('highchartTable.beforeRender', function(event, highChartConfig) {
                    highChartConfig.colors = ['#348fe2', '#BA5D4A'];
                })
                .highchartTable();

                $('.fraud-report #fraud').fadeOut();
            }
                
         },
         error: function(error) {
               console.log(error);
         }
     }); 
}


// Format and reverse date 
function formatDate(d){
    return d.split('-').reverse().join('-');
}



var creditReport=function(){
    url = "../assets/json/api-fraud-report.json";
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(json) {
         
            $.each(json, function(i, item){
                
                if (item.PREDICTION=="Legitimate") {
                    var status = "btn-primary";
                } else {
                    var status = "btn-danger";
                }

                date = formatDate(item.DATE);

                date = date.slice(0,-8);
                date = date.replace('-','/');

                var line =  "<tr>"
                       +"     <td>"+date+"</td>"
                       +"     <td>"+item.LEGITIMATE+"</td>"
                       +"     <td>"+item.FRAUD+"</td>"
                       +" </tr>";

                $('.credit-report #credit tbody').append(line);

            });


            if($('.credit-report #credit').length!==0){

                $('.row.credit-report #credit').attr('data-graph-type', 'area');                

                $('.credit-report #credit')
                .bind('highchartTable.beforeRender', function(event, highChartConfig) {
                    highChartConfig.colors = ['#057D7D', '#BA5D4A'];
                })
                .highchartTable();

                $('.credit-report #credit').fadeOut();
            }
                
         },
         error: function(error) {
               console.log(error);
         }
     });    
}


var Dashboard=function(){"use strict";return{init:function(){

	fraudReport();
	creditReport();

}}}();


$(document).ready(function() {
	
    activeMenu('api');
    
    // Default
    App.init();
    Dashboard.init();


});


