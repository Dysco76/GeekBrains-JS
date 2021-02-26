'use strict';

let generatedNumbers = [];
let attemptsCount = 0;

function resetGame() {
    generatedNumbers = [];
    attemptsCount = 0;

    while (generatedNumbers.length < 4) {
        const part = Math.floor(Math.random() * 10); // 0-9
        if (!generatedNumbers.includes(part)) generatedNumbers.push(part);
    }

    console.log(generatedNumbers);
}

function startGame() {
    while (true) {
        const guess = prompt('Угадайте 4 разных целых положительных числа, загаданных компьютером. Введите -1 чтобы выйти');

        if (guess === '-1') return alert('Game over');

        if (!isValidGuess(guess)) continue;

        attemptsCount++;

        const result = getGuessResult(guess);

        if (result[0] !== 4) {
            alert(`Быки: ${result[0]}. Коровы: ${result[1]}.`); // шаблонные строки ${...}
            continue;
        }

        alert('Поздравляем! Вы угадали все цифры. Количество попыток ' + attemptsCount + '.');

        if (!confirm('Хотите сыграть еще?')) return alert('До свидания!');

        resetGame();
    }
}

function isValidGuess(guess) {
    if (guess.length !== 4) return false;

    for (let i = 0; i < guess.length; i++) {
        if (isNaN(parseInt(guess[i]))) return false;
    }

    return true;
}

function getGuessResult(guess) {
    const result = [0, 0];

    for (let i = 0; i < guess.length; i++) {
        if (+guess[i] === generatedNumbers[i]) {
            result[0]++; // result[0] = result[0] + 1;
        } else if (generatedNumbers.includes(+guess[i])) {
            result[1]++;
        }
    }

    return result;
}

resetGame();
startGame();

// const cart = [
//     ['item1', 100, 4],
//     ['item6', 346, 1],
//     ['item57', 200, 7],
//     ['item60', 50, 3],
// ];
