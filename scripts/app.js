function generate(){
	var inputTxt = document.getElementById('txt');

	if(inputTxt.value == ""){
		alert('Digite algo');
		inputTxt.focus();
		return;
	}

		var result = document.getElementById('result');
	var base64 = btoa(inputTxt.value);
	var span = document.createElement('span');

	span.innerHTML = base64;
	//result.innerHTML(base64)
	result.appendChild(span);
}

function decode(){
	var inputTxt = document.getElementById('txt');

	if(inputTxt.value == ""){
		alert('Digite algo');
		inputTxt.focus();
		return;
	}

	var result = document.getElementById('result');
	var resultBase64 = atob(inputTxt.value);
	var span = document.createElement('span');

	span.innerHTML = resultBase64;
	//result.innerHTML(resultBase64);
	result.appendChild(span);
}