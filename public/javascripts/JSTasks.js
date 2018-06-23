
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


function getRandomInt(min, max) {
    return min + Math.round(Math.random()*(max-min));
}
function getArray(n, min, max) {
    let result = [];
    for (let i = 0; i < n; ++i) {
        result.push(getRandomInt(min, max));
    }
    return result;
}
function getResultArray(a) {
    return a.sort((a, b) => {
        return parseFloat(a)-parseFloat(b);
    });
}

function showMatrix(matrix, domElem) {
    let cellSize = Math.max.apply(null, matrix.map(row => {
        return Math.max.apply(null, row.map(value => {
            return value.toString().length;
        })) + 1;
    }));
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            let content = matrix[i][j] + " ";
            while (content.length < cellSize) {
                content = " " + content;
            }
            domElem.textContent += content;
        }
        domElem.textContent += "\r\n";
    }
}

function getSnakeMatrix() {
    let output = document.getElementById("task4-result");
    output.textContent = "";
    let size = document.getElementById("task4-size").value;
    if (size < 2 ) {
        output.textContent = "Некорректный размер матрицы!";
        return false;
    }
    let arrMin = document.getElementById("task4-min").value;
    let arrMax = document.getElementById("task4-max").value;

    let numbers = getResultArray(getArray(size*size, Math.min(arrMin, arrMax), Math.max(arrMin, arrMax)));
    let result = new Array(size);
    let step = -1;
    let j = size-1;

    for (let i = size-1; i >= 0; --i) {
        result[i] = new Array(size);
        while (j >= 0 && j <= size-1) {
            result[i][j] = numbers.shift();
            j += step;
        }
        step = -step;
        j = Math.min(j, size-1);
        j = Math.max(j, 0);
    }

    showMatrix(result, output);
    return false;
}