
/**function validador(){
	var msg, num = document.getElementById('num').value;
	var s1 = document.getElementById('base').value;
	s1 = parseInt(s1);

	num = num.toUpperCase();

	var boolMsg = false;

	var valorDigito;
	var numero = '';
	for(var i = 0; i < num.length; i++){
		var ascii = num.charCodeAt(i);
		//digitos de 0 à 9
		if(ascii >= 48 && ascii <= 57){
			valorDigito = ascii - 48;
	
		}else if(ascii >= 65 && ascii <= 90){
			valorDigito = ascii - 55;
		}else
			valorDigito = -1;

		if(valorDigito >= 0 && valorDigito <= s1-1){
			numero += num[i];	
		}else{
			boolMsg = true;
		}
	}
	if(boolMsg){
		msg = "<i class='material-icons'>warning</i> <text style='margin-left: 10px'>caractere(s)inválido(s)  </text>"
		M.toast({html: msg, displayLength: 3000});
	}
	num = parseInt(num, s1);
	num = num.toString(s1);
	num = num.toUpperCase();

	if(num == "0"){
		numero = '';
		msg = "<i class='material-icons'>warning</i> <text style='margin-left: 10px'>Digite um número não nulo</text>"
		M.toast({html: msg, displayLength: 3000});
	}


	document.getElementById('num').value = numero;

}**/

function validador(){
	var msg, num = document.getElementById('num').value;
	var s1 = document.getElementById('base').value;
	s1 = parseInt(s1);

	num = num.toUpperCase();

	var boolMsg = false;

	var valorDigito;
	var numero = '';
	var ponto = false;
	for(var i = 0; i < num.length; i++){
		if(num[i] == '.' && !ponto){
			numero += num[i];
			ponto = true;
		}else{
			var ascii = num.charCodeAt(i);
			//digitos de 0 à 9
			if(ascii >= 48 && ascii <= 57){
				valorDigito = ascii - 48;
		
			}else if(ascii >= 65 && ascii <= 90){
				valorDigito = ascii - 55;
			}else
				valorDigito = -1;
	
			if(valorDigito >= 0 && valorDigito <= s1-1){
				numero += num[i];	
			}else{
				boolMsg = true;
			}
		}
	}
	if(boolMsg){
		msg = "<i class='material-icons'>warning</i> <text style='margin-left: 10px'>caractere(s)inválido(s)  </text>"
		M.toast({html: msg, displayLength: 3000});
	}

	num = parseFloat(num, s1);
	num = num.toString(s1);
	num = num.toUpperCase();

	/* if(num == "0"){
		numero = '';
		msg = "<i class='material-icons'>warning</i> <text style='margin-left: 10px'>Digite um número não nulo</text>"
		M.toast({html: msg, displayLength: 3000});
	}*/

	document.getElementById('num').value = numero;
}


function n_to_dec(){
	validador();

	var numcon = [];
	numcon[0] = ""; //Mostra os número em forma de polinomio
	numcon[1] = ""; //Mostra os número em forma de polinomio convertendo letras para numeros se houver (testa se o tem digitos que valem acima de 10)
	numcon[2] = ""; //Resultado de cada digito com seu expoente
	numcon[3] = '';
	numcon[4] = 0; //resultado final (soma do polinomio)

	temNumeroAcimade10 = 0; //variavel de teste

	num = document.getElementById('num').value; //número vindo da entrada
	base = document.getElementById('base').value; //base vinda da entrada
	result = document.getElementById('resultado');
	result.innerHTML = '';

	num = num.toUpperCase(); //transforma toda as letras para maiusculo para facilitar o teste

	var indexPonto = num.indexOf('.'); 
	
	var exp = num.length-1;
	if(indexPonto != -1){
		var parteInteira = num.substring(0, indexPonto);
		num = parteInteira + num.substring(indexPonto + 1);
		exp =  indexPonto - 1;
	}


	//percorre cada digito do numero
	for(var i = 0; i < num.length; i++){
		var expoente = exp - i; //valor do expoente de acordo com sua posição
		
		numcon[0] += "<text style='color: #2196f3;font-weight: bold'>"+ num[i] + "</text>x<text style='color: green; font-weight: bold'>" + base + "</text><sup><text style='color: red;font-weight: bold'>" + parseInt(expoente) + "</text></sup> + ";

		var digito = num[i]; //Digito 

		//teste se tem números acima de 10, ex.: A, B, C...
		if(digito.charCodeAt() >= 65 && digito.charCodeAt() <= 90){
			digito = digito.charCodeAt() - 55; //converte a letra para o numero. ex.: B = 11, F = 15...
			temNumeroAcimade10 = 1;
		}

		digito = parseInt(digito);

		numcon[1] += digito.toString() + "x" + base + "<sup>" + parseInt(expoente) + "</sup> + ";

		var calc = Math.pow(parseInt(base), expoente);

		numcon[2] += digito.toString() + 'x' + calc.toString() + ' + ';

		var mult = digito*calc;
		
		numcon[3] +=  mult.toString() + " + ";

		numcon[4] += digito*calc;
	
	}
	numcon[0] = numcon[0].substr(0, numcon[0].length-3);
	numcon[1] = numcon[1].substr(0, numcon[1].length-3);
	numcon[2] = numcon[2].substr(0, numcon[2].length-3);
	numcon[3] = numcon[3].substr(0, numcon[3].length-3);
		
	//Se não tem letras que correspondem a numeros acima de 10, então nao precisa mostrar 
	if(temNumeroAcimade10 == 0)
		numcon[1] = '';

	var text;
	
	for(var i = 0; i < 5; i++){
		text = document.createElement('p');
		text.innerHTML = numcon[i];
		text.setAttribute('style', 'font-size: 20px');

		result.appendChild(text);
	}

	document.getElementById("resu").innerHTML = numcon[4] + "<sub>10</sub>";
}
