function real_dec_to_bin(){
	var bin = '';
	var num = document.getElementById('num').value;
	var result = document.getElementById("resultado");
	var p = document.createElement('p');
	base = 16;

	num = parseFloat(num);
	var limite = 0;

	result.innerHTML = '';
	while(num != 0 && limite != 16){
		limite += 1;
		msg = num.toString() + " x "+ base +" = ";
		num = num*base;
	
		pi = Math.trunc(num);
		bin = bin + pi.toString();
	
		num = num%1;
		numStr = num.toString();
		numStrSplited = numStr.split('.');
		index = 1;
		if(numStrSplited.length < 2)
			index = 0
		
		msg += "<text style='color: red'>" + pi.toString()+ "</text>" +"."+ numStrSplited[index];
		console.log(msg)
		var p = document.createElement('p');
		p.innerHTML = msg;
		result.appendChild(p);
	}

	document.getElementById('resu').innerHTML =  '0.'+bin;
}