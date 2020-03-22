function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result;
    let arrExpr = [];
    //Проверяем наличие ложных скобок
    let countOpen = 0;
    let countClose = 0;
    let test = expr.split(' ').join('');
    if(test.includes('(') || test.includes(')')) {
        for(let a = 0; a < test.length; a++) {
            if(test[a] === '('){
                countOpen += 1;
                continue;
            }
            if(test[a] === ')'){
                countClose += 1;
                continue;
            }
        }
    // Если количество откр. и закр. скобок не одинаковое => то ошибка
    if(countOpen / countClose !== 1) {
        throw("ExpressionError: Brackets must be paired");
    }
    }

    // Приводим строку к массиву
    expr = expr.trim();
    if(expr.includes(' ')) {
        arrExpr = [...expr.split(' ')];
    }else{
        arrExpr = [...expr.split('')];
    }

    // Удаляем пустые елементы из массива 
    arrExpr = arrExpr.filter((el) => el.length > 0);

    // Первым действием выпоняем операции в ()
    while(arrExpr.includes('(')) {
        let indexOpen =arrExpr.lastIndexOf('(');
        let indexClose =arrExpr.indexOf(')', indexOpen);
        let arrMiddle = arrExpr.slice(indexOpen + 1, indexClose);
        multiplEndDivision (arrMiddle);
        additionAndSubtraction(arrMiddle);
        arrExpr.splice(indexOpen,((indexClose - indexOpen) + 1), arrMiddle[0]);
        arrMiddle = [];
    }
    

    // Сначало * и /
    multiplEndDivision (arrExpr);

    function multiplEndDivision (array) {
        if(array.includes('*') || array.includes('/')) {
            for(let i = 0; i < array.length; i++) {
                let el = array[i];
                let operation;
                if(el == '*' || el == '/'){
                    operation = calc(array[i - 1], array[i + 1], el);
                    array.splice(i - 1, 3, operation);
                    i--;
                }
            }
        }
    }

    // Потом + и -
    additionAndSubtraction(arrExpr);

    function additionAndSubtraction(array) {
        if(array.includes('+') || array.includes('-')) {
            for(let i = 0; i < array.length; i++) {
                let el = array[i];
                let operation;
                if(el == '+' || el == '-'){
                    operation = calc(array[i - 1], array[i + 1], el);
                    array.splice(i - 1, 3, operation);
                    i--;
                }
            }
        }
    }

    result = +arrExpr.join('');
    
    return result;
}

    function calc(a, b, operator) {
        let result;
        if(operator === '*') {
            return result = '' + (a * b);
        }
        if(operator === '/') {
            if(b !== '0'){
                return result = '' + (a / b);
            }else{
                throw("TypeError: Division by zero.");
            } 
        }
        if(operator === '+') {
            return result = '' + (+a + +b);
        }
        if(operator === '-') {
            return result = '' + (a - b);
        }
    return result;
    }

module.exports = {
    expressionCalculator
}