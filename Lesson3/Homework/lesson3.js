'use strict'

// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

let i = 2;

while (i < 100) {
  let j = 2;
  let isSimple = false;

  while (j <= i) {
    if (j < i && i % j === 0) {
      break
    } else {
      if (j === i) isSimple = true;
      j++
    }
  }
  if (isSimple) console.log(i);
  i++
};


// 2. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. Товары в корзине хранятся в массиве. Задачи:
// a) Организовать такой массив для хранения товаров в корзине;
// b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.


const myCart = [
  ['item1', 150, 3],
  ['item2', 50, 5],
  ['item3', 400, 2],
  ['item4', 200, 1],
  ['item5', 120, 4],
]

const countBasketPrice = function (cart) {
  let total = 0;

  for (let item of cart) {
    total += item[1] * item[2]
  }

  return total
}

console.log(countBasketPrice(myCart)) // 2180

// 3.*Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла.

for (let i = 0; i < 10; console.log(i++)) { };

// 4. *Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:

for (let i = 1; i <= 20; i++) {
  console.log('x'.repeat(i), i)
}