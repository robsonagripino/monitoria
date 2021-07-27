function converter(){
	var apto = validador();
	var r = document.getElementById('result');
	r.innerHTML = '';
	var smag, comp1, comp2, exce, resposta, result = document.getElementById('table_result');
	result.innerHTML = '';

	if(!apto)
		return -1;

	smag = sm();
	comp1 = c1();
	comp2 = c2();
	exce = exc();
	
	var num = document.getElementById("num").value;

	var smt = document.createElement('text');
	var c1t = document.createElement('text'); 
	var c2t  = document.createElement('text'); 
	var exct = document.createElement('text');
	
	smt.innerHTML = num + "<sub>sm</sub> = "+ smag + "<sub>10</sub><br/>";
	c1t.innerHTML = num + "<sub>c1</sub> = "+ comp1 + "<sub>10</sub><br/>";
	c2t.innerHTML = num + "<sub>c2</sub> = "+ comp2 + "<sub>10</sub><br/>";
	exct.innerHTML = num + "<sub>exc</sub> = "+ exce + "<sub>10</sub><br/>";

	
	r.appendChild(smt);
	r.appendChild(c1t);
	r.appendChild(c2t);
	r.appendChild(exct);
 
	$(document).ready(function(){
		$('.tooltipped').tooltip({outDuration:100});
	});
}

var prevNum = '';
function validador(){
	var num = document.getElementById('num').value;
	var s1 = 2;
	var apto = true;

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

	if(num == ''){
		numero = '';
		msg = "<i class='material-icons'>warning</i> <text style='margin-left: 10px'>Digite um número não nulo</text>"
		M.toast({html: msg, displayLength: 3000});
		apto = false;
	}else{
		if(num.length < 2 && boolMsg == false){
			var msg = "<i class='material-icons' style='padding:0;'>warning</i>O número possui poucos bits";
			M.toast({html: msg, displayLength: 3000});
			apto = false;
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
		apto = false;
	}
	document.getElementById('num').value = numero;
	prevNum = numero;
	return apto;
}

//completa  com 0's o numero binário de acordo com o tamanho (qnt de bits)
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
	var bin = document.getElementById('num').value;

	var dec, sinal, nbin, tam, sm = bin + '<sub>sm</sub> = ';

	sinal = bin[0];
	bin = bin.substr(1, bin.length);
	tam = bin.length;

	dec = parseInt(bin, 2);

	bin = completa0s(bin, tam);
	nbin = '+' + bin;

	if(sinal == '1'){
		nbin = '-' + bin;
		dec = '-' + dec.toString();
	}
	sm += nbin + '<sub>2</sub> = ';
	sm +=  dec + '<sub>10</sub>';


	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped ");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'right');
	a.setAttribute("href", '#modalsm');
	a.setAttribute('style', "margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = sm;
	td.appendChild(a);

	tr.appendChild(td);


	result.appendChild(tr);
	return dec;
}

function c1(){
	var result = document.getElementById('table_result');
	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var bin = document.getElementById('num').value;

	var tam, sinal, dec, mask, nbin, text, c1 = bin + '<sub>c1</sub> = ';
	tam = bin.length;

	sinal = bin[0];
	mask = 2**tam - 1;
	dec = parseInt(bin, 2);

	if(sinal == '1'){
		nbin = dec^mask;
		nbin = '-' + completa0s(nbin.toString(2), tam); 
		c1 += nbin + '<sub>2</sub> = ';
		
		dec = (dec^mask);
		dec = '-'+dec.toString() ;
	}
	c1 += dec + '<sub>10</sub>';

	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'left');
	a.setAttribute("href", '#modalc1');
	a.setAttribute('style', " margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = c1;
	td.appendChild(a);

	tr.appendChild(td);

	result.appendChild(tr);
	return dec;
}

function c2(){
	var result = document.getElementById('table_result');
	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var bin = document.getElementById('num').value;

	var tam, sinal, dec, mask, nbin, text, c2 = bin + '<sub>c2</sub> = ';
	tam = bin.length;

	sinal = bin[0];
	mask = 2**tam - 1;
	dec = parseInt(bin, 2);

	if(sinal == '1'){
		nbin = (dec^mask) + 1;
		nbin = '-' + completa0s(nbin.toString(2), tam); 
		c2 += nbin + '<sub>2</sub> = ';
		
		dec = (dec^mask) + 1;
		dec = '-'+dec.toString() ;
	}
	c2 += dec + '<sub>10</sub>';

	td.setAttribute('style', 'font-size: 20px; text-align: center;');

	a.setAttribute('class', "waves-effect waves-light  modal-trigger tooltipped");
	a.setAttribute('data-tooltip','Ajuda');
	a.setAttribute('data-position', 'right');
	a.setAttribute("href", '#modalc2');
	a.setAttribute('style', "margin-left: 30px");
	a.innerHTML = "<i class='material-icons '>help</i>";

	td.innerHTML = c2;
	td.appendChild(a);

	tr.appendChild(td);
	result.appendChild(tr);
	return dec;
}

function exc(){
	var result = document.getElementById('table_result');
	var td = document.createElement('td');
	var tr = document.createElement('tr');
	var a = document.createElement('a');
	var bin = document.getElementById('num').value;

	var tam, dec, exce, excesso = bin + '<sub>ex</sub> = ';


	tam = bin.length;

	calcularExc(tam);

	exce = 2**(tam-1) - 1;

	dec = parseInt(bin, 2);

	excesso += dec.toString() + '<sub>10</sub> - '; 

	dec = dec - exce;

	exce = "<a class='modal-trigger tooltipped' data-tooltip='Cálculo do excesso' data-position='top' href='#modalCalcExc'>"+exce.toString()+"</a>";
	excesso += exce + '<sub>10</sub> = ';
	excesso += dec.toString() + "<sub>10</sub> ";

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
	return dec;
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