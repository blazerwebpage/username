const display = document.getElementById('display');
let current = '';
let previous = '';
let operation = null;

const buttons = document.querySelectorAll('.all_button button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.textContent;

        if (!isNaN(value) || value === '.') {
            // Цифры и точка
            current += value;
            updateDisplay();
        } else if (value === 'AC') {
            current = '';
            previous = '';
            operation = null;
            updateDisplay();
        } else if (value === 'Х') { 
            // теперь ',' = удаление последнего символа
            current = current.slice(0, -1);
            updateDisplay();
        } else if (value === '+/-') {
            if (current) current = (parseFloat(current) * -1).toString();
            updateDisplay();
        } else if (value === '%') {
            if (current) current = (parseFloat(current) / 100).toString();
            updateDisplay();
        } else if (value === '=') {
            if (current && previous && operation) {
                calculate();
                operation = null;
                previous = '';
                updateDisplay();
            }
        } else {
            // Операции + - * /
            if (current === '' && previous !== '') {
                operation = value; // меняем операцию
            } else {
                if (previous !== '') {
                    calculate();
                } else {
                    previous = current;
                }
                current = '';
                operation = value;
            }
            updateDisplay(); // показываем, например "32 -"
        }
    });
});

function calculate() {
    let result;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    current = result.toString();
    previous = '';
}

function updateDisplay() {
    if (operation && previous) {
        display.textContent = previous + ' ' + operation + ' ' + current;
    } else if (current) {
        display.textContent = current;
    } else {
        display.textContent = '0';
    }
}
