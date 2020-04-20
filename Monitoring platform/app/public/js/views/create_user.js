
$(document).ready(function(){
	
	var av = new AccountValidator();
	//var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			$("#account-form")[0].reset();
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
				av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
				av.showInvalidUserName();
			}
		}
	});
	//$('#name-tf').focus();
	
// customize the account creation form //
	$('#account-form h2').text('Add new User');
	$('#account-form #sub').text('Please tell us a little about the user');
	$('#account-form-btn1').hide();
	$('#account-form-btn2').html('Submit');
	$('#account-form-btn2').addClass('btn-primary');
	$('#level-list').enable();
	$('#accordionSidebar li').removeClass("active");
	$('#accordionSidebar li#config').addClass("active");
	$('#accordionSidebar li#config a').click();
	$('#configSubMenu a#newuser').addClass("active")
// setup the alert that displays when an account is successfully created //

	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Account Created!');
	$('.modal-alert .modal-body p').html('The account has been created. The user will receive en email shortly.</br>Click OK to dismiss this message.');

});