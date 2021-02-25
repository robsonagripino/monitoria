
function selecionado(select){
	//validador();
	prevNum = '';

	var selectElement1 = document.getElementById('select_origem');
	var selectElement2 = document.getElementById('select_destino');

	var valor1 = selectElement1.value;
	var valor2 = selectElement2.value;

	if(select == 1){
		if(valor1 == valor2){
			selectElement2.value = (parseInt(valor2))%5 + 1;
		}
	}else{
		if(valor1 == valor2){
			selectElement1.value = (parseInt(valor1))%5 + 1;
		}
	}

	$(document).ready(function(){
		$('select').formSelect();
	});
	converter();
	
}
var prevNum = '';
function validador(){
	var num = document.getElementById('numero').value;
	var s1 = document.getElementById('select_origem').value;

	num = num.toUpperCase();
	s1 = 2**parseInt(s1);

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
	num = parseInt(num, s1);
	var prev = parseInt(prevNum, s1);

	if(num > 2**32-1){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>O número possui mais de 32 bits";
		M.toast({html: msg, displayLength: 3000});
		numero = prevNum;
	}

	if(boolMsg){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>Caractere(s) inválido(s)";
		M.toast({html: msg, displayLength: 3000});
	}

	num = num.toString(s1);
	num = num.toUpperCase();

	if(num == "0"){
		numero = '';
		msg = "<i class='material-icons'>warning</i> <text style='margin-left: 10px'>Digite um número não nulo</text>"
		M.toast({html: msg, displayLength: 3000});
	}
	document.getElementById('numero').value = numero;
	prevNum = numero;
}

function converter(){
	validador();

	document.getElementById('nums').innerHTML = '';
	document.getElementById('result').innerHTML = '';
	var numero = document.getElementById('numero').value;
	var s1 = document.getElementById('select_origem').value;
	var s2 = document.getElementById('select_destino').value;
	var base1 = 2**parseInt(s2);

	var result = '';
	if(numero != ''){
		if(s1 == '1'){
			result = bin_to_n(numero, s2);
		}else if(s2 == '1'){
			result = n_to_bin(numero, s1);
		}else{
			result = nb_to_nb(numero, s1, s2);
		}
	}
	if(result != '')
		document.getElementById('result').innerHTML = result+'<sub>'+base1+'</sub>';
}

function tiraEspacos(binAgrup){
	var	bin = '';
	for(var i = 0; i < binAgrup.length; i++){
		if(binAgrup[i] != " "){
			bin += binAgrup[i];
		}
	}
	
	return bin;
}

function agrupamento(binAgrup, agrup){
	var numBitsFalta, bin, dec;
	//Tira possíveis 0's na frente do número 
	bin = tiraEspacos(binAgrup);

	if(bin.length%agrup == 0)
		tam = agrup;
	else
		tam = bin.length%agrup;

	numBitsFalta =  agrup - tam;	
	bitsFalta = "";
	//adiciona os zeros que falta para o agrupamento
	for(var i = 0; i < numBitsFalta; i++){
		bitsFalta += "0";
	}

	bin = bitsFalta + bin;

	binAgrup = "";

	for(var i = 0; i < bin.length; i++){
		binAgrup += bin[i];
		if(i%agrup == agrup-1){
			binAgrup += " ";
		
		}
	}
	return [binAgrup, numBitsFalta ];
}

function n_to_bin(num, agrup){
	var dec, bin, tam, base, returnAgrup; 

	base = 2**agrup;

	dec = parseInt(num, 2**agrup);
	bin = dec.toString(2);
	
	returnAgrup = agrupamento(bin, agrup);
	bin = returnAgrup[0];

	//tira o ultimo espaço feito no agrupamento
	if(bin[bin.length - 1] == ' ')
		bin = bin.substr(0,bin.length-1);

	var p = document.createElement('h5');
	var text = document.createTextNode(num);
	p.appendChild(text);

	var sub = document.createElement('sub');
	sub.innerHTML = base.toString();
	p.appendChild(sub);

	document.getElementById('nums').appendChild(p);

	p = document.createElement('h5');
	//text = document.createTextNode(bin);
	text = document.createElement('text');
	text.innerHTML = "<span style='color:red;'>"+bin.substr(0, returnAgrup[1]) + "</span>" + bin.substr(returnAgrup[1], bin.length);
	p.appendChild(text);

	sub = document.createElement('sub');
	sub.innerHTML = '2';
	p.appendChild(sub);

	document.getElementById('nums').appendChild(p);
	
	return bin;
}


function bin_to_n(binAgrup, agrup){
	var dec, bin, hex, base, returnAgrup;
	
	base = 2**agrup;

	bin = tiraEspacos(binAgrup);
	dec = parseInt(bin, 2);
	bin = dec.toString(2);

	hex = dec.toString(2**agrup);
	hex = hex.toUpperCase();

	console.log(bin);

	returnAgrup= agrupamento(bin, agrup);
	bin = returnAgrup[0];
	console.log(bin);


	if(bin[bin.length - 1] == ' ')
		bin = bin.substr(0,bin.length-1);

	var p = document.createElement('h5');
	var text = document.createTextNode(bin);
	text = document.createElement('text');
	text.innerHTML = "<span style='color:red;'>"+bin.substr(0, returnAgrup[1]) + "</span>" + bin.substr(returnAgrup[1], bin.length);
	p.appendChild(text);

	var sub = document.createElement('sub');
	sub.innerHTML = '2';
	p.appendChild(sub);

	document.getElementById('nums').appendChild(p);

	p = document.createElement('h5');
	text = document.createTextNode(hex);
	p.appendChild(text);

	sub = document.createElement('sub');
	sub.innerHTML = base.toString();
	p.appendChild(sub);

	document.getElementById('nums').appendChild(p);
	return hex;
}

function nb_to_nb(num, agrupOri, agrupDes){
	var bin, nb, binAgrup;
	bin = n_to_bin(num, agrupOri);
	//numero agrupado de acordo com a base de origem
	nb = bin_to_n(bin, agrupDes);
	return(nb);
}
 