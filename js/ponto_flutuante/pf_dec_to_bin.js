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

function pfDecToBin(num){
	var qntBitsMant = 4;
	var qntBitsExp = 3;

	var num = realDecToBin(num);
	console.log(num);
	var sinal = num[0];
	num = num[1];

	var numNor = normaliza(num, qntBitsMant, qntBitsExp);
	console.log(numNor);
	var exp = numNor[1];
	numNor = numNor[0]	
	var numInter = sinal+numNor+"x2^"+exp.toString();
	
	var expExcesso = exc(exp, qntBitsExp);

	console.log(sinal, numNor, exp, numInter);

	console.log(toBin(sinal, numNor, expExcesso));
}