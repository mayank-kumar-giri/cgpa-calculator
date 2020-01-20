var arr = [17, 18, 19, 19, 20, 17, 13, 6];

function get_credits()
{
	var arr = $("#c_all").val().split(',');
	for (var i = 0; i < arr.length; i++) {
		arr[i] = parseInt(arr[i].trim());
	}
	var total = 0;
	for (var i = arr.length - 1; i >= 0; i--) total += arr[i];

	return [arr,total];
}

function copy_to_clipboard_from(element_id) {
    var cont = document.getElementById(element_id).textContent;
    cont = cont.trim();
    console.log(cont);
    var el = document.createElement('textarea');
    el.value = cont;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
	document.body.removeChild(el);
	$("#c_all").val(cont);
}

$("#cse16b").on('click keypress', function() {
	copy_to_clipboard_from("cse16");
});

$("#ece16b").on('click keypress', function() {
	copy_to_clipboard_from("ece16");
});
$("#cse17b").on('click keypress',function(){
	copy_to_clipboard_from("cse17");
})
$("#ece17b").on('click keypress',function(){
	copy_to_clipboard_from("ece17");
})

$("#m1").on('click keypress', function(e) {
	var temp = get_credits();
	var arr = temp[0];
	var total = temp[1];
	console.log(arr,total);
	var form_is_html_valid = $("#method1")[0].checkValidity();
    if (form_is_html_valid) 
	{
		e.preventDefault();
		$("#verdict").remove();
		var sems = [];
		sems.push($('#sem1').val());
		sems.push($('#sem2').val());
		sems.push($('#sem3').val());
		sems.push($('#sem4').val());
		sems.push($('#sem5').val());
		sems.push($('#sem6').val());
		sems.push($('#sem7').val());
		sems.push($('#sem8').val());

        var curr_cgpa = 0;
        var projected_cgpa = 0;

        for (var i = 0; i < sems.length; i++) projected_cgpa += (sems[i] * arr[i]);
        projected_cgpa /= total;

    	for (var i = 0; i <= sems.length - 2; i++) curr_cgpa += (sems[i] * arr[i]);
        curr_cgpa /= (total-arr[7]);

        curr_cgpa = Math.round(curr_cgpa*1000)/1000;
        projected_cgpa = Math.round(projected_cgpa*1000)/1000;
        
        var diff = projected_cgpa-curr_cgpa;
        diff = Math.round(diff*1000)/1000;
        
        var percent_change = ((projected_cgpa-curr_cgpa)/curr_cgpa)*100;
        percent_change = Math.round(percent_change*1000)/1000;

        const $verdict = $(`
        	<div id="verdict" class="result" style="display: none;">
				Your current CGPA (Till 7th semester): ${curr_cgpa}<br>
				Your overall CGPA: ${projected_cgpa}<br>
				A total difference of ${diff}, i.e., ${percent_change}% change, LOL :p
			</div>
        `);

        var flag = true;
        for (var i = sems.length - 1; i >= 0; i--) {
        	if(sems[i] == "")
        	{
        		flag = false;
        		break;
        	}
        }


        if(flag) $("#sm1").append($verdict);
		$("#verdict").fadeIn(900);
	}
});


$("#m2").on('click keypress', function(e){
	var temp = get_credits();
	var arr = temp[0];
	var total = temp[1];
	console.log("OKT",arr,total);
	var form_is_html_valid = $("#method2")[0].checkValidity();
	if(form_is_html_valid)
	{
		e.preventDefault();
		$("#verdict").remove();
		const sem6 = $("#sem6m2").val();
		const sem7 = $("#sem7m2").val();
		const sem8 = $("#sem8m2").val();
		const cg5 = $("#cg5").val();
		console.log(sem6,sem7,sem8,cg5);
		var curr_cgpa = 0;
		var projected_cgpa = 0;

		curr_cgpa = cg5;
		projected_cgpa = ((cg5*(total-arr[5]-arr[6]-arr[7]))+(sem6*arr[5])+(sem7*arr[6])+(sem8*arr[7]))/total;
		console.log(projected_cgpa)
		curr_cgpa = Math.round(curr_cgpa*1000)/1000;
		projected_cgpa = Math.round(projected_cgpa*1000)/1000;

		var diff = projected_cgpa - curr_cgpa;
		diff = Math.round(diff*1000)/1000;
		
		var percent_change = ((projected_cgpa-curr_cgpa)/curr_cgpa)*100;
        percent_change = Math.round(percent_change*1000)/1000;

        const $verdict = $(`
        	<div id="verdict" class="result" style="display: none;">
				Your current CGPA (Till 6th semester): ${curr_cgpa}<br>
				Your overall CGPA: ${projected_cgpa}<br>
				A total difference of ${diff}, i.e., ${percent_change}% change, LOL :p
			</div>
		`);
		
		var flag = true;
        console.log(curr_cgpa,projected_cgpa,diff,percent_change);
        console.log(sem8,cg6,sem7,$verdict);
    	if((sem8 == "") || (cg6 == "") || (sem7 == "")) flag = false;
		if(flag) $("#sm2").append($verdict);
		console.log("Its happening");
		$("#verdict").fadeIn(900);
	}
})

$("#m3").on('click keypress', function(e) {
	var temp = get_credits();
	var arr = temp[0];
	var total = temp[1];
	console.log(arr,total);
	var form_is_html_valid = $("#method3")[0].checkValidity();
    if (form_is_html_valid) 
    {
		e.preventDefault();
		$("#verdict").remove();
		const sem7 = $('#sem7m3').val();
		const sem8 = $('#sem8m3').val();
		const cg6 = $('#cg6').val();

        var curr_cgpa = 0;
        var projected_cgpa = 0;

        curr_cgpa = cg6;
        projected_cgpa = ((cg6*(total-arr[7]-arr[6])) + (sem8*arr[7]) + (sem7*arr[6]))/total;

        curr_cgpa = Math.round(curr_cgpa*1000)/1000;
        projected_cgpa = Math.round(projected_cgpa*1000)/1000;
        
        var diff = projected_cgpa-curr_cgpa;
        diff = Math.round(diff*1000)/1000;
        
        var percent_change = ((projected_cgpa-curr_cgpa)/curr_cgpa)*100;
        percent_change = Math.round(percent_change*1000)/1000;

        const $verdict = $(`
        	<div id="verdict" class="result" style="display: none;">
				Your current CGPA (Till 6th semester): ${curr_cgpa}<br>
				Your overall CGPA: ${projected_cgpa}<br>
				A total difference of ${diff}, i.e., ${percent_change}% change, LOL :p
			</div>
        `);

        var flag = true;
        console.log(curr_cgpa,projected_cgpa,diff,percent_change);
        console.log(sem8,cg6,sem7,$verdict);
    	if((sem8 == "") || (cg6 == "") || (sem7 == "")) flag = false;
		if(flag) $("#sm3").append($verdict);
		console.log("Its happening");
		$("#verdict").fadeIn(900);
	}

});


$("#m4").on('click keypress', function(e) {
	var temp = get_credits();
	var arr = temp[0];
	var total = temp[1];
	console.log(arr,total);
	var form_is_html_valid = $("#method4")[0].checkValidity();
    if (form_is_html_valid) 
    {
		e.preventDefault();
		$("#verdict").remove();
		const sem8 = $('#sem8m4').val();
		const cg7 = $('#cg7').val();

        var curr_cgpa = 0;
        var projected_cgpa = 0;

        curr_cgpa = cg7;
        projected_cgpa = ((cg7*(total-arr[7])) + (sem8*arr[7]))/total;

        curr_cgpa = Math.round(curr_cgpa*1000)/1000;
        projected_cgpa = Math.round(projected_cgpa*1000)/1000;
        
        var diff = projected_cgpa-curr_cgpa;
        diff = Math.round(diff*1000)/1000;
        
        var percent_change = ((projected_cgpa-curr_cgpa)/curr_cgpa)*100;
        percent_change = Math.round(percent_change*1000)/1000;

        const $verdict = $(`
        	<div id="verdict" class="result" style="display: none;">
				Your current CGPA (Till 7th semester): ${curr_cgpa}<br>
				Your overall CGPA: ${projected_cgpa}<br>
				A total difference of ${diff}, i.e., ${percent_change}% change, LOL :p
			</div>
        `);

        var flag = true;
    	if((sem8 == "") || (cg7 == "")) flag = false;
		if(flag) $("#sm4").append($verdict);
		
		$("#verdict").fadeIn(900);
	}

});