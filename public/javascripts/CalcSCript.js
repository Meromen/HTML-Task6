

var Memory = 0;

function NumInput(Num) {
    document.getElementById("InputDis").value += Num;
}

function Equal(Str) {
    document.getElementById("InputDis").value = eval(Str);
    document.getElementById("History").value += Str + ' = ' + eval(Str) + '\n';
}

function LN(Str) {
    document.getElementById("InputDis").value = Math.log(eval(Str));
    document.getElementById("History").value += 'ln(' + eval(Str) + ') = ' + Math.log(eval(Str)) + '\n';
}

function Sin(Str) {
    document.getElementById("InputDis").value = Math.sin(eval(Str));
    document.getElementById("History").value += 'Sin(' + eval(Str) + ') = ' + Math.sin(eval(Str)) + '\n';
}

function Cos(Str) {
    document.getElementById("InputDis").value = Math.cos(eval(Str));
    document.getElementById("History").value += 'Sin(' + eval(Str) + ') = ' + Math.sin(eval(Str)) + '\n';
}

function MemPlus(Str) {
    Memory += eval(Str);

}

function MemMinus(Str) {
    Memory -= eval(Str);

}

function MemInput() {
    document.getElementById("InputDis").value += Memory;
}

function MemDel() {
    Memory = 0;

}