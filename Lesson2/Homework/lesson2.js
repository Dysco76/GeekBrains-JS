'use strict'

// 1. Дан код:
// Почему код даёт именно такие результаты?

var a = 1, b = 1, c, d;
c = ++a; alert(c);           // 2 инкремент в качестве префикса сначала увеличивает число, а потом возвращает результат
d = b++; alert(d);           // 1 в качестве постфикса сначала возвращает число, а потом увеличивает его
c = (2 + ++a); alert(c);      // 5 'a' была увеличена на единицу строке 5. На этой строке мы увеличи 'a' еще на единицу и прибавили к ней 2
d = (2 + b++); alert(d);      // 4 'b' была увеличена на единицу на строке 6. На этой строке 'b' увеличивается еще на единицу, но инкремент в качестве постфикса, поэтому возвращается старое значение
alert(a);                    // 3 'a' увеличена на единицу на строках 5 и 7
alert(b);                    // 3 'b' увеличена на единицу на строках 6 и 8

// 2. Чему будет равен x в примере ниже?

var a = 2;
var x = 1 + (a *= 2);

// Ответ: 5

// 3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
// если a и b положительные, вывести их разность;
// если а и b отрицательные, вывести их произведение;
// если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.

var a = -7;
var b = 12;

if (a >= 0 && b >= 0) {
  console.log(a - b);
  console.log('1st case');
} else if (a < 0 && b < 0) {
  console.log(a * b);
  console.log('2nd case');
} else {
  console.log(a + b);
}

// 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

var a = 7;

switch (a) {
  case 0:
    console.log(a++)
  case 1:
    console.log(a++)
  case 2:
    console.log(a++)
  case 3:
    console.log(a++)
  case 4:
    console.log(a++)
  case 5:
    console.log(a++)
  case 6:
    console.log(a++)
  case 7:
    console.log(a++)
  case 8:
    console.log(a++)
  case 9:
    console.log(a++)
  case 10:
    console.log(a++)
  case 11:
    console.log(a++)
  case 12:
    console.log(a++)
  case 13:
    console.log(a++)
  case 14:
    console.log(a++)
  case 15:
    console.log(a)
    break;
  default:
    console.log('Введите число от 0 до 15');
}

// 5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.

const add = function (arg1, arg2) {
  return arg1 + arg2
}

const withdraw = function (arg1, arg2) {
  return arg1 - arg2
}

const multiply = function (arg1, arg2) {
  return arg1 * arg2
}

const divide = function (arg1, arg2) {
  return arg1 / arg2
}

// 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).

function mathOperation(arg1, arg2, operation) {
  switch (operation) {
    case '+':
      return add(arg1, arg2);
    case '-':
      return withdraw(arg1, arg2)
    case '*':
      return multiply(arg1, arg2)
    case '/':
      return divide(arg1, arg2)
  }
}

// 7. *Сравнить null и 0. Попробуйте объяснить результат.

console.log(null === 0); // false
console.log(typeof null); // object
console.log(typeof 0); // number

// 8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.

function power(val, pow) {
  if (pow === 1) {
    return val
  }
  else {
    return val * power(val, pow - 1)
  }
}

power(2, 3);