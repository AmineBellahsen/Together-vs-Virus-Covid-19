
$(document).ready(function(){
	
	var av = new BusinessValidator();
	//var sc = new SignupController();
	
	$('#business-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			//$("#business-form")[0].reset();
			if (status == 'success'){
				window.location.href = '/business/panel/'+responseText;
			}
			//$('.modal-alert').modal('show');
		},
		contentType: false, //this is requireded please see answers above
		processData: false, //this is requireded please see answers above
		error : function(e){
			av.showError(e.responseText);
		}
	});
	//$('#name-tf').focus();
	
// customize the business creation form //
	$('#business-form h2').text('Add new Business');
	$('#business-form #sub').text('Please tell us a little about the business');
	$('#business-form-btn1').hide();
	$('#business-form-btn2').html('Create');
	$('#business-form-btn2').addClass('btn-primary');
	$('#accordionSidebar li').removeClass("active");
	$('#accordionSidebar li#config').addClass("active");
	$('#accordionSidebar li#config a').click();
	$('#configSubMenu a#newbusiness').addClass("active")
// setup the alert that displays when a business is successfully created //

	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Business Created!');
	$('.modal-alert .modal-body p').html('The business has been created. The user will receive en email shortly.</br>Click OK to dismiss this message.');

});