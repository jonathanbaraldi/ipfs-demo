// API local para cada usário que se logar
var api = "json/user1.json";

function Instructions() {
	$('.login-content .instructions').toggle();
}

function Login(){


	spinner="<span class='loader'><i class='fa fa-2x fa-spinner'></i></span>";
	
	$('.login-content .login-buttons button.btn-success').html(spinner);
	$('.login-content .login-buttons button.btn-success span').fadeIn();
	

	user = $('.login-content input.user').val();
	pass = $('.login-content input.pass').val();
	
	if (user!==""&&pass!=="") {
		
		// url = api+user+".json";
		
		data = JSON.stringify({
								'user' : user,
								'pass' : pass
		    				  });
		
		$.ajax({
		    type: 'GET',
		    url: api,
		    //data: data,
		    dataType: 'json',
		    success: function(json) {
		    	console.log(json);


				
				if (json.statusCode==403) {
					$('.login-content .error label').text(json.message);					
					$('.login-content .error').fadeIn('slow');

					textoBotao='Sign me in';
					$('.login-content .login-buttons button.btn-success').text(textoBotao);
	
				} else {
					$('.login-content .error').fadeOut();
					
					/*
					sessionStorage.setItem('accessKeyId',accessKeyId);
					sessionStorage.setItem('secretAccessKey',secretAccessKey);

					localStorage.setItem('accessKeyId',accessKeyId);
					localStorage.setItem('secretAccessKey',secretAccessKey);				

					*/
					mensagem="Login successful! You're being redirected...";
					// $('.login-content .success label').text(mensagem);					
					// $('.login-content .success').fadeIn('slow');
					
					localStorage.setItem('user','user1');

					$('.login-content .login-buttons button.btn-success span').fadeOut();
					$('.login-content .login-buttons button.btn-success').html(mensagem);

					setTimeout(function(){
						window.location="home.html";
					},300);
				
				}
				

		    },
		    error: function(json) {
		    	console.log('ERRO');
		    	// LoginRedirect(user, 'new');
		    }
		});



	} else {
		
		textoBotao='Sign me in';
		$('.login-content .login-buttons button.btn-success').text(textoBotao);

		alert("You need to inform both user and password.");
	}
}

function LoginRedirect(user, status) {

	if (status=='old') {
		base = "yes"
	} else {
		base = "no"
	}

	$('.login-content .error').fadeOut();
					
	sessionStorage.setItem('user',user);
	localStorage.setItem('user',user);
	
	sessionStorage.setItem('base',base);
	localStorage.setItem('base',base);				

	mensagem="Login successful! You're being redirected...";
	// $('.login-content .success label').text(mensagem);					
	// $('.login-content .success').fadeIn('slow');
	
	$('.login-content .login-buttons button.btn-success span').fadeOut();
	$('.login-content .login-buttons button.btn-success').html(mensagem);

	console.log(user);
	
	setTimeout(function(){
		window.location="home.html";
	},300);
	
}

/*
function Remember() {
	accessKeyId = localStorage.getItem('accessKeyId');
	secretAccessKey = localStorage.getItem('secretAccessKey');

	if (accessKeyId&&secretAccessKey) {
		
		$('.login-content input.accesskey').val(accessKeyId);
		$('.login-content input.secretkey').val(secretAccessKey);
	}
}
*/


$(document).ready(function() {
	App.init();
	LoginV2.init();
	// changeIcon();
	
	// Remember();

	$("input").keypress(function(event) {
	    if (event.which == 13) {
	        event.preventDefault();
	        Login();
	    }
	});

	$('.login-content .instructionsBegin strong').click(function(){
		Instructions();
	});

	$('.login-content button.btn-success').click(function(){
		Login();
	});

});