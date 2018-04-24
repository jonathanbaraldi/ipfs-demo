function executesSQL(sqlDesc) { 
	/*
    try { 
        var ps = conn.prepareStatement(sqlDesc); 
        var execrc = ps.execute(); 
        ps.close(); 
    }catch(e){ 
        result += sqlDesc + ":\n" + e.toString() + "\n--------\n\n"; 
    } 
    */
    sqlDesc = $("fieldset.model-action textarea.modelscript" ).val() +"\n" + sqlDesc;
    $("fieldset.model-action textarea.modelscript" ).val(sqlDesc);

    //console.log(sqlDesc);

} 


var genareteScript=function(json){

/*
		"use strict";
		
         url = "../assets/json/model_new.json";

	     $.ajax({
	         type: 'GET',
	         url: url,
	         dataType: 'json',
	         success: function(json) {
*/
	         	var sqlTable = "";
	         	var sqlTableType = "";
	         	var sqlTableNewType = "";
	         	var sqlTablePK = "";

	         	var sqlOutTable = ""; 
				var sqlOutTarget = "";
				var sqlOutRr = "";
				var sqlOutDecisionRr = "";
				var sqlOutProbDecisionRr = "";

	         	var sqlDesc = ""; 
	         	var sqlRole = ""; 

	         	// create sequence, table e type of the application table
				executesSQL("drop sequence "+json.schema+".APPL_"+json.key+"_SEQ;");
				executesSQL("drop sequence "+json.schema+".APPL_"+json.key+"_VERSION_SEQ;");

				executesSQL("drop table "+json.schema+".APPL_"+json.key+";");
				executesSQL("drop type "+json.schema+".APPL_"+json.key+"_T;");
				executesSQL("drop type "+json.schema+".APPL_"+json.key+"_NEW_T;");
				executesSQL("drop type "+json.schema+".APPL_"+json.key+"_T_OUT;");

				executesSQL("drop table "+json.schema+".FUNC_HEADER_"+json.key+";");
				executesSQL("drop table "+json.schema+".CREATE_CONFIG_"+json.key+";");
				executesSQL("drop table "+json.schema+".APPLY_CONFIG_"+json.key+";");

				executesSQL("drop table "+json.schema+".APPL_DESC_"+json.key+";");
				executesSQL("drop table "+json.schema+".APPL_ROLES_"+json.key+";");

				executesSQL("CREATE SEQUENCE "+json.schema+".APPL_"+json.key+"_SEQ START WITH 1;");

				executesSQL("CREATE SEQUENCE "+json.schema+".APPL_"+json.key+"_VERSION_SEQ START WITH 1;");

				//create the the application table
				sqlTable += "create column table "+json.schema+".APPL_"+json.key+" (\n";
				//create the the application type
				sqlTableType += "create type "+json.schema+".APPL_"+json.key+"_T as table (\n";
				//create the the application new type
				sqlTableNewType += "create type "+json.schema+".APPL_"+json.key+"_NEW_T as table (\n";
				//create the output type of the application table
				sqlOutTable += "create type "+json.schema+".APPL_"+json.key+"_T_OUT as table (\n";

				//UTILIZADA NAS FUNÇÕES 'CREATE_MODEL_AND_TRAIN','APPLY_MODEL' E 'RETRAIN_MODEL'
				//TODO - verificar se realmente é necessário criar elas. Elas podem ser montadas na procedure atraves de consultas 
				// nas tabelas auxiliares do modelo
				executesSQL("create table "+json.schema+".FUNC_HEADER_"+json.key+" like "+json.schema+".FUNCTION_HEADER_T;");
				executesSQL("insert into "+json.schema+".FUNC_HEADER_"+json.key+" values ('Oid', '"+json.key+"');");
				executesSQL("create table "+json.schema+".CREATE_CONFIG_"+json.key+" like "+json.schema+".OPERATION_CONFIG_T;");
				executesSQL("create table "+json.schema+".RETRAIN_CONFIG_"+json.key+" like "+json.schema+".OPERATION_CONFIG_T;");
				executesSQL("create table "+json.schema+".APPLY_CONFIG_"+json.key+" like "+json.schema+".OPERATION_CONFIG_T;");

				//create and train config
				$.each(json.create_and_train, function(i, item){
					executesSQL("insert into "+json.schema+".CREATE_CONFIG"+json.key+" values ('"+item.key+"', '"+item.value+"');");
				});

				//retrain config
				$.each(json.retrain, function(i, item){
					executesSQL("insert into "+json.schema+".RETRAIN_CONFIG"+json.key+" values ('"+item.key+"', '"+item.value+"');");
				});

				//apply config
				$.each(json.apply, function(i, item){
					executesSQL("insert into "+json.schema+".APPLY_CONFIG"+json.key+" values ('"+item.key+"', '"+item.value+"');");
				});

				// create the description of the application table
				sqlDesc += "create table "+json.schema+".APPL_DESC_"+json.key+" like "+json.schema+".VARIABLE_DESC_T;\n";
				// create the role of the application table
				sqlRole += "create table "+json.schema+".APPL_ROLES_"+json.key+" like "+json.schema+".VARIABLE_ROLES_T;\n";				

				$.each(json.table, function(i, item){

					/*********************************
					* TABLE APPLICATION, APPLICATION_NEW_T and APPLICATION_T 
					*********************************/
					sqlTable += item.columnName + " " + item.dataType;
					sqlTableType += item.columnName + " " + item.dataType;

					if (item.target != true) sqlTableNewType += item.columnName + " " + item.dataType;

					if (item.dataLength != '') {
						sqlTable += "("+item.dataLength+")";
						sqlTableType += "("+item.dataLength+")";

						if (item.target != true) sqlTableNewType += "("+item.dataLength+")";
					} 

					if (item.nullable == 'N') {
						sqlTable += " NOT NULL,\n"
						sqlTableType += " NOT NULL,\n"

						if (item.target != true) sqlTableNewType += " NOT NULL,\n"
					} else {
						sqlTable += " NULL,\n"
						sqlTableType += " NULL,\n"

						if (item.target != true) sqlTableNewType += " NULL,\n"
					}

					/*********************************
					* TABLE DESCRIPTION
					*********************************/
				    sqlDesc += "insert into "+json.schema+".APPL_DESC_"+json.key+" values ";
				    sqlDesc += "("+i+", ";
				    sqlDesc += "'"+item.columnName+"', ";
				    
				    //Data type
				    //Character data
				    if ((item.dataType == 'VARCHAR') || (item.dataType == 'NVARCHAR') ||
					    (item.dataType == 'ALPHANUM') || (item.dataType == 'SHORTTEXT')) {
						sqlDesc += "'string', 'nominal' ";
				    //Binary data
				    } else if (item.dataType == 'VARBINARY') {
				    	sqlDesc += "'integer',  'continuous', ";				    
				    //Interger data
				    } else if ((item.dataType == 'TINYINT') || (item.dataType == 'SMALLINT') ||
					    	  (item.dataType == 'INTEGER') || (item.dataType == 'BIGINT')) {
				    	sqlDesc += "'integer',  'continuous', ";
				    //Numeric data
				    } else if ((item.dataType == 'SMALLDECIMAL') || (item.dataType == 'REAL') || 
				    		  (item.dataType == 'DOUBLE') || (item.dataType == 'FLOAT') || 
				    		  (item.dataType == 'DECIMAL') || (item.dataType == 'DEC') ||
				    		  (item.dataType == 'NUMBER')) {
				    	sqlDesc += "'number',  'continuous', ";
				    //Date data
				    } else if ((item.dataType == 'DATE') || (item.dataType == 'SECONDDATE')) {
		                sqlDesc += "'date', 'nominal' ";
		            //Date timestamp
				    } else if ((item.dataType == 'TIME') || (item.dataType == 'TIMESTAMP')) {
		                sqlDesc += "'datetime', 'nominal' ";
		            //Data string
				    } else {
				    	sqlDesc += "'string', 'nominal' ";
				    }

			        if (item.primaryKey == 'Y') {
			            sqlDesc += "1, ";
			        } else {
			            sqlDesc += "0, ";
			        }
				        
			        sqlDesc += "0, '???', NULL, NULL);\n";

					if (item.primaryKey =='Y') {
						/*********************************
						* TABLE
						*********************************/
						sqlTablePK += "PRIMARY KEY (" + item.columnName + ")\n";
						/*********************************
						* TABLE OUT
						*********************************/
					    sqlOutTable += "'"+item.columnName+"' "+item.dataType+",\n";
					}


					if (item.target == true) {
						/*********************************
						* TABLE OUT
						*********************************/
					    sqlOutTarget += "'"+item.columnName+"' "+item.dataType;

						if (item.dataLength != '') {
							sqlOutTarget += "("+item.dataLength+"),\n";
						} else {
							sqlOutTarget += ",\n";
						}

					    sqlOutRr += "'rr_"+item.columnName+"' DOUBLE,\n";
					    sqlOutDecisionRr += "'decision_rr_"+item.columnName+"' NVARCHAR(3),\n";
					    sqlOutProbDecisionRr += "'proba_decision_rr_"+item.columnName+"' DOUBLE \n";

						/*********************************
						* TABLE ROLE
						*********************************/
					    sqlRole += "insert into "+json.schema+".APPL_ROLES_"+json.key+" values ('"+item.columnName+"', 'target');";
					}

				});
				

				sqlTable += sqlTablePK;
				sqlTableType += sqlTablePK;
				sqlTableNewType += sqlTablePK;

				sqlOutTable += sqlOutTarget;
				sqlOutTable += sqlOutRr;
				sqlOutTable += sqlOutDecisionRr;
				sqlOutTable += sqlOutProbDecisionRr;

				sqlTable += ");";
				sqlTableType += ");";
				sqlTableNewType += ");";
				sqlOutTable += ");";

				executesSQL(sqlTable);
				executesSQL(sqlTableType);
				executesSQL(sqlTableNewType);
				executesSQL(sqlOutTable);

				executesSQL(sqlDesc);
				executesSQL(sqlRole);

				executesSQL("create column table "+json.schema+".CALL_SIGNATURE_"+json.key+" like "+json.schema+".PROCEDURE_SIGNATURE_T;");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (1,'"+json.schema+"','FUNCTION_HEADER_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (2,'"+json.schema+"','OPERATION_CONFIG_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (3,'"+json.schema+"','VARIABLE_DESC_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (4,'"+json.schema+"','VARIABLE_ROLES_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (5,'"+json.schema+"','APPL_"+json.key+"_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (6,'"+json.schema+"','MODEL_BIN_OID_T', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (7,'"+json.schema+"','OPERATION_LOG_T', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (8,'"+json.schema+"','SUMMARY_T', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (9,'"+json.schema+"','INDICATORS_T', 'OUT');");

				executesSQL("call SYS.AFLLANG_WRAPPER_PROCEDURE_DROP('"+json.schema+"','APLWRAPPER_CREATE_MODEL_AND_TRAIN_"+json.key+"');");
				executesSQL("call SYS.AFLLANG_WRAPPER_PROCEDURE_CREATE('APL_AREA','CREATE_MODEL_AND_TRAIN','"+json.schema+"', 'APLWRAPPER_CREATE_MODEL_AND_TRAIN_"+json.key+"', "+json.schema+".CALL_SIGNATURE_"+json.key+");");

				executesSQL("delete from "+json.schema+".CALL_SIGNATURE_"+json.key+";");
				executesSQL("create column table "+json.schema+".CALL_SIGNATURE_"+json.key+" like "+json.schema+".PROCEDURE_SIGNATURE_T;");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (1,'"+json.schema+"','FUNCTION_HEADER_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (6,'"+json.schema+"','MODEL_BIN_OID_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (2,'"+json.schema+"','OPERATION_CONFIG_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (5,'"+json.schema+"','APPL_"+json.key+"_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (6,'"+json.schema+"','MODEL_BIN_OID_T', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (7,'"+json.schema+"','OPERATION_LOG_T', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (8,'"+json.schema+"','SUMMARY_T', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (9,'"+json.schema+"','INDICATORS_T', 'OUT');");

				executesSQL("call SYS.AFLLANG_WRAPPER_PROCEDURE_DROP('"+json.schema+"','APLWRAPPER_RETRAIN_MODEL_"+json.key+"');");
				executesSQL("call SYS.AFLLANG_WRAPPER_PROCEDURE_CREATE('APL_AREA','RETRAIN','"+json.schema+"', 'APLWRAPPER_RETRAIN_TRAIN_"+json.key+"', "+json.schema+".CALL_SIGNATURE_"+json.key+");");

				executesSQL("delete from "+json.schema+".CALL_SIGNATURE_"+json.key+";");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (1, '"+json.schema+"','FUNCTION_HEADER_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (2, '"+json.schema+"','MODEL_BIN_OID_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (3, '"+json.schema+"','OPERATION_CONFIG_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (4, '"+json.schema+"','APPL_"+json.key+"_NEW_T', 'IN');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (5, '"+json.schema+"','APPL_"+json.key+"_T_OUT', 'OUT');");
				executesSQL("insert into "+json.schema+".CALL_SIGNATURE_"+json.key+" values (6, '"+json.schema+"','OPERATION_LOG_T', 'OUT');");

				executesSQL("call SYS.AFLLANG_WRAPPER_PROCEDURE_DROP('"+json.schema+"','APLWRAPPER_APPLY_MODEL_"+json.key+"');");
				executesSQL("call SYS.AFLLANG_WRAPPER_PROCEDURE_CREATE('APL_AREA','APPLY_MODEL','"+json.schema+"', 'APLWRAPPER_APPLY_MODEL_"+json.key+"', "+json.schema+".CALL_SIGNATURE_"+json.key+");");

				//TODO - verificar se realmente é necessário criar elas. Elas podem ser montadas na procedure atraves de consultas 
				// nas tabelas auxiliares do modelo
				executesSQL("drop table "+json.schema+".APPL_"+json.key+"_APPLY;");
				executesSQL("drop table "+json.schema+".SUMMARY_"+json.key+";");
				executesSQL("drop table "+json.schema+".INDICATORS_"+json.key+";");
				executesSQL("drop table "+json.schema+".MODEL_TRAIN_BIN_"+json.key+";");
				executesSQL("drop table "+json.schema+".OPERATION_LOG_"+json.key+";");

				//TODO - verificar se realmente é necessário criar elas. Elas podem ser montadas na procedure atraves de consultas 
				// nas tabelas auxiliares do modelo
				executesSQL("create table "+json.schema+".APPL_"+json.key+"_APPLY like "+json.schema+".APPL_"+json.key+"_T_OUT;");
				executesSQL("create table "+json.schema+".SUMMARY_"+json.key+" like "+json.schema+".SUMMARY_T;");
				executesSQL("create table "+json.schema+".INDICATORS_"+json.key+" like "+json.schema+".INDICATORS_T;");
				executesSQL("create table "+json.schema+".MODEL_TRAIN_BIN_"+json.key+" like "+json.schema+".MODEL_BIN_OID_T;");
				executesSQL("create table "+json.schema+".OPERATION_LOG_"+json.key+" like "+json.schema+".OPERATION_LOG_T;");

/*
	         },
	         error: function(error) {
	               console.log(error);
	         }
	    });                  
*/


};

var postModel=function(){
		
	var modelJson = {};
	var rows = [];
	var config = {};
	var create_and_train = [];
	var retrain = [];
	var apply = [];
	var verifyTarget = false;

	modelJson.key =  new Date().getFullYear().toString()+
					(new Date().getMonth()+1).toString()+
					new Date().getDate().toString()+
					new Date().getHours().toString()+
					new Date().getMinutes().toString()+
					new Date().getSeconds().toString();
	modelJson.columnName = $('fieldset.model-form input.modelname').val();
	modelJson.description = $('fieldset.model-form textarea.modeldescription').val();
	modelJson.schema = $('fieldset.model-table input.modelschema').val();
	modelJson.referenceTable = $('fieldset.model-table input.modelreferencetable').val();

	$('table#data-table tbody tr').each(function(i, n){
	    var $row = $(n);
	    
	    if ($row.find('td:eq(7) input[type=checkbox]').prop('checked') == true){
	    	verifyTarget = true;
	    }

	    if ($row.find('td:eq(0) input[type=checkbox]').prop('checked') == true){
		    rows.push({	        
		        columnName: $row.find('td:eq(1)').text(),
		        dataType: $row.find('td:eq(2)').text(),
		        dataLength: $row.find('td:eq(3)').text(),
				dataDefault: $row.find('td:eq(4)').text(),
		        nullable: $row.find('td:eq(5)').text(),
				primaryKey: $row.find('td:eq(6)').text(),
		        target: $row.find('td:eq(7) input[type=checkbox]').prop('checked'), 
		    });
		}
	});

	if (verifyTarget == false){
		alert("Select at least one target!")
		return false;
	}

	modelJson.table = rows;

	config.key = "APL/ModelType";
	config.value = $('fieldset.model-form select.modeltype').prop('value');
	create_and_train.push(config);

	config = {};
	config.key = "APL/CuttingStrategy";
	config.value = $('fieldset.model-create-and-train select.createandtrain-cuttingstrategy').prop('value');
	create_and_train.push(config);
	
	config = {};
	config.key = "APL/VariableAutoSelection";
	config.value = $('fieldset.model-create-and-train select.createandtrain-variableautoselection').prop('value');
	create_and_train.push(config);
	
	config = {};
	config.key = "APL/VariableAutoSelection";
	config.value = $('fieldset.model-retrain select.retrain-variableautoselection').prop('value');
	retrain.push(config);
	
	config = {};
	config.key = "APL/ApplyExtraMode";
	config.value = $('fieldset.model-apply select.apply-extramode').prop('value');
	apply.push(config);

	modelJson.create_and_train = create_and_train;
	modelJson.retrain = retrain;
	modelJson.apply = apply;	

	//console.log(JSON.stringify(modelJson));
	genareteScript(modelJson);

	/*

	$.ajax({
	 type: 'GET',
	 url: url,
	 dataType: 'json',
	 success: function(json) {
	       
	       $.each(json, function(i, item){
	        
	        	//var status = "<button class='btn btn-warning btn-xs m-r-5'><i class='fa fa-power-off'></i> Activate</button>";

	            var line = "<tr>"
	            		 +"		<td class='actions'><input type='checkbox' data-render='switchery' data-theme='blue' data-change='check-switchery-state-text' checked /></td>"
	                   	 +"		<td>"+item.columnName+"</td>"
	                   	 +"		<td>"+item.dataType+"</td>"
	                   	 +"		<td>"+item.size+"</td>"
	                   	 +"		<td>"+item.nullable+"</td>"
	                   	 +"		<td>"+item.primaryKey+"</td>"
	                   	 +"		<td class='targets'><input type='checkbox' data-render='switchery' data-theme='red' data-change='check-switchery-state-text' unchecked /></td>"
	                   	 +" </tr>";

	                $('table#data-table tbody').append(line);

	        });

			if($("#data-table").length!==0){
				$("#data-table").DataTable();	

				renderSwitcher();
				checkSwitcherState();

			}
			
	 },
	 error: function(error) {
	       console.log(error);
	 }
	});                  


	*/
};

var loadCreateAndTrainOperationConfig=function(modelType,loadModelType){
		
	$('fieldset.model-create-and-train select.createandtrain-cuttingstrategy').empty();
	$('fieldset.model-create-and-train select.createandtrain-variableautoselection').empty();

	url = "../assets/json/modelOperationConfig.json";

	$.ajax({
	 type: 'GET',
	 url: url,
	 dataType: 'json',
	 success: function(json) {

		$.each(json.create_and_train, function(i, operationConfig){

			if (operationConfig.key == "APL/ModelType") {
				if (loadModelType == true){
		        	$.each(operationConfig.values, function(i, item){
		        		$('fieldset.model-form select.modeltype').append("<option value='"+item+"'>"+item+"</option>");
		        	});
		        loadModelType = false;
				}
			}

	        if (operationConfig.key == "APL/CuttingStrategy") {

	        	var cuttingStrategy = "";

	        	if (modelType == "regression/classification"){
	        		cuttingStrategy = operationConfig.regression_classification;
	        	} else if(modelType == "clustering"){
	        		cuttingStrategy = operationConfig.clustering;
	        	} else {
	        		cuttingStrategy = operationConfig.timeseries;
	        	}

	        	$.each(cuttingStrategy, function(i, item){

					var itemSelected = "";
					if(item.default == "Y") {
						itemSelected = "selected";
					} else {
						itemSelected = "";
					}

	        		$('fieldset.model-create-and-train select.createandtrain-cuttingstrategy').append("<option "+itemSelected+" value='"+item.type+"'>"+item.type+"</option>");
	        	});
	        }

	        if (operationConfig.key == "APL/VariableAutoSelection") {

	        	$.each(operationConfig.values, function(i, item){

					var itemSelected = "";
					if(item.default == "Y") {
						itemSelected = "selected";
					} else {
						itemSelected = "";
					}

	        		$('fieldset.model-create-and-train select.createandtrain-variableautoselection').append("<option "+itemSelected+" value='"+item.type+"'>"+item.type+"</option>");
	        	});
	        }

		});
			
	 },
	 error: function(error) {
	       console.log(error);
	 }
	});                  

};

var loadRetrainOperationConfig=function(modelType){

	$('fieldset.model-retrain select.retrain-variableautoselection').empty();

	url = "../assets/json/modelOperationConfig.json";

	$.ajax({
	 type: 'GET',
	 url: url,
	 dataType: 'json',
	 success: function(json) {

		$.each(json.retrain, function(i, operationConfig){

	        if (operationConfig.key == "APL/VariableAutoSelection") {
	        	$.each(operationConfig.values, function(i, item){

					var itemSelected = "";
					if(item.default == "Y") {
						itemSelected = "selected";
					} else {
						itemSelected = "";
					}

	        		$('fieldset.model-retrain select.retrain-variableautoselection').append("<option "+itemSelected+" value='"+item.type+"'>"+item.type+"</option>");
	        	});
	        }

		});
			
	 },
	 error: function(error) {
	       console.log(error);
	 }
	});                  

};

var loadApplyOperationConfig=function(modelType){
		
	url = "../assets/json/modelOperationConfig.json";

	$('fieldset.model-apply select.apply-extramode').empty();

	$.ajax({
	 type: 'GET',
	 url: url,
	 dataType: 'json',
	 success: function(json) {

		$.each(json.apply, function(i, operationConfig){

	        if (operationConfig.key == "APL/ApplyExtraMode") {
	        	var extraMode = "";

	        	if (modelType == "regression/classification"){
	        		extraMode = operationConfig.regression_classification;
	        	} else if(modelType == "clustering"){
	        		extraMode = operationConfig.clustering;
	        	} else {
	        		extraMode = operationConfig.timeseries;
	        	}

	        	$.each(extraMode, function(i, item){

					var itemSelected = "";
					if(item.default == "Y") {
						itemSelected = "selected";
					} else {
						itemSelected = "";
					}

	        		$('fieldset.model-apply select.apply-extramode').append("<option "+itemSelected+" value='"+item.type+"'>"+item.type+"</option>");

	        	});
	        }

		});
			
	 },
	 error: function(error) {
	       console.log(error);
	 }
	});                  

};


var loadTableDescription=function(){

	$('table#data-table tbody tr').empty();
		
	url = "../assets/json/table-description.json";

	$.ajax({
	 type: 'GET',
	 url: url,
	 dataType: 'json',
	 success: function(json) {
	       
	       $.each(json, function(i, item){
	        
	        	//var status = "<button class='btn btn-warning btn-xs m-r-5'><i class='fa fa-power-off'></i> Activate</button>";

	            var line = "<tr>"
	            		 +"		<td class='actions'><input type='checkbox' data-render='switchery' data-theme='blue' data-change='check-switchery-state-text' checked /></td>"
	                   	 +"		<td>"+item.columnName+"</td>"
	                   	 +"		<td>"+item.dataType+"</td>"
	                   	 +"		<td>"+item.dataLength+"</td>"
	                   	 +"		<td>"+item.dataDefault+"</td>"
	                   	 +"		<td>"+item.nullable+"</td>"
	                   	 +"		<td>"+item.primaryKey+"</td>"
	                   	 +"		<td class='targets'><input type='checkbox' data-render='switchery' data-theme='red' data-change='check-switchery-state-text' unchecked /></td>"
	                   	 +" </tr>";

	                $('table#data-table tbody').append(line);

	        });

			if($("#data-table").length!==0){
				$("#data-table").DataTable();	

				renderSwitcher();
				checkSwitcherState();

			}
			
	 },
	 error: function(error) {
	       console.log(error);
	 }
	});                  

};

var green="#00acac",red="#ff5b57",blue="#348fe2",purple="#727cb6",orange="#f59c1a",black="#2d353c";

var renderSwitcher=function(){if($("[data-render=switchery]").length!==0){$("[data-render=switchery]").each(function(){var e=green;if($(this).attr("data-theme")){switch($(this).attr("data-theme")){case"red":e=red;break;case"blue":e=blue;break;case"purple":e=purple;break;case"orange":e=orange;break;case"black":e=black;break}}var t={};t.color=e;t.secondaryColor=$(this).attr("data-secondary-color")?$(this).attr("data-secondary-color"):"#dfdfdf";t.className=$(this).attr("data-classname")?$(this).attr("data-classname"):"switchery";t.disabled=$(this).attr("data-disabled")?true:false;t.disabledOpacity=$(this).attr("data-disabled-opacity")?$(this).attr("data-disabled-opacity"):.5;t.speed=$(this).attr("data-speed")?$(this).attr("data-speed"):"0.5s";var n=new Switchery(this,t)})}};

var checkSwitcherState=function(){$('[data-click="check-switchery-state"]').live("click",function(){alert($('[data-id="switchery-state"]').prop("checked"))});$('[data-change="check-switchery-state-text"]').live("change",function(){$('[data-id="switchery-state-text"]').text($(this).prop("checked"))})};


$(document).ready(function() {

    $('fieldset.model-action button.save').click(function(e){

   		postModel();
   		e.preventDefault();
    });

    $('fieldset.model-table button.load').click(function(e){

   		loadTableDescription();
   		e.preventDefault();
    });

    $('fieldset.model-form select.modeltype').change(function(e){

   		loadCreateAndTrainOperationConfig($('fieldset.model-form select.modeltype').val(),false);
   		loadRetrainOperationConfig($('fieldset.model-form select.modeltype').val());
   		loadApplyOperationConfig($('fieldset.model-form select.modeltype').val());

   		e.preventDefault();
    });
	
    activeMenu('model');
    loadCreateAndTrainOperationConfig("regression/classification",true);
    loadRetrainOperationConfig("regression/classification");
	loadApplyOperationConfig("regression/classification");

    // Default
	App.init();

});