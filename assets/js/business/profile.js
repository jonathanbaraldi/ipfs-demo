/*  Profile.js 	*/

function updateProfile() {
	$(".panel-body.preferences .alert-success").fadeOut('slow');
	$(".panel-body.preferences .alert-success").remove();

	var dateFormat = $("fieldset.preferences select.date-format option:selected" ).val();
	var timeFormat = $("fieldset.preferences select.time-format option:selected" ).val();
	var locale = $("fieldset.preferences select.locale option:selected" ).val();

	if (dateFormat&&timeFormat&&locale) {
		console.log();
		console.log(dateFormat);
		console.log(timeFormat);
		console.log(locale);


		updateProfileSuccess();

	} else {
		// Exibir mensagem de erro.
		console.log("Please check if all fields.");
	}	
}


function updateProfileSuccess() {
	// fazer a chamada da api para atualizar os dados
	// mostrar a mensagem que foi salvo com sucesso.

	success = "<div class='alert alert-success m-b-15'>"
			+		"<strong>Success!</strong>"
			+		" User's preferences saved!"
			+		"<span class='close' data-dismiss='alert'>&times;</span>"
			+	"</div>";
	
	$("fieldset.preferences").after(success);
	$(".panel-body.preferences .alert-success").fadeIn('slow');
}



$(document).ready(function() {
	
    // activeMenu('users');
    $(".combobox").combobox();

    $('fieldset.preferences button.save').click(function(e){
   		
   		updateProfile();
   		
   		e.preventDefault();
    });

    // Default
    App.init();
});


