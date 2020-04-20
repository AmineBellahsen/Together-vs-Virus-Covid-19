
function BusinessValidator()
{
// build array maps of the form inputs & control groups //

	this.formFields = [$('#bname-tf'), $('#baddr-tf'), $('#bcity-tf'), $('#bplan-tf')];
	this.controlGroups = [$('#bname-cg'), $('#baddr-cg'), $('#bcity-cg'), $('#bplan-cg')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateString = function(s)
	{
		return s.length >= 3;
	}
	
	this.showErrors = function(a)
	{
		$('.modal-form-errors .modal-body p').text('Please correct the following problems :');
		var ul = $('.modal-form-errors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		this.alert.modal('show');
	}

}
BusinessValidator.prototype.showError = function(e)
{
	//this.controlGroups[1].addClass('error');
	this.showErrors([e]);
}
BusinessValidator.prototype.validateForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateString(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); 
		e.push('Please Enter a Name for the Business');
	}
	if (this.validateString(this.formFields[1].val()) == false) {
		this.controlGroups[1].addClass('error');
		e.push('Please Enter A Valid Address');
	}
	if (this.validateString(this.formFields[2].val()) == false) {
		this.controlGroups[2].addClass('error');
		e.push('Please Choose A Valid City Name');
	}
	if (this.validateString(this.formFields[3].val()) == false) {
		this.controlGroups[3].addClass('error');
		e.push('A valid file should be selected!');
	}
	if (e.length) this.showErrors(e);
	return e.length === 0;
}

