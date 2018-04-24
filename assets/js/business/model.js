
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


var handleDataTableDefault=function(){
	"use strict";
	
     url = "../assets/json/model-all.json";
     $.ajax({
         type: 'GET',
         url: url,
         dataType: 'json',
         success: function(json) {
               
               $.each(json, function(i, item){
                
                    if (item.STATUS!=="") {
                        
                        if (item.STATUS=="INACTIVE") {
                        	var status = "<button class='btn btn-warning btn-xs m-r-5'><i class='fa fa-power-off'></i> Activate</button>";
                        	/*
                        	+"<button class='btn btn-primary btn-xs m-r-5'><i class='fa fa-play'></i> Test</button>"
                            +"<button class='btn btn-success btn-xs m-r-5'><i class='fa fa-fast-forward'></i> Train</button>"
                            */
                        } else if (item.STATUS=="ACTIVE") {
                        	var status = "<button class='btn btn-danger btn-xs m-r-5'><i class='fa fa-power-off'></i> Deactivate</button>"
                        	            +" <button class='btn btn-primary btn-xs m-r-5'><i class='fa fa-play'></i> Test</button>";
                                        // +" <button class='btn btn-success btn-xs m-r-5'><i class='fa fa-fast-forward'></i> Train</button>";
                        } else if (item.STATUS=="REQUESTED") {
                            var status = "<button class='btn btn-success btn-xs m-r-5'><i class='fa fa-clock-o'></i> Requested</button>";
                        }
        
                        var line =	"<tr>"
                               // +"     <td>"+item.NAME+"</td>"
                               +"     <td>"+item.USER_OWNER+"</td>"
                               +"     <td>"+item.DESCRIPTION+"</td>"
                               +"	<td class='actions'>"
                               +        status
                               +"	</td>"
                               
                               +" </tr>";
        
                        $('table#data-table tbody').append(line);
                        
                    }
                });

				if($("#data-table").length!==0){
					// handleDataTableDefault();
					$("#data-table").DataTable();	
				}
				
         },
         error: function(error) {
               console.log(error);
         }
     });                  
};

var fraudReport=function(){

    url = "../assets/json/fraud-report.json";
     $.ajax({
         type: 'GET',
         url: url,
         dataType: 'json',
         success: function(json) {
               
               $.each(json, function(i, item){
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

var fraudWidget=function(date){
	// $('.fraud-widget h4.panel-title').text("Glossas por "+date); 

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


var modelEvolution=function(){

	$.getJSON('../assets/json/chart-linhas-completo.json', function(json) {
		if(chart) chart.destroy();
		var chart = new Highcharts.Chart(json);
	});

}



Highcharts.theme = {
   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: "#2d353c",
      style: {
         fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#606063'
   },
   title: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase',
         fontSize: '20px'
      }
   },
   subtitle: {
      style: {
         color: '#E0E0E3',
         textTransform: 'uppercase'
      }
   },
   xAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
         style: {
            color: '#A0A0A3'

         }
      }
   },
   yAxis: {
      gridLineColor: '#707073',
      labels: {
         style: {
            color: '#E0E0E3'
         }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
         style: {
            color: '#A0A0A3'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
         }
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'white'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#E0E0E3'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);



var TableManageDefault=function(){
		"use strict";
		return{
			init:function(){
				handleDataTableDefault();

				fraudReport();

				fraudWidget('day');

				modelEvolution();

			}
		}
	}
();

$(document).ready(function() {
	
    activeMenu('model');
    
    // Default
    App.init();

    TableManageDefault.init();
    //FormEditable.init();

    // $("#tags").editable({inputclass:"form-control",select2:{tags:["html","javascript","css","ajax"],tokenSeparators:[","," "]}});

});