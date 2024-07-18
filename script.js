const result = document.querySelector(".calculo");
const buttons = document.querySelectorAll(".buttons button");

let number = "";
let firstnum = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {

    let formattedNumber = number !== "" ? parseFloat(number.replace(",", ".")).toLocaleString('pt-BR', { maximumFractionDigits: 6 }) : "0";
    result.textContent = originClear ? "0" : formattedNumber;
}

function insert(digit) {
    if (digit === "," && (number.includes(",") || !number)) 
        return;
    
  
    if (restart) {
        number = digit; 
        restart = false;
    } else {
        number += digit;
    }

    updateResult();
}

function setOperator(newOperator) {
    if (number !== "") {
        calculate();
        firstnum = parseFloat(number.replace(",", "."));
        number = "";
    }
    operator = newOperator;
    restart = false;
}

function calculate() {
    if (firstnum !== null && operator && number !== "") {
        let secondnum = parseFloat(number.replace(",", "."));
        let resultValue;
        
        switch(operator) {
            case "+":
                resultValue = firstnum + secondnum;
                break;
            case "-":
                resultValue = firstnum - secondnum;
                break;
            case "x":
                resultValue = firstnum * secondnum;
                break;
            case "÷":
                resultValue = firstnum / secondnum;
                break;
            default:
                return;
        }

        // Ajuste para lidar com números decimais maiores
        if (resultValue.toString().split(".")[1]?.length > 5) {
            number = parseFloat(resultValue.toFixed(5)).toString();
        } else {
            number = resultValue.toString();
        }

        restart = true;
        firstnum = null;
        operator = null;
        updateResult();
    }
}

function clearCalculator() {
    number = "";
    firstnum = null;
    operator = null;
    updateResult(true);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        if (/^[0-9,]+$/.test(value)) {
            insert(value);
        } else if (["+","-","x","÷"].includes(value)) {
            setOperator(value);
        } else if (value === "AC") {
            clearCalculator();
        } else if (value === "=") {
            calculate();
        } else if (value === "±") {
            number = (parseFloat(number || firstOpe) * -1).toString();updateResult();
        }
    });
});
