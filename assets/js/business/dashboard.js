
tf_report_options_show    = sessionStorage.getItem('tf_report_options_show');
tf_report_options_entries = sessionStorage.getItem('tf_report_options_entries');
tf_report_footer_show     = sessionStorage.getItem('tf_report_footer_show');
tf_report_footer_of       = sessionStorage.getItem('tf_report_footer_of');
tf_report_footer_to       = sessionStorage.getItem('tf_report_footer_to');
tf_report_footer_entries  = sessionStorage.getItem('tf_report_footer_entries');
tf_report_options_search  = sessionStorage.getItem('tf_report_options_search');
tf_report_body_message    = sessionStorage.getItem('tf_report_body_message');
tf_report_footer_first    = sessionStorage.getItem('tf_report_footer_first');
tf_report_footer_last 	  = sessionStorage.getItem('tf_report_footer_last');
tf_report_footer_previous = sessionStorage.getItem('tf_report_footer_previous');
tf_report_footer_next     = sessionStorage.getItem('tf_report_footer_next');


tableSettings = {
				  	"language": {
					    "decimal":        "",
					    "emptyTable":     "No data was found.",
					    "info":           tf_report_options_show+" _START_ "+tf_report_footer_of+" _END_ "+tf_report_footer_to+" _TOTAL_ "+tf_report_footer_entries,
					    "infoEmpty":      tf_report_options_show+" 0 "+tf_report_footer_of+" 0 "+tf_report_footer_to+" 0 "+tf_report_footer_entries,
					    "infoFiltered":   "(filtered from _MAX_ total entries)",
					    "infoPostFix":    "",
					    "thousands":      ",",
					    "lengthMenu":      tf_report_options_show+" _MENU_ "+tf_report_options_entries,
					    "loadingRecords": "Carregando...",
					    "processing":     "Processando...",
					    "search":         tf_report_options_search+":",
					    "zeroRecords":    tf_report_body_message,
					    "paginate": {
					        "first":      tf_report_footer_first,
					        "last":       tf_report_footer_last,
					        "next":       tf_report_footer_next,
					        "previous":   tf_report_footer_previous
					    }
					}
				};





var fraudReport=function(){
	// MAP
		// Icons
		var greenIcon = new LeafIcon({iconUrl: '../assets/plugins/Leaflet/images/legitimate.png'});
		var redIcon = new LeafIcon({iconUrl: '../assets/plugins/Leaflet/images/fraud.png'});
		// Map config
		var fraudMap = L.map('fraudMap').setView([-29.6846, -51.1419], 6);
		// Add Map
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(fraudMap);	

		// Points
		/*
		var green = L.marker([-30.890, -55.532], {icon: greenIcon}).addTo(fraudMap);
		var red = L.marker([-29.678, -51.130], {icon: redIcon}).addTo(fraudMap);
	    */

    var version = 6;

    url = "../assets/json/fraud-report.json";
     $.ajax({
         type: 'GET',
         url: url,
         dataType: 'json',
         success: function(json) {
               
               $.each(json, function(i, item){
                
                    if (item.PREDICTION=="LEGITIMATE") {
                        var status = "btn-primary";
                        L.marker([item.LATITUDE, item.LONGITUDE], {icon: greenIcon}).addTo(fraudMap);
                    } else {
                        var status = "btn-danger";
                        L.marker([item.LATITUDE, item.LONGITUDE], {icon: redIcon}).addTo(fraudMap);
                    }

                    var prediction = "<label class='btn btn-sm "+status+"'>"+item.PREDICTION+"</label>";
                    var line =  "<tr>"
                           +"     <td>"+version+"</td>"
                           +"     <td>"+item.LEGAL_ID+"</td>"
                           +"     <td>"+item.NAME+"</td>"
                           +"     <td>"+item.SCORE+"</td>"
                           +"     <td>"+item.CITY+"</td>"
                           +"     <td>"+item.CREATE_DATE+"</td>"
                           +"     <td>"+prediction+"</td>"
                           +" </tr>";


                    $('.fraud-report #fraud tbody').append(line);

               });
               
               if($(".fraud-report #fraud").length!==0){
                    $(".fraud-report #fraud").DataTable(tableSettings);
               }
         },
         error: function(error) {
               console.log(error);
         }
     }); 
    // $(".fraud-report #fraud").DataTable(); 
}

var creditReport=function(){
	
	// MAP    
	    // Icons
		var greenIcon = new LeafIcon({iconUrl: '../assets/plugins/Leaflet/images/approved.png'});
		var redIcon = new LeafIcon({iconUrl: '../assets/plugins/Leaflet/images/denied.png'});
		// Map Config
		var creditMap = L.map('creditMap').setView([-29.6846, -51.1419], 6);
		// Add Map
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(creditMap);

		// Points
		/*
		var green = L.marker([-30.890, -55.532], {icon: greenIcon}).addTo(creditMap);
		var red = L.marker([-29.678, -51.130], {icon: redIcon}).addTo(creditMap);
		*/


    var version = 7;

    url = "../assets/json/credit-report.json";
     $.ajax({
         type: 'GET',
         url: url,
         dataType: 'json',
         success: function(json) {
               
               $.each(json, function(i, item){
                
                    if (item.PREDICTION=="APPROVED") {
                        var status = "btn-success";
                        var green = L.marker([item.LATITUDE, item.LONGITUDE], {icon: redIcon}).addTo(creditMap);
                    } else {
                        var status = "btn-danger";
                        var red = L.marker([item.LATITUDE, item.LONGITUDE], {icon: greenIcon}).addTo(creditMap);
                    }

                    var prediction = "<label class='btn btn-sm "+status+"'>"+item.PREDICTION+"</label>";
                    var line =  "<tr>"
                           +"     <td>"+version+"</td>"
                           +"     <td>"+item.NAME+"</td>"
                           +"     <td>"+item.LEGAL_ID+"</td>"
                           +"     <td>"+item.SCORE+"</td>"
                           +"     <td>"+item.CITY+"</td>"
                           +"     <td>"+item.CREATE_DATE+"</td>"
                           +"     <td>"+prediction+"</td>"
                           +" </tr>";

                    $('.credit-report #credit tbody').append(line);

               });

               if($(".credit-report #credit").length!==0){
               		$(".credit-report #credit").DataTable(tableSettings);
               }
         },
         error: function(error) {
               console.log(error);
         }
     }); 
    // $(".fraud-report #fraud").DataTable();   
}


// MAPS Configuration===============================================

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: '../assets/plugins/Leaflet/images/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

// ==================================================

var fraudWidget=function(date){
	$('.fraud-widget h4.panel-title').text("Fraud by "+date); 

	url = "../assets/json/fraud-widget-"+date+".json";
    $.ajax({
    	type: 'GET',
        url: url,
        dataType: 'json',		
        success: function(json) {

			fraudWidgetPast(json.PAST.LEGITIMATE,json.PAST.FRAUD);			                
			fraudWidgetPresent(json.PRESENT.LEGITIMATE,json.PRESENT.FRAUD);
			fraudWidgetFuture(json.FUTURE.LEGITIMATE,json.FUTURE.FRAUD);
        },
        error: function(error) {
        	console.log(error);
        }
    }); 
}

var creditWidget=function(date){

	$('.credit-widget h4.panel-title').text("Credit by "+date); 

	url = "../assets/json/credit-widget-"+date+".json";
    $.ajax({
    	type: 'GET',
        url: url,
        dataType: 'json',		
        success: function(json) {

			creditWidgetPast(json.PAST.APPROVED,json.PAST.DENIED);			                
			creditWidgetPresent(json.PRESENT.APPROVED,json.PRESENT.DENIED);
			creditWidgetFuture(json.FUTURE.APPROVED,json.FUTURE.DENIED);

        },
        error: function(error) {
        	console.log(error);
        }
    }); 
}
	
	// FRAUD WIDGET

		// PAST 
	var fraudWidgetPast=function(legitimate,fraud){
		
		// Clear DOM
		$('.fraud-past .chart-number').empty();
		$('.fraud-past ul.chart-legend li').empty();
		$('.fraud-past #fraud-past').empty();

		total = legitimate+fraud; //100%  - 2119

		legitimateLegend = (legitimate*100)/total;
		fraudLegend = (fraud*100)/total;

		// Total
		$('.fraud-past .chart-number').append("Past - "+total);

		// Legend
		legendLegitimate = "<i class='fa fa-circle-o fa-fw text-primary m-r-5'></i> "+legitimateLegend.toPrecision(4)+"% <span>LEGITIMATE</span>";
		$('.fraud-past ul.chart-legend li.legitimate').append(legendLegitimate);
		
		legendFraud = "<i class='fa fa-circle-o fa-fw text-danger m-r-5'></i> "+fraudLegend.toPrecision(4)+"% <span>FRAUD</span>";
		$('.fraud-past ul.chart-legend li.fraud').append(legendFraud);

		Morris.Donut({
			element:"fraud-past",
			data:[
					{
						label:"LEGITIMATE",
						value:legitimate
					},{
						label:"FRAUD",
						value:fraud
					}
				],
			colors:["#348fe2","#BA5D4A"],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		});
	};


		// PRESENT 
	var fraudWidgetPresent=function(legitimate,fraud){
				
		$('.fraud-present .chart-number').empty();
		$('.fraud-present ul.chart-legend li').empty();
		$('.fraud-present #fraud-present').empty();

		total = legitimate+fraud; //100%  - 2119

		legitimateLegend = (legitimate*100)/total;
		fraudLegend = (fraud*100)/total;

		// Total
		$('.fraud-present .chart-number').append("Present - "+total);

		// Legend
		legendLegitimate = "<i class='fa fa-circle-o fa-fw text-primary m-r-5'></i> "+legitimateLegend.toPrecision(4)+"% <span>LEGITIMATE</span>";
		$('.fraud-present ul.chart-legend li.legitimate').append(legendLegitimate);
		
		legendFraud = "<i class='fa fa-circle-o fa-fw text-danger m-r-5'></i> "+fraudLegend.toPrecision(4)+"% <span>FRAUD</span>";
		$('.fraud-present ul.chart-legend li.fraud').append(legendFraud);

		var t="#E37059";
		var e="#348fe2";
		Morris.Donut({
			element:"fraud-present",
			data:[
					{
						label:"LEGITIMATE",
						value:legitimate
					},{
						label:"FRAUD",
						value:fraud
					}
				],
			colors:[e,t],
			labelFamily:"Open Sans",
			labelColor:"#FFF",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		})
	};


		// FUTURE 
	var fraudWidgetFuture=function(legitimate,fraud){
				
		$('.fraud-future .chart-number').empty();
		$('.fraud-future ul.chart-legend li').empty();
		$('.fraud-future #fraud-future').empty();

		total = legitimate+fraud; //100%  - 2119

		legitimateLegend = (legitimate*100)/total;
		fraudLegend = (fraud*100)/total;

		// Total
		$('.fraud-future .chart-number').append("Future - "+total);

		// Legend
		legendLegitimate = "<i class='fa fa-circle-o fa-fw text-primary m-r-5'></i> "+legitimateLegend.toPrecision(4)+"% <span>LEGITIMATE</span>";
		$('.fraud-future ul.chart-legend li.legitimate').append(legendLegitimate);
		
		legendFraud = "<i class='fa fa-circle-o fa-fw text-danger m-r-5'></i> "+fraudLegend.toPrecision(4)+"% <span>FRAUD</span>";
		$('.fraud-future ul.chart-legend li.fraud').append(legendFraud);

		var t="#F29583";
		var e="#348fe2";
		Morris.Donut({
			element:"fraud-future",
			data:[
					{
						label:"LEGITIMATE",
						value:legitimate
					},{
						label:"FRAUD",
						value:fraud
					}
				],
			colors:[e,t],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		})
	};


	// CREDIT WIDGET

		// PAST
	var creditWidgetPast=function(approved,denied){
		
		$('.credit-past .chart-number').empty();
		$('.credit-past ul.chart-legend li').empty();
		$('.credit-past #credit-past').empty();

		total = approved+denied;

		approvedLegend = (approved*100)/total;
		deniedLegend = (denied*100)/total;

		// Total
		$('.credit-past .chart-number').append("Past - "+total);

		// Legend
		legendApproved = "<i class='fa fa-circle-o fa-fw text-success m-r-5'></i> "+approvedLegend.toPrecision(4)+"% <span>APPROVED</span>";
		$('.credit-past ul.chart-legend li.approved').append(legendApproved);
		
		legendDenied = "<i class='fa fa-circle-o fa-fw text-danger m-r-5'></i> "+deniedLegend.toPrecision(4)+"% <span>DENIED</span>";
		$('.credit-past ul.chart-legend li.denied').append(legendDenied);


		var e="#057D7D";
		var t="#BA5D4A";
		Morris.Donut({
			element:"credit-past",
			data:[
					{
						label:"APPROVED",
						value:approved
					},{
						label:"DENIED",
						value:denied
					}
				],
			colors:[e,t],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		});
	};
		// PRESENT
	var creditWidgetPresent=function(approved,denied){
		
		$('.credit-present .chart-number').empty();
		$('.credit-present ul.chart-legend li').empty();
		$('.credit-present #credit-present').empty();

		total = approved+denied;

		approvedLegend = (approved*100)/total;
		deniedLegend = (denied*100)/total;

		// Total
		$('.credit-present .chart-number').append("Present - "+total);

		// Legend
		legendApproved = "<i class='fa fa-circle-o fa-fw text-success m-r-5'></i> "+approvedLegend.toPrecision(4)+"% <span>APPROVED</span>";
		$('.credit-present ul.chart-legend li.approved').append(legendApproved);
		
		legendDenied = "<i class='fa fa-circle-o fa-fw text-danger m-r-5'></i> "+deniedLegend.toPrecision(4)+"% <span>DENIED</span>";
		$('.credit-present ul.chart-legend li.denied').append(legendDenied);

		var e="#00acac";
		var t="#E37059";
		Morris.Donut({
			element:"credit-present",
			data:[
					{
						label:"APPROVED",
						value:approved
					},{
						label:"DENIED",
						value:denied
					}
				],
			colors:[e,t],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		});
	};
		// FUTURE
	var creditWidgetFuture=function(approved,denied){
		
		$('.credit-future .chart-number').empty();
		$('.credit-future ul.chart-legend li').empty();
		$('.credit-future #credit-future').empty();

		total = approved+denied;

		approvedLegend = (approved*100)/total;
		deniedLegend = (denied*100)/total;

		// Total
		$('.credit-future .chart-number').append("Future - "+total);

		// Legend
		legendApproved = "<i class='fa fa-circle-o fa-fw text-success m-r-5'></i> "+approvedLegend.toPrecision(4)+"% <span>APPROVED</span>";
		$('.credit-future ul.chart-legend li.approved').append(legendApproved);
		
		legendDenied = "<i class='fa fa-circle-o fa-fw text-danger m-r-5'></i> "+deniedLegend.toPrecision(4)+"% <span>DENIED</span>";
		$('.credit-future ul.chart-legend li.denied').append(legendDenied);

		var e="#17D4D4";
		var t="#F29583";
		Morris.Donut({
			element:"credit-future",
			data:[
					{
						label:"APPROVED",
						value:approved
					},{
						label:"DENIED",
						value:denied
					}
				],
			colors:[e,t],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		});
	};



// FIM
/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

var translateField=function(){
	sessionStorage.setItem('tf_report_options_show','Mostrando');
}



var DashboardV2=function(){


	translateField();

    fraudReport();
	creditReport();

	// fraudMap();
	//creditMap();

	fraudWidget('month');
	creditWidget('month');


};


$(document).ready(function() {

    activeMenu('dashboard');
    

	$('.fraud-widget label.filter').click(function() {
	    var id = $(this).attr('id');
	    fraudWidget(id);
	});  

	$('.credit-widget label.filter').click(function() {
	    var id = $(this).attr('id');
	    creditWidget(id);
	});  


    // Default
    App.init();
    DashboardV2();
	// Dashboard.init();


/* FRAUD

	(present+past)/2

	past 369
	present 555

	future 383??   - 832

	

	------------------------
	100% = 369
	   X = 555

	   369x = 55.500 

	   x = % 150,40
		----
	   x = 1,5
	------------------------

	past 1750
	present 444
		
		100% = 1750
		x = 444

		x = 44.400/1750
		x = -25.37%


		future = 441

*/

});


