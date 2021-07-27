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
	bin_to_dec();
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

function realDecToBin(num, numBits){
	var pi = Math.floor(num);
	var pf = num%1;
	var pib = pi.toString(2);
	var resto = '';
	for(var i = 0 ; i < numBits; i++){
		pf = pf * 2;
		
		if(Math.floor(pf) == 1)
			resto = resto + '1';
		else
			resto = resto + '0';
		pf = pf%1;
	}
	return pib +'.'+resto;
}

function testa_qnt_bit(num){
	var qntBits = document.getElementById('qntBits').value;
	var iQntBits = parseInt(qntBits);
	if(num >= 2**iQntBits){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>O número possui mais de "+qntBits+" bits";
		M.toast({html: msg, displayLength: 3000});
		return false;
	} 
	return true;
}

function showResult(result){
	var table = document.getElementById("table_result");
	table.innerHTML = '';
	var cont = 0;
	result.forEach((element) => {
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		if(cont == 0){
			td.innerHTML = "<div class='dot-sinal'></div>" + element;
		}else if(cont == 1){
			td.innerHTML = "<div class='dot-exp'></div>" + element;
		}else if(cont == 2){
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

function bin_to_dec(){
	var num = document.getElementById('num').value;
	var base = document.getElementById('base').value;
	var outputResult = document.getElementById("result");

	var qntBitsExp = parseInt(document.getElementById("qntBitsExp").value);
	var qntBitsMant = parseInt(document.getElementById("qntBitsMant").value);

	if(!validador())
		return 0;
	
	aux = '';
	if(base == 16){
		for(i = 0; i < num.length; i++){
			aux = aux + completa0s(parseInt(num[i], 16).toString(2), 4) ;
			//console.log(aux);
		}
		num = aux;
	}

	

	num = completa0sD(num, qntBitsExp+qntBitsMant+1);

	num = parseInt(num ,parseInt(2));

	//console.log(num);

	var sinal = num >> (qntBitsMant + qntBitsExp);

	var exp = (num >> qntBitsMant) & (2**qntBitsExp - 1);

	var mant = num & ((2**qntBitsMant) - 1);

	var excesso = (2**(qntBitsExp-1)-1)
	var expDec = exp - excesso;

	var sinalStr = '+';
	if(sinal == 1)
		sinalStr = '-';

	var mantStr = completa0s( mant.toString(2), qntBitsMant);
	var expStr = completa0s(exp.toString(2), qntBitsExp);
	
	printBin(sinal+ expStr+mantStr);

	var result = [];
	
	var sinalMsg = "Sinal: " + sinal;
	var expMsg = "Expoente: " + expStr + " => " + exp + " - " + excesso+ " = "+expDec;
	var mantMsg = "Mantiça: " + mantStr;
	//casos normalizados e nao normalizados (expoente = 0)
	if(expDec >= (-excesso) && expDec <= (excesso)){
		//testa se o número é normalizado
		var bitEscondido = 1;
		if(exp == 0){
			expDec += 1;
			bitEscondido = 0;
			expMsg = "Expoente: " + expStr + "<sub>exc</sub> =>  - " + (excesso-1) + " (<a href='#nao-normalizado' class='waves-effect waves-light  modal-trigger tooltipped '>não normalizado</a>)";
		}
		result = [sinalMsg, expMsg, mantMsg];

		//calculo da mantiça
		var intFrac = 0;
		for(var i = 0; i < qntBitsMant; i++){
			intFrac += parseInt(mantStr[i])*2**(-(i+1));
		}
		
		var numStr = sinalStr + bitEscondido.toString() + "." + mantStr + 'x2<sup>' + expDec.toString() + "</sup>";
		var numFinal = (bitEscondido + intFrac)*(2**expDec);
		var finalResult = ["Número: " + numStr, "= " + sinalStr + numIntermediario(bitEscondido, expDec, mantStr) ,"= " + sinalStr + numFinal]; // "= " + sinalStr + realDecToBin(numFinal, qntBitsMant-expDec)
	
		finalResult.forEach((element)=>{
			result.push(element)
		});

		outputResult.innerHTML = sinalStr + numFinal;
		
		showResult(result);
	}//caso + e - infinito
	else if(exp == ((2**qntBitsExp) -1) && mant == 0){
		expMsg = "Expoente: " + expStr + " => caso especial" ;
		result = [sinalMsg, expMsg, mantMsg];
		result.push("Número = "+ sinalStr + "infinito");
		outputResult.innerHTML = sinalStr + "infinito";
		showResult(result);

	}//indeterminação
	else if((sinal == 1) && (exp == ((2**qntBitsExp) -1)) && ((mant >> (qntBitsMant-1)) == 1) && (mant & (2**(qntBitsMant-1)-1)) == 0){
		expMsg = "Expoente: " + expStr + " => caso especial" ;
		result = [sinalMsg, expMsg, mantMsg];
		result.push("Número = indeterminação");
		outputResult.innerHTML = "indeterminação";
		showResult(result);
	}//outros casos = Not a Number
	else{
		expMsg = "Expoente: " + expStr + " => caso especial" ;
		result = [sinalMsg, expMsg, mantMsg];
		result.push("Número = Not A Number");
		outputResult.innerHTML = "NAN";

		showResult(result);
	}
}