var prevNum = '';

function validador(){
	var num = document.getElementById('num').value;
	var qntDeBits = document.getElementById('qntBits').value;
	var s1 = 10;
	var apto = true;

	num = num.toUpperCase();

	var boolMsg = false;

	var valorDigito;
	var numero = '';
	var menos = false;

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
			if(num[0] == '-' && !menos){
				numero += num[i];	
				menos = true;
			}
			else{
				boolMsg = true;
			}
		}
	}

	/*if(num.length < 2 && boolMsg == false){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>O número possui poucos bits";
		M.toast({html: msg, displayLength: 3000});
		apto = false;
		return false;
	}*/
	num = parseInt(num, s1);
	var prev = parseInt(prevNum, s1);

	var qntBitsInt = parseInt(qntDeBits);
	console.log(qntBitsInt, num > 2**(qntBitsInt-1), num < -(2**(qntBitsInt-1)));

	if((num > 2**(qntBitsInt-1)) ||  (num < -(2**(qntBitsInt-1)) )){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>O número precisa de mais de "+ qntDeBits+ " bits";
		M.toast({html: msg, displayLength: 3000});
		apto = false;
		numero = prevNum;

	}

	if(boolMsg){
		var msg = "<i class='material-icons' style='padding:0;'>warning</i>Caractere(s) inválido(s)";
		M.toast({html: msg, displayLength: 3000});
		apto = false;
		numero = prevNum;
	}
	
	document.getElementById('num').value = numero;
	prevNum = numero;

	return apto;
}

function converter(){
	var result = document.getElementById('table_result');
	result.innerHTML = '';

	if(validador()){
		sm();
		c1();
		c2();
		exc();
	}

	$(document).ready(function(){
	$('.tooltipped').tooltip({outDuration:100});
	});

}

function calcularExc(tam){
	var result = document.getElementById('modal_exc');
	result.innerHTML = '';
	var p = document.createElement('p');

	var exp, num, ex = '2<sup>' + tam.toString() + '-1</sup> - 1 = ';

	tam = tam - 1;
	ex += '2<sup>' + tam.toString() + '</sup> - 1 = ';
	
	exp = 2**tam;
	ex += exp.toString() + ' - 1 = ';

	num = exp - 1;
	ex += num.toString();

	p.innerHTML = ex;
	result.appendChild(p);

}

function completa0s(bin, tam){
	var dif = tam - bin.length;
	if(dif > 0){
		for(var i = 0; i < dif; i++){
			bin = '0' + bin;
		}
	}
	return bin;
}

function sm(){
	var result = document.getElementById('table_result');

	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var dec = document.getElementById('num').value;
	var qntBits = document.getElementById('qntBits').value;
	var bin;

	var sinalNum = 1;
	if(dec[0] == '-'){
		sinalNum = -1;
	}

	dec = parseInt(dec);

	var sinal = ['+', '0'];

	if(dec < 0 || sinalNum == -1){
		dec = -1*dec;
		sinal = ['-', '1'];
	}
	
	var sm = sinal[0] + dec + '<sub>10</sub> = ';
	if(parseInt(dec) >= 2**(qntBits-1) || parseInt(dec) <= -(2**(qntBits-1))){
		sm += "não representável<sub>sm</sub>";
	}else{
		bin = dec.toString(2);
		bin = completa0s(bin, qntBits-1);
		
		sm += sinal[0] + bin + '<sub>2</sub> = '; 

		bin = sinal[1] + bin;
		sm += bin + '<sub>sm</sub>';
	}

	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'right');
	a.setAttribute("href", '#modalsm');
	a.setAttribute('style', "margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = sm;
	td.appendChild(a);

	tr.appendChild(td);


	result.appendChild(tr);

}

function c1(){
	var result = document.getElementById('table_result');

	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var dec = document.getElementById('num').value;
	var qntBits = document.getElementById('qntBits').value;

	var c1, bin;
	var mask = (2**qntBits) - 1;

	var sinalNum = 1;

	var sinalStr = '+';
	if(dec[0] == '-'){
		sinalNum = -1;
		sinalStr = '-';
	}

	dec = parseInt(dec);

	c1 = sinalStr + Math.abs(dec) + '<sub>10</sub> = ';
	if(parseInt(dec) >= 2**(qntBits-1) || parseInt(dec) <= -(2**(qntBits-1))){
		c1 += "não representável<sub>c1</sub>";
	}else{
		if(dec < 0 || sinalNum == -1){
			dec *= -1;
			c1 += '-' + completa0s(dec.toString(2), qntBits) + '<sub>2</sub> = ';
			dec = dec ^ mask;
			sinal = '-';
		}

		bin = dec.toString(2);
		bin = completa0s(bin, qntBits);

		c1 += bin + '<sub>c1</sub>';
	}

	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'right');
	a.setAttribute("href", '#modalc1');
	a.setAttribute('style', " margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = c1;
	td.appendChild(a);

	tr.appendChild(td);


	result.appendChild(tr);
}

function c2(){
	var result = document.getElementById('table_result');

	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var dec = document.getElementById('num').value;
	var qntBits = document.getElementById('qntBits').value;

	var c2, bin;
	var mask = (2**qntBits) - 1;

	if(dec[0] == '-' && parseInt(dec) == 0){
		c2 = dec.substr(0, 2) + " = Não representável<sub>c2</sub>";
	}else if(parseInt(dec) >= (2**(qntBits-1))){
		c2 = "+"+dec + " = não representável<sub>c2</sub>";
	}else{
		dec = parseInt(dec);

		c2 = dec + '<sub>10</sub> = ';
		if(dec < 0){
			dec *= -1;
			c2 += '-' + completa0s(dec.toString(2), qntBits) + '<sub>2</sub> = ';
			dec = (dec ^ mask) + 1;
			sinal = '-';
		}

		bin = dec.toString(2);
		bin = completa0s(bin, qntBits);

		c2 += bin + '<sub>c2</sub>';
	}

	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'right');
	a.setAttribute("href", '#modalc1');
	a.setAttribute('style', " margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = c2;
	td.appendChild(a);

	tr.appendChild(td);


	result.appendChild(tr);
}


function exc(){
	var qntB = document.getElementById("qntBits").value;
	var result = document.getElementById('table_result');
	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var dec = document.getElementById('num').value;

	var tam, dec, exce, excesso = '';

	if(dec[0] == '-' && parseInt(dec) == 0){
		excesso = dec.substr(0, 2) + " = Não representável<sub>exc</sub>";
	}else if(parseInt(dec) == -(2**(qntB-1))){
		excesso = dec + " = não representável<sub>exc</sub>";
	}
	else{
		tam = document.getElementById('qntBits').value;

		calcularExc(tam);
		exce = 2**(tam-1) - 1;
		dec = parseInt(dec);

		excesso += dec.toString() + '<sub>10</sub> + '; 

		dec = dec + exce;

		exce = "<a class='modal-trigger' href='#modalCalcExc'>"+exce.toString()+"</a>";
		
		excesso += exce + '<sub>10</sub> = ';
		excesso += dec.toString() + '<sub>10</sub> = ';
		excesso += completa0s(dec.toString(2), qntB )+ '<sub>2</sub>';
	}

	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'right');
	a.setAttribute("href", '#modalexc');
	a.setAttribute('style', "margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = excesso;
	td.appendChild(a);

	tr.appendChild(td);

	result.appendChild(tr);
}
