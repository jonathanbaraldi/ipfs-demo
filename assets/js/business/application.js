


function loadModels() {
    console.log("AQUI");

     var url = "../assets/json/model.json";
     $.ajax({
         type: 'GET',
         url: url,
         dataType: 'json',
         success: function(json) {
               
               $.each(json, function(i, item){

                    var checkButton = $(".row.model .panel-body.model-choose button#"+item.PROCEDURE).html();

                    if (checkButton!==undefined) {
                    
                        console.log("repetido");
                    
                    } else {
                        modelButton = "<button id='"+item.PROCEDURE+"' procedure='"+item.PROCEDURE+"' value='"+item.NAME+"' id='model"+item.OID_VERSION+"' class='btn btn-default'>"+item.NAME+"</button> ";

                        $('.row.model .panel-body.model-choose').append(modelButton);             
                    }

                    versionButton = "<button name='"+item.NAME+"' id='"+item.OID_VERSION+"' class='btn btn-default btn-xs m-r-5 "+item.PROCEDURE+"'> v."+item.OID_VERSION+"</button> ";
                    
                    $('.row.model .panel-body.version-choose').append(versionButton);
                    
                    $('.row.model .panel-body.version-choose button').fadeOut();
                });
                
         },
         error: function(error) {
               console.log(error);
         }
     });                  
};

function modelChoose(id,name,procedure) {
    
    clearResult();
    
    sessionStorage.setItem('modelOid',id);
    sessionStorage.setItem('modelName',name);
    sessionStorage.setItem('procedure',procedure);

    $('.row.model .panel-body.version-choose button').hide();
    $('.form-application').fadeOut();
    
    $('button.btn-primary i').remove();
    $('button.btn-primary').addClass('btn-default');
    $('button.btn-primary').removeClass('btn-primary');
    
    $('button#'+id).removeClass('btn-default');
    $('button#'+id).addClass('btn-primary');
    
    var text = $('button#'+id).text();
    $('button#'+id).text("");
    text = "<i class='fa fa-check'></i> "+text;
    $('button#'+id).append(text);
    
    $('.row.model .panel-body.version-choose button.'+procedure).fadeIn();
    
    $('.row.model .panel-body.version-choose').fadeIn();
}


function versionChoose(version) {
    
    clearResult();
    
    sessionStorage.setItem('versionOid',version);

    // $('.row.model .panel-body.version-choose button').hide();
    
    $('.row.model .panel-body.version-choose button i').remove();
    
    $('.row.model .panel-body.version-choose button.btn-primary').addClass('btn-default');
    $('.row.model .panel-body.version-choose button.btn-primary').removeClass('btn-primary');
    
    $('.row.model .panel-body.version-choose button#'+version).removeClass('btn-default');
    $('.row.model .panel-body.version-choose button#'+version).addClass('btn-primary');
    
    var text = $('.row.model .panel-body.version-choose button#'+version).text();
    $('.row.model .panel-body.version-choose button#'+version).text("");
    text = "<i class='fa fa-check'></i> "+text;
    $('.row.model .panel-body.version-choose button#'+version).append(text);
    
    $('.row.model .panel-body.version-choose').fadeIn();
    
    // DEVEMOS CHAMAR PROCS DE MODELOS DIFERENTES
    
    // loadApplication(version);

    mensagem = sessionStorage.getItem('modelName')+" - "+version;
    console.log(mensagem);

    $('.row.application h4.panel-title').text(mensagem);

    $('.row.application').show();

}


function clearResult() {
    $('.row.result').hide();
    $('.row.result  table.result tbody tr').remove();
}

function clearSession() {
    sessionStorage.removeItem('versionOid');
}


$(document).ready(function() {

    activeMenu('application');

    loadModels();

    $('.row.model .panel-body.model-choose button').live('click', function(e){
        var id = this.id;
        var name = $(this).attr("value");
        var procedure = $(this).attr("procedure");
        modelChoose(id,name,procedure);
        e.preventDefault();
    });
    
    $('.row.model .panel-body.version-choose button').live('click', function(e){
        var version = this.id;
        versionChoose(version);
        e.preventDefault();
    });




    // LOADER
    $('.controls button.enviar').live('click', function(e){
        $('#loader-wrapper').fadeIn('slow');
        
        setTimeout(function(){
            $('#loader-wrapper').fadeOut('slow');

            $('.row.result').fadeIn();
        },2000);

    });

	// $('#page-loader').removeClass('hide');
    // $('#page-loader').fadeOut('slow');

    $('#loader-wrapper').fadeOut();


    $('.row.model .panel-body.version-choose').hide();
    $('.row.result').hide();

    $('.row.application').hide();


    // Default
    App.init();
    // $('.form-application').hide();


    $("#wizard").bwizard();


});