
function ChangeS(){
	var s = document.getElementById('SPicker');
	var A = document.getElementById('A');
	var B = document.getElementById('B');
	var H = document.getElementById('H');
	var R = document.getElementById('Radius');

    if (s.value == 'выберите фигуру'){
        A.style.visibility = 'hidden';
        B.style.visibility = 'hidden';
        H.style.visibility = 'hidden';
        R.style.visibility = 'hidden';
    }

    if (s.value == 'Квадрат'){
		A.style.visibility = 'visible';
		B.style.visibility = 'visible';
		H.style.visibility = 'hidden';
		R.style.visibility = 'hidden';
	} 		
	
	 if (s.value == 'Круг'){
		A.style.visibility = 'hidden';
		B.style.visibility = 'hidden';
		H.style.visibility = 'hidden';
		R.style.visibility = 'visible';
	} 

	 if (s.value == 'Треугольник'){
		A.style.visibility = 'hidden';
		B.style.visibility = 'visible';
		H.style.visibility = 'visible';
		R.style.visibility = 'hidden';
	} 

	 if (s.value == 'Трапеция'){
		A.style.visibility = 'visible';
		B.style.visibility = 'visible';
		H.style.visibility = 'visible';
		R.style.visibility = 'hidden';
	} 

	 if (s.value == 'Параллелограмм'){
		A.style.visibility = 'visible';
		B.style.visibility = 'hidden';
		H.style.visibility = 'visible';
		R.style.visibility = 'hidden';	
	} 

	if (s.value == 'Эллипс'){
		A.style.visibility = 'visible';
		B.style.visibility = 'visible';
		H.style.visibility = 'hidden';
		R.style.visibility = 'hidden';
	} 
}

function Digit(){
	var s = document.getElementById('SPicker');
	var A = document.getElementById('A');
	var B = document.getElementById('B');
	var H = document.getElementById('H');
	var R = document.getElementById('Radius');
	var Av = document.getElementById('Av').value;
	var Bv = document.getElementById('Bv').value;
	var Hv = document.getElementById('Hv').value;
	var Rv = document.getElementById('Rv').value;


	if (s.value == 'Квадрат'){

		alert(Av * Bv);
		
	} 		
	
	 if (s.value == 'Круг'){

	 	alert(3.14 * (Rv*Rv));
		
	} 

	 if (s.value == 'Треугольник'){

	 	alert((Bv * Hv) / 2);
	
	} 

	 if (s.value == 'Трапеция'){

	 	alert(((Av + Bv) / 2) * Hv);
		
	} 

	 if (s.value == 'Параллелограмм'){

	 	alert(Av * Hv);
	
	} 

	if (s.value == 'Эллипс'){

		alert(Av * Bv * 3.14);
		
	} 





}

function findsimple(){
	//var i = 0;
	var j = 0;
	var lim = 0;
	var n = document.getElementById('SimlpleChk').value;
	//var al = document.getElementById('AnsLabel').value;
	var ans = '';

	document.getElementById('AnsLabel').value = '';

	for (var i = 0; i <= n; i++) {
		j = 2;
		lim = Math.round(Math.sqrt(i));
		while  (i % j != 0 && j <= lim) {
			j++
		}
		if (j > lim){
			ans = ans + ' ' + i;
		}		
	}
	
	document.getElementById('AnsLabel').value = ans;
}	


function MatrixMatch(){
	var str = ''
	var matrix = new Array(3);
	document.getElementById('AnsLabelmatix').value = '';
	for (var i=0; i<3; i++) {
		matrix[i]=new Array(4);}

	for (var i=0;i<3;i++){
		for (j=0;j<4;j++){
			str = i + '' + j + 'matrixelm'
   			matrix[i][j]= + document.getElementById(str).value;
			}}

	for (var i = 1; i < 3; i++) {
		for (j = 1; j < 4; j++){
			matrix[i][j] = matrix[i][j] - (matrix[i][0] * matrix[0][j]);
		}   
		matrix[i][0] = 0;
	}
	

	
	for (var i=0;i<3;i++){
		for (j=0;j<4;j++){
			document.getElementById('AnsLabelmatix').value += matrix[i][j] + ' ';
		}
	document.getElementById('AnsLabelmatix').value += '\n';		
	}
}