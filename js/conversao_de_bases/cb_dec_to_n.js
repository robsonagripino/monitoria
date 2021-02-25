//main();
/*function validador(){
	var msg, num = document.getElementById('num').value;
	var s1 = '10';
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
}*/
var verde = '#4caf50';
var preto = '#000000'

function validador(){
	var msg, num = document.getElementById('num').value;
	var s1 = '10';
	s1 = parseInt(s1);
	console.log(num);
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


download_img = function(el) {

	var image = canvas.toDataURL("image/jpg");
	el.href = image;
  };

function preCalculoCanvas(tam){

	var num, base, resto, cont = 0, resultado, numcon = "", numconFra = '';


	num = document.getElementById('num').value;
	base = "";

	
	tamCanvasX = 0;
	tamCanvasY = 0;
	if(num != "" && num != 0){
		var indexPonto = num.indexOf('.'); 
		var parteFracionaria = '';
		var parteInteira = '' ;
	
		if(indexPonto != -1){
			parteInteira = num.substring(0, indexPonto);
			parteFracionaria = num.substring(indexPonto + 1);
			num = parteInteira;
		}
	
		base = document.getElementById('base').value;
		var tam, fontTamLargura, fontTamAltura, xnum, ynum, xbase, ybase, retax1, retax2, retay1, retay2;;

	
		fontTamLargura = (parseInt(tam)*0.6);
		fontTamAltura = (parseInt(tam)*0.7);

		xnum = fontTamLargura;
		ynum = fontTamAltura ;

		retax1 = xnum + fontTamLargura*(num.length - 1);
		retay1 = ynum + (3*tam);

		resultado = '';

		while(num!= 0){
			cont = cont + 1;
			xbase = xnum + (++num.length)* fontTamLargura;
			ybase = ynum;

			numlen1 = num.length;

			resto = num%base;
			
			num = Math.floor(num/base).toString();

			var numlen = num.length;
			if(numlen < 2)
				numlen = 2;
			//divisao	
			tamCanvasX = xbase + (numlen+1)* fontTamLargura;
			ynum += parseInt(tam);
			subnum = '-' + num*base;

			ynum += parseInt(tam);
			//resto
			var resto1 = ''; 
			if(resto > 9){
				resto1 = "(" + String.fromCharCode(resto+55) + ")" + resto;
				resto = String.fromCharCode(resto+55);
			}else{
				resto = resto.toString();
				resto1 = resto;
			}
			
			numcon = resto + numcon;

			retax2 = xnum - fontTamLargura*(resto1.length - numlen1)
			retay2 = ynum+parseInt(tam);
			
			xnum = xbase + fontTamLargura;
			ynum = ynum - tam;		
		}
		if(numcon == "")
			numcon = '0';

		tamCanvasY =  retay2+fontTamAltura;

		if(parteFracionaria != 0){
			numconFra = '.';
			var tamPartFra = parteFracionaria.length;
			parteFracionaria = parseFloat("0." + parteFracionaria);
			var limite = 0;
			var linhaFra = 3;

			var fraeixoX = retax1;
			var fraeixoY =  retay2;
			var biasY = -2;

			if(parteInteira == 0){
				fraeixoX = xnum;
				fraeixoY = ynum;
				linhaFra = 0;
				biasY = 1;
			}

			var particalX = 0;
			while(parteFracionaria != 0 && limite != 16){
				limite += 1;
				msg1 = parteFracionaria.toFixed(tamPartFra) + " x "+ base +" = ";

				parteFracionaria = parteFracionaria*base;
			
				pi = Math.trunc(parteFracionaria);
				numconFra = numconFra + pi.toString();
			
				parteFracionaria = parteFracionaria%1;
				numStr = parteFracionaria.toString();
				numStrSplited = numStr.split('.');
				index = 1;

				if(numStrSplited.length < 2)
					index = 0;
					
				aux = parseFloat(pi.toString() +"."+ numStrSplited[index]);

				msg2 = aux.toFixed(tamPartFra);
				msg2 = msg2.split('.')

				particalX = fraeixoX + (msg1.length + msg2[0].length + msg2[1].length + 3)*fontTamLargura

				if(particalX > tamCanvasX)
					tamCanvasX = particalX;

				linhaFra += 1.5;
			}
			tamCanvasY = fraeixoY + (linhaFra-1)*fontTamAltura;
		}
	}
	return [tamCanvasX, tamCanvasY];
}

function dec_to_n(){
	var tam, fontTamLargura, fontTamAltura, xnum, ynum, xbase, ybase, retax1, retax2, retay1, retay2;;

	tam = "20";

	validador();
	
	var xy = preCalculoCanvas(tam);
	
	var	ALTURA = xy[1]//window.innerHeight;//document.getElementById("canvas").offsetWidth;	
	var	LARGURA = xy[0]//window.innerWidth;//document.getElementById("canvas").offsetWidth;

	var num, base, resto, cont = 0, resultado, numcon = "", numconFra = '';


	num = document.getElementById('num').value;
	base = "";

	canvas = document.getElementById("canvas");			


	canvas.width = LARGURA;	
	canvas.height = ALTURA;

	//canvas.style.border = "1px solid rgba(var(--b6a,219,219,219),1)";
	ctx = canvas.getContext("2d");
	
	ctx.fillStyle = preto;

	if(num != "" && num != 0){
		var indexPonto = num.indexOf('.'); 
		var parteFracionaria = '';
		var parteInteira = '' ;
	
		if(indexPonto != -1){
			parteInteira = num.substring(0, indexPonto);
			parteFracionaria = num.substring(indexPonto + 1);
			num = parteInteira;
		}
	
		base = document.getElementById('base').value;

		fontTamLargura = (parseInt(tam)*0.6);
		fontTamAltura = (parseInt(tam)*0.7);

		xnum = fontTamLargura;
		ynum = fontTamAltura ;

		retax1 = xnum + fontTamLargura*(num.length - 1);
		retay1 = ynum + (3*tam);

		ctx.font = "bold " + tam + "px Courier";

		resultado = '';

		while(num!= 0){
			cont = cont + 1;
			xbase = xnum + (++num.length)* fontTamLargura;
			ybase = ynum;

			ctx.fillText(num, xnum, ynum );

			numlen1 = num.length;

			resto = num%base;
			
			num = Math.floor(num/base).toString();

			var numlen = num.length;
			if(numlen < 2)
				numlen = 2;
			//divisao	
		
			ctx.fillRect(xbase, ybase+3, (numlen+1)* fontTamLargura, 1);
			ctx.fillRect(xbase, ybase+3, 1,  -parseInt(parseInt(tam)*1));
			
			ctx.fillText(base, xbase + fontTamLargura, ybase);

			ynum += parseInt(tam);
			subnum = '-' + num*base;

			ctx.fillText(subnum, xnum - fontTamLargura*(subnum.length - numlen1), ynum );

			ctx.fillText(num, xbase + fontTamLargura , ynum);
			//Igualdade
			ctx.fillRect(xnum-fontTamLargura, ynum+3, (numlen1 + 2)* fontTamLargura, 1);
			ynum += parseInt(tam);
			//resto
			var resto1 = ''; 
			if(resto > 9){
				resto1 = "(" + String.fromCharCode(resto+55) + ")" + resto;
				resto = String.fromCharCode(resto+55);
			}else{
				resto = resto.toString();
				resto1 = resto;
			}
			
			numcon = resto + numcon;
			if(resto1.indexOf('(') != -1){
				ctx.fillStyle = verde;
				ctx.fillText(resto1.substr(0,3), xnum - fontTamLargura*(resto1.length - numlen1), ynum);
				ctx.fillStyle = preto;
				ctx.fillText(resto1.substr(3), xnum - fontTamLargura*(resto1.substr(3).length - numlen1), ynum);
			}else{
				ctx.fillStyle = verde;
				ctx.fillText(resto1, xnum - fontTamLargura*(resto1.length - numlen1), ynum);
			}
			ctx.fillStyle = preto;

			retax2 = xnum - fontTamLargura*(resto1.length - numlen1)
			retay2 = ynum+parseInt(tam);
			
			xnum = xbase + fontTamLargura;
			ynum = ynum - tam;		
		}
		
		if(cont > 1){
			//desenha a seta

			//ctx.lineWidth = 0.5;			
			ctx.strokeStyle = "RED";
			ctx.moveTo(retax1, retay1);
			ctx.lineTo(retax2, retay2);
			ctx.stroke();

			ctx.moveTo(retax1, retay1);
			ctx.lineTo(retax1+20, retay1);
			ctx.stroke();

			ctx.moveTo(retax1, retay1);
			ctx.lineTo(retax1+12, retay1+16);
			ctx.stroke();
		
		}
		if(numcon == "")
			numcon = '0';
			
		ctx.fillText(numcon, retax1, retay2+fontTamAltura);

		if(parteFracionaria != 0){
			numconFra = '.';

			var tamPartFra = parteFracionaria.length;

			parteFracionaria = parseFloat("0." + parteFracionaria);


			var limite = 0;
			var linhaFra = 3;

			var fraeixoX = retax1;
			var fraeixoY =  retay2;
			var biasY = -2;

			if(parteInteira == 0){
				fraeixoX = xnum;
				fraeixoY = ynum;
				linhaFra = 0;
				biasY = 1;
			}


			while(parteFracionaria != 0 && limite != 16){
				limite += 1;
				msg1 = parteFracionaria.toFixed(tamPartFra) + " x "+ base +" = ";

				ctx.fillText(msg1, fraeixoX, fraeixoY + (linhaFra * fontTamAltura));

				parteFracionaria = parteFracionaria*base;
			
				pi = Math.trunc(parteFracionaria);
				numconFra = numconFra + pi.toString();
			
				parteFracionaria = parteFracionaria%1;
				numStr = parteFracionaria.toString();
				numStrSplited = numStr.split('.');
				index = 1;

				if(numStrSplited.length < 2)
					index = 0;
					
				aux = parseFloat(pi.toString() +"."+ numStrSplited[index]);

				msg2 = aux.toFixed(tamPartFra);
				msg2 = msg2.split('.')

				ctx.fillStyle = verde;
				//esse +2 é para dar espaço para colocar a seta para baixo
				ctx.fillText(msg2[0], fraeixoX + (msg1.length + 2)*fontTamLargura, fraeixoY + (linhaFra * fontTamAltura));
				ctx.fillStyle = preto;

				ctx.fillText('.' + msg2[1], fraeixoX + (msg1.length+msg2[0].length + 2)*fontTamLargura, fraeixoY + (linhaFra * fontTamAltura));
			
				linhaFra += 1.5;
			}
			ctx.strokeStyle = "RED";
			
			ctx.moveTo( fraeixoX + (msg1.length + 1)*fontTamLargura  , fraeixoY - biasY*fontTamAltura );
			ctx.lineTo( fraeixoX + (msg1.length + 1)*fontTamLargura  , fraeixoY + (linhaFra-1)*fontTamAltura);
			ctx.stroke();

			ctx.moveTo( fraeixoX + (msg1.length + 1)*fontTamLargura  , fraeixoY + (linhaFra-1)*fontTamAltura);
			ctx.lineTo( fraeixoX + (msg1.length + 1)*fontTamLargura - 5 , fraeixoY + (linhaFra-1)*fontTamAltura - 8.6);
			ctx.stroke();

			ctx.moveTo( fraeixoX + (msg1.length + 1)*fontTamLargura  , fraeixoY + (linhaFra-1)*fontTamAltura);
			ctx.lineTo( fraeixoX + (msg1.length + 1)*fontTamLargura + 5 , fraeixoY + (linhaFra-1)*fontTamAltura - 8.8);
			ctx.stroke();

		}
	}
	console.log(numconFra);
	document.getElementById('resu').innerHTML = numcon + numconFra + "<sub>"+ base +"</sub>";
}
