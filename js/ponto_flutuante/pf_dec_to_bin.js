var prevNum = '';
function validador(){
	var num = document.getElementById('num').value;
	var s1 = document.getElementById('base').value;
	var qntBits =  parseInt(document.getElementById('qntBits').value);

	if(s1 == "16"){
		qntBits = parseInt(qntBits/4);
	}

	var apto = true;

	num = num.toUpperCase();

	var boolMsg = false;

	var valorDigito;

	var numero = '';

	console.log(qntBits);
	for(var i = 0; i < num.length && i < qntBits; i++){
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

	if(!testa_qnt_bit(num)){
		apto = false;
	}

	if(boolMsg){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>Caractere(s) inválido(s)";
		M.toast({html: msg, displayLength: 3000});
	}

	document.getElementById('num').value = numero;
	prevNum = numero;
	return apto;
}


function clearThumbs(){
	thumb = document.getElementsByClassName('thumb');
	for(var i = 0; i < thumb.length; i++){
		thumb[i].innerHTML = '';
	}
}

clearThumbs();

function testaMantInde(mantStr, qntBitsMant){
	var zeros = '';
	for(var i = 0; i < qntBitsMant-1; i++){
		zeros += '0'; 
	}
	if(mantStr.substr(1, mantStr.length) == zeros){
		return 1;
	}
	return 0;
}

function completa0s(bin, tam){
	var dif = tam - bin.length;
	if(dif > 0){
		for(var i = 0; i < dif; i++){
			bin = "0" + bin ;
		}
	}
	return bin;
}

function completa0sD(bin, tam){

	var dif = tam - bin.length;

	if(dif > 0){
		for(var i = 0; i < dif; i++){
			bin = bin + "0";
		}
	}

	return bin;
}

function attRange(){
	var qntBits = document.getElementById('qntBits');
	var qntBitsExp = document.getElementById('qntBitsExp');
	var qntBitsMant = document.getElementById('qntBitsMant');
	//document.getElementById('outQntBits').innerHTML = qntBits.value;
	//document.getElementById('outQntBitsExp').innerHTML = qntBitsExp.value;
	//document.getElementById('outQntBitsMant').innerHTML = qntBitsMant.value;
	showBinSquare();
	pf_dec_to_bin()
}

function ajustaCampos(){
	var qntBits = document.getElementById('qntBits');
	var qntBitsExp = document.getElementById('qntBitsExp');
	var qntBitsMant = document.getElementById('qntBitsMant');

	qntBitsExp.max = qntBits.value - 2;
	qntBitsMant.max = qntBits.value - 3;
	ajustaExp();

	attRange();
}

function ajustaExp(){
	var qntBits = document.getElementById('qntBits');
	var qntBitsExp = document.getElementById('qntBitsExp');
	var qntBitsMant = document.getElementById('qntBitsMant');

	qntBitsMant.value = qntBits.value - qntBitsExp.value - 1;
	
	qntBitsExp.max = qntBits.value - 2;
	qntBitsMant.max = qntBits.value - 4;

	attRange();
}

function ajustaMant(){
	var qntBits = document.getElementById('qntBits');
	var qntBitsExp = document.getElementById('qntBitsExp');
	var qntBitsMant = document.getElementById('qntBitsMant');

	
	qntBitsExp.value = qntBits.value - qntBitsMant.value - 1;

	qntBitsExp.max = qntBits.value - 2;
	qntBitsMant.max = qntBits.value - 4;

	attRange();
}


function showResult(result){
	var table = document.getElementById("table_result");
	table.innerHTML = '';
	var cont = 0;
	result.forEach((element) => {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		if(cont == 3){
			td.innerHTML = "<div class='dot-sinal'></div>" + element;
		}else if(cont == 4){
			td.innerHTML = "<div class='dot-exp'></div>" + element;
		}else if(cont == 5){
			td.innerHTML = "<div class='dot-mant'></div>" + element;
		}else{
			td.innerHTML = element;
			
		}
		td.setAttribute("style", "display: flex; align-items: center");
		tr.appendChild(td);
		table.appendChild(tr);
		cont = cont + 1;
	});	
}

function repeatChar(c, n){

	var char = "";
	for(var i = 0; i < n; i++){
		char = char+c;
	}
	
	return char;
}

window.onload = showBinSquare();
function showBinSquare() {
	var qntBits = document.getElementById("qntBits").value;
	var qntBitsExp = document.getElementById("qntBitsExp").value;
	
	var div = document.querySelector(".bin-container");
	div.innerHTML = "";
	for(var i = 0; i < qntBits; i++){
		var d = document.createElement("div");
		if(i == 0){
			d.setAttribute("class", "sinal");
		}else if(i <= qntBitsExp){
			d.setAttribute("class", "exp");
		}else{
			d.setAttribute("class", "mant");

		}
		div.appendChild(d);
	}


	printBin(repeatChar("0", qntBits));
	
};

function printBin(bin){
	var divs = document.querySelectorAll(".bin-container > div");

	for(var i = 0; i < divs.length; i++){
		divs[i].innerHTML = bin[i];
	}

}

function numIntermediario(be, exp, mant){
	var result = be;
	if(exp < 0){
		result =   repeatChar("0", -exp) + result + mant; 
		result = result[0] + '.' +result.substring(1);
	}else{
		for(var i = 0; i < mant.length; i++){
			if(exp == i){
				result = result + ".";
			}
			result = result + mant[i];
		}
	}
	return result
}

function realDecToBin(num){
	var sinal = '+';
	if(num < 0){
		num = -1 * num;
		sinal = '-';
	}
	var pi = Math.floor(num);
	var pf = num%1;
	var pib = pi.toString(2);
	var resto = '';
	
	for(var i = 0 ; i < 64 && pf != 0; i++){
		pf = pf * 2;
		
		if(Math.floor(pf) == 1)
			resto = resto + '1';
		else
			resto = resto + '0';
		pf = pf%1;
	}
	if(resto != '')
		return [sinal,pib +'.'+resto];
	return [sinal,pib];
}

function completa0sAnt(bin, tam){
	var dif = tam - bin.length;
	if(dif > 0){
		for(var i = 0; i < dif; i++){
			bin = '0' + bin;
		}
	}
	return bin;
}

function completa0sDep(num) {
	for(var i = num.length; i < 64; i++){
		num = num + '0';
	}
	return num;
}

function normaliza(num, qbm, qbe){
	var numSplit = num.split('.');
	var bitEscondido = numSplit[0][0];
	//console.log("uehueh", num, numSplit, bitEscondido)

	
	if(numSplit.length > 1)
		num = numSplit[0] + numSplit[1];
	num = completa0sDep(num);


	var exp = -1 * num.indexOf('1');
	if(exp == 0)
		exp = 0

	if(numSplit[0].length > 1){
		exp = numSplit[0].length - 1;
	}
	var numNor = '1.';
	var menorExp = -1*(2**(qbe-1)-1);
	var expFinal = exp;

	if(exp <= menorExp){
		numNor = '0.'
		exp = menorExp+1;
	}
	if(exp > 0){
		for(var i = 0; i < qbm; i++){
			numNor = numNor + num[i+1];
		}
	}else{
		for(var i = 0; i < qbm; i++){
			numNor = numNor + num[i-exp+1];
		}
	}
	return [numNor, exp];
}

function exc(num, qbe){

	var excesso = 2**(qbe-1) - 1;
	num = num+excesso;
	num = num.toString(2);

	num = completa0sAnt(num, qbe);
	return num;
}

function toBin(s, num, e){
	var sinal = '0';
	if(s == '-'){
		sinal = '1';
	}
	var mant = num.split('.');
	mant = mant[1];

	return sinal+e+mant;

}

function pf_dec_to_bin(){
	num = document.getElementById('num').value;
	result = [num]; 

	var qntBitsMant = parseInt(document.getElementById('qntBitsMant').value);
	var qntBitsExp = parseInt(document.getElementById('qntBitsExp').value);

	console.log(qntBitsExp, qntBitsMant)

	var excessoExp = 2**(qntBitsExp-1)-1;
	var num = realDecToBin(num);
	result.push("= " + num[0] + num[1]);

	var sinal = num[0];
	num = num[1];

	var numNor = normaliza(num, qntBitsMant, qntBitsExp);
	console.log(numNor);

	var exp = numNor[1];
	
	var numInter = sinal+numNor[0]+"x2<sup>"+exp.toString()+"</sup>";
	result.push("= "+numInter);
	
	var bitEscondido = numNor[0].split(".")[0];

	if(bitEscondido == 0)
		exp -= 1;
	
	var expExcesso = exc(exp, qntBitsExp);
	var exas = exp + excessoExp;
	var sinalNum = '0';
	if(sinal == '-')
		sinalNum = '1';

	result.push('Sinal: '+ sinal + " ("+sinalNum+")");
	result.push('Expoente: ' + exp + '<sub>10 </sub> => ' + exp +" + "+ excessoExp + " = " + exas + ' => ' + expExcesso + "<sub>2</sub>")
	result.push('Mantiça: ' + numNor[0].split('.')[1]);	

	console.log(sinal, numNor[0], exp, numInter);

	printBin(toBin(sinal, numNor[0], expExcesso));
	showResult(result);
}