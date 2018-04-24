

var handleDataTableDefault=function(){
		"use strict";
		
         url = "../assets/json/users.json";
	     $.ajax({
	         type: 'GET',
	         url: url,
	         dataType: 'json',
	         success: function(json) {
	               
	               $.each(json, function(i, item){
	                    var line =	"<tr>"
                               +"     <td>"+item.name+"</td>"
                               +"     <td>"+item.local+"</td>"
                               +"     <td>"+item.lastLogin+"</td>"
                               +"     <td>"+item.group+"</td>"
                               +"     <td>"+item.role+"</td>"
                               +" </tr>";
	                    $('table#data-table tbody').append(line);

	               });

	               setTimeout(function(){
	               		$("#data-table").DataTable()	
	               },200);
	               
	               /*
					if($("#data-table").length!==0){

					}
					*/

	         },
	         error: function(error) {
	               console.log(error);
	         }
	     });                  


	};

var TableManageDefault=function(){
		"use strict";
		return{
			init:function(){
				handleDataTableDefault()
			}
		}
	}
();

$(document).ready(function() {
	
    activeMenu('users');
    
    // Default
    App.init();

    TableManageDefault.init();
});


