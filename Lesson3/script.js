// let i = 0;
//
// while (i < 3) {
//     console.log(i);
//     i++;
// }
//
// let i = 1;
// do {
//     console.log(i);
//     i++;
// } while (i < 3);
//
// for (var i = 0; i < 3; i++) {
// // for (var i = 0, b = 3; i < 3; i++, b--) {
//     console.log(i);
// }
//
// while (true) {
//     ...
// }

// do {
//     ...
// } while (true);

// for (;;) {
//     ...
// }

// for (let i = 0;; i++) {
//     if (i > 10) break; // Выход из цикла
//     if (i % 2 === 1) continue; // завершение итерации
//     console.log(i);
// }

// outerLoop: for (let a = 0; a < 3; a++) {
//         console.log('Upper cycle is running');
//         for (let b = 0; b < 3; b++) {
//             console.log('Inner cycle is running');
//             if (b >= 1) {
//                 console.log('Breaking inner cycle');
//                 break outerLoop;
//             }
//         }
//     }

// let arr = [1, 5, 6, 7];
// let arr = new Array(5, 4, 5, 6, 6, 7);
// let arr = new Array(5);
// arr.length = 10;
// console.log(arr, arr.length);

// let arr = [
//     [1, 5, 'hi', false],          // 0
//     [55, true, 1, 100],           // 1
//     [true, 'string', NaN, 32],    // 2
// ];

// console.log(arr[2][1]);


let arr = [true, 'string', NaN, 32];

// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

// for (const key in arr) { // key = 0...n
//     console.log(arr[key]);
// }

// for (const val of arr) { // val = arr[0]...arr[n]
//     console.log(val);
// }

// let arr = [];
// arr[1] = 3;
// arr[100] = 'qwer';
// delete arr[1];
// console.log(arr);

// console.log(arr, arr.push('end'));
// console.log(arr, arr.unshift('begin'));
//
// console.log(arr, arr.pop());
// console.log(arr, arr.shift());
//
// // console.log(arr, arr.splice(1, 1));
// // console.log(arr, arr.splice(1, 1, 'qwe'));
// console.log(arr, arr.splice(1, 0, 'qwe'));

// forEach(), map(), find(), reduce(), includes()

// const arr2 = arr;
//
// console.log(arr === arr2);
//
// arr.pop();
// console.log(arr2);

// const arrCopy = Array.from(arr);
// const arrCopy = [...arr];
// console.log(arrCopy);
//
// console.log(arr === arrCopy);

