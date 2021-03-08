'use strict'

// 1. Написать функцию, преобразующую число в объект.

const numToObj = function (num) {
  if (num < 0 || num > 999) {
    console.log('Введите число от 0 до 999');
    return {}
  }

  const result = {
    'единицы': 0,
    'десятки': 0,
    'сотни': 0,
  }

  const str = num.toString();

  for (let i in str) {
    const currentKey = Object.keys(result)[i]
    result[currentKey] += +str[i];
  }

  return result
}


// 2.Продолжить работу с интернет-магазином:
// 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// 2.2. Реализуйте такие объекты.
// 2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.

const cart = {
  products: [
    {
      title: 'item1',
      price: 150,
      quantity: 3,
    },
    {
      title: 'item2',
      price: 50,
      quantity: 5,
    },
    {
      title: 'item3',
      price: 400,
      quantity: 1,
    }
  ],

  countBasketPrice() {
    const products = this.products;
    let total = products.reduce((totalPrice, product) => totalPrice += product.price * product.quantity, 0)

    return total
  }
}