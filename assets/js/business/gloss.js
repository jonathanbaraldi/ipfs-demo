tableSettings = {
				  	"language": {
					    "decimal":        "",
					    "emptyTable":     "No data was found.",
					    "info":           "Mostrando _START_ até _END_ de _TOTAL_ registros",
					    "infoEmpty":      "Mostrando 0 até 0 de 0 registros",
					    "infoFiltered":   "(filtered from _MAX_ total entries)",
					    "infoPostFix":    "",
					    "thousands":      ",",
					    "lengthMenu":     "Mostrando _MENU_ registros",
					    "loadingRecords": "Carregando...",
					    "processing":     "Processando...",
					    "search":         "Pesquisa:",
					    "zeroRecords":    "No matching records found",
					    "paginate": {
					        "first":      "Primeiro",
					        "last":       "Último",
					        "next":       "Próximo",
					        "previous":   "Anterior"
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


    url = "../assets/json/fraud-report.json";
     $.ajax({
         type: 'GET',
         url: url,
         dataType: 'json',
         success: function(json) {
               
               $.each(json, function(i, item){
                
                	// L.marker([item.LATITUDE+2, item.LONGITUDE+1], {icon: redIcon}).addTo(fraudMap);

                	L.circle([item.LATITUDE, item.LONGITUDE], 50000, {
					    color: 'red',
					    fillColor: '#f03',
					    fillOpacity: 0.5
					}).addTo(fraudMap);


                    var line =  "<tr>"
                           +"     <td class='ds_serv'>"+item.DS_SERV+"</td>"
                           +"     <td class='vl_real_pago'>"+item.VL_REAL_PAGO+"</td>"
                           +"     <td class='dt_inclusao_plano' >"+item.DT_INCLUSAO_PLANO+"</td>"
                           +"     <td class='cd_prestador_pagamento' >"+item.CD_PRESTADOR_PAGAMENTO+"</td>"
                           +"     <td class='nr_ter_adesao' >"+item.NR_TER_ADESAO+"</td>"
                           +"     <td class='qtd'>"+item.QTD+"</td>"
                           // +"     <td>"+prediction+"</td>"
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
	$('.fraud-widget h4.panel-title').text("Glossas por "+date); 

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
					{label:"DS_SERV",value:14.94},
					{label:"VL_REAL_PAGO",value:8.29},
					{label:"DT_INCLUSAO_PLANO",value:7.86},
					{label:"CD_PRESTADOR_PAGAMENTO",value:3.51},
					{label:"NR_TER_ADESAO",value:8.23},
					{label:"QTD",value:8.96}
					// {label:"OUTROS",value: 47.21}
			],
			colors:[ "#2c5e6b", "#994b14", "#652526", "#32311d", "#595959","#52682a"],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		});
	};


////////////////////////////////////////////////////////
var handleMorrisDonusChart=function(){
	Morris.Donut({
					element:"morris-donut-chart",
					data:[
							{label:"Jam",value:25},
							{label:"Frosted",value:40},
							{label:"Custard",value:25},
							{label:"Sugar",value:10}
					],
					formatter:function(e){
							return e+"%"
					},
					resize:true,
					colors:[
								dark,
								orange,
								red,
								grey
					]
	})
};
////////////////////////////////////////////////////////






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
					{label:"DS_SERV",value:16.94},
					{label:"VL_REAL_PAGO",value:10.29},
					{label:"DT_INCLUSAO_PLANO",value:9.86},
					{label:"CD_PRESTADOR_PAGAMENTO",value:5.51},
					{label:"NR_TER_ADESAO",value:5.23},
					{label:"QTD",value:4.96}
					// {label:"OUTROS",value: 47.21}
			],
			colors:[ "#3f869a", "#db6c1c", "#913537", "#484629", "#808080","#75953c"],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
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
					{label:"DS_SERV",value:17.94},
					{label:"VL_REAL_PAGO",value:6.29},
					{label:"DT_INCLUSAO_PLANO",value:12.86},
					{label:"CD_PRESTADOR_PAGAMENTO",value:8.51},
					{label:"NR_TER_ADESAO",value:8.23},
					{label:"QTD",value:2.96}
					// {label:"OUTROS",value: 47.21}
			],
			colors:[ "#659eae", "#e28949", "#a75d5f", "#6d6b54", "#999999","#91aa63"],
			labelFamily:"Open Sans",
			labelColor:"rgba(255,255,255,0.4)",
			labelTextSize:"12px",
			backgroundColor:"#242a30"
		});
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

	// creditReport();

	//creditMap();

	fraudWidget('day');
	// creditWidget('month');


};


$(document).ready(function() {

    activeMenu('gloss');
    

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


