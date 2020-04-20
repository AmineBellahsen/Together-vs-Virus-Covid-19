
$(document).ready(function(){
// customize the business creation form //
	$('#accordionSidebar li').removeClass("active");
	$('#accordionSidebar li#monitoring').addClass("active");
	$("#camera-list").change(function(){
		$("#content-monitoring").removeClass("invisible");
	})
});