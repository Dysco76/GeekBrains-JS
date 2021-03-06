"use strict";

const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 5,
  winFoodCount: 50,
  obstaclesCount: 10,
};

const config = {
  settings,

  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  getObstaclesCount() {
    return this.settings.obstaclesCount;
  },

  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  validate() {
    const result = {
      isValid: true,
      errors: [],
    };

    if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
    }

    if (this.getColsCount() < 10 || this.getColsCount() > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
    }

    if (this.getSpeed() < 1 || this.getSpeed() > 10) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
    }

    if (this.getWinFoodCount() < 5 || this.getWinFoodCount() > 50) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
    }

    if (this.getObstaclesCount() < 0 || this.getObstaclesCount() > Math.floor((this.getRowsCount() * this.getColsCount()) * 0.05)) {
      result.isValid = false;
      result.errors.push(`Неверные настройки, значение obstaclesCount должно быть в диапазоне [0, ${Math.floor((this.getRowsCount() * this.getColsCount()) * 0.05)}].`);
    }

    return result;
  },
};

const map = {
  cells: null,
  usedCells: null,

  init(rowsCount, colsCount) {
    const table = document.getElementById('game');
    table.innerHTML = '';

    this.cells = {};  // {x1_y1: td, x1_y2: td}
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      const tr = document.createElement('tr');
      tr.classList.add('row');
      table.appendChild(tr);

      for (let col = 0; col < colsCount; col++) {
        const td = document.createElement('td');
        td.classList.add('cell');
        tr.appendChild(td);

        this.cells[`x${col}_y${row}`] = td;
      }
    }
    console.log(this.cells);
  },

  render(snakePointsArray, foodPoint, obstaclesArray) {
    for (const cell of this.usedCells) {
      cell.className = 'cell';
    }

    this.usedCells = [];

    snakePointsArray.forEach((point, index) => {
      const snakeCell = this.cells[`x${point.x}_y${point.y}`];

      snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
      this.usedCells.push(snakeCell);
    });

    obstaclesArray.forEach(point => {
      const obstacleCell = this.cells[`x${point.x}_y${point.y}`]

      obstacleCell.classList.add('obstacle')
      this.usedCells.push(obstacleCell);
    })

    const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];

    foodCell.classList.add('food');
    this.usedCells.push(foodCell);
  },
};

const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,

  init(startBody, direction) {
    this.body = startBody;
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  getBody() {
    return this.body;
  },

  getLastStepDirection() {
    return this.lastStepDirection;
  },

  isOnPoint(point) {
    return this.body.some((snakePoint) => snakePoint.x === point.x && snakePoint.y === point.y);
  },

  makeStep(rows, cols) {
    this.lastStepDirection = this.direction;
    this.body.unshift(this.getNextStepHeadPoint(rows, cols)); // [p3, p2, p1] => [p4, p3, p2]
    this.body.pop();
  },

  growUp() {
    const lastBodyIndex = this.body.length - 1;
    const lastBodyPoint = this.body[lastBodyIndex];
    this.body.push(lastBodyPoint);
  },

  getNextStepHeadPoint(rows, cols) {
    const headPoint = this.body[0];

    switch (this.direction) {
      case 'up':

        if (headPoint.y === 0) return { x: headPoint.x, y: rows - 1 };
        return { x: headPoint.x, y: headPoint.y - 1 };

      case 'right':
        if (headPoint.x === cols - 1) return { x: 0, y: headPoint.y };
        return { x: headPoint.x + 1, y: headPoint.y };

      case 'down':
        if (headPoint.y === rows - 1) return { x: headPoint.x, y: 0 }
        return { x: headPoint.x, y: headPoint.y + 1 };

      case 'left':
        if (headPoint.x === 0) return { x: cols - 1, y: headPoint.y }
        return { x: headPoint.x - 1, y: headPoint.y };
    }
  },

  setDirection(direction) {
    this.direction = direction;
  },
};

const food = {
  x: null,
  y: null,

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  },

  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },
};

const obstacle = {
  coordinates: [],

  init(pointsArray) {
    this.coordinates = [];
    this.setCoordinates(pointsArray)
  },

  getCoordinates() {
    return this.coordinates;
  },

  setCoordinates(pointsArray) {
    this.coordinates = [];
    pointsArray.forEach(point => this.coordinates.push({ x: point.x, y: point.y }));
  },

  isOnPoint(point) {
    return this.coordinates.some(obstacle => obstacle.x === point.x && obstacle.y === point.y);
  },



};

const status = {
  condition: null,

  setPlaying() {
    this.condition = 'playing';
  },

  setStopped() {
    this.condition = 'stopped';
  },

  setFinished() {
    this.condition = 'finished';
  },

  isPlaying() {
    return this.condition === 'playing';
  },

  isStopped() {
    return this.condition === 'stopped';
  },
};

const game = {
  config,
  map,
  snake,
  food,
  status,
  obstacle,
  tickInterval: null,
  score: document.querySelector('.score-count'),
  // Задание 1
  addPoint() {
    this.score.textContent = String(+this.score.textContent + 1);
  },

  resetScore() {
    this.score.textContent = '0';
  },

  init(userSettings) {
    this.config.init(userSettings);
    const validation = this.config.validate();

    if (!validation.isValid) {
      for (const err of validation.errors) {
        console.log(err);
      }

      return;
    }

    this.map.init(this.config.getRowsCount(), this.config.getColsCount());

    this.setEventHandlers();
    this.reset();
  },

  setEventHandlers() {
    document.getElementById('playButton').addEventListener('click', () => {
      this.playClickHandler();
    });
    document.getElementById('newGameButton').addEventListener('click', () => {
      this.newGameClickHandler();
    });
    // document.getElementById('newGameButton').addEventListener('click', this.newGameClickHandler.bind(this));
    document.addEventListener('keydown', (event) => {
      this.keyDownHandler(event);
    });
  },

  playClickHandler() {
    if (this.status.isPlaying()) this.stop();
    else if (this.status.isStopped()) this.play();
  },

  newGameClickHandler() {
    this.reset();
  },

  keyDownHandler(event) {
    if (!this.status.isPlaying()) return;

    const direction = this.getDirectionByCode(event.code);

    if (this.canSetDirection(direction)) this.snake.setDirection(direction);
  },

  getDirectionByCode(code) {
    switch (code) {
      case 'KeyW':
      case 'ArrowUp':
        return 'up';
      case 'KeyD':
      case 'ArrowRight':
        return 'right';
      case 'KeyS':
      case 'ArrowDown':
        return 'down';
      case 'KeyA':
      case 'ArrowLeft':
        return 'left';
      default:
        return '';
    }
  },

  canSetDirection(direction) {
    const lastStepDirection = this.snake.getLastStepDirection();

    return direction === 'up' && lastStepDirection !== 'down' ||
      direction === 'right' && lastStepDirection !== 'left' ||
      direction === 'down' && lastStepDirection !== 'up' ||
      direction === 'left' && lastStepDirection !== 'right';
  },

  reset() {
    this.stop();
    this.snake.init(this.getStartSnakeBody(), 'up');
    this.food.setCoordinates(this.getRandomFreeCoordinates());
    this.obstacle.setCoordinates(this.getObstaclePoints());
    this.resetScore();
    this.render();
  },

  getStartSnakeBody() {
    return [
      {
        x: Math.floor(this.config.getColsCount() / 2),
        y: Math.floor(this.config.getRowsCount() / 2),
      }
    ];
  },

  getObstaclePoints() {
    const pointsArray = [];
    for (let obstacle = 0; obstacle < this.config.getObstaclesCount(); obstacle++) {
      const point = this.getRandomFreeCoordinates();
      if (!this.isValidObstacle(point, pointsArray)) {
        obstacle--
        continue;
      }

      pointsArray.push(point);
    }
    console.log(pointsArray);

    return pointsArray;
  },

  isValidObstacle(currPoint, pointsArray) {
    if (currPoint.x === 0 ||
      currPoint.y === 0 ||
      currPoint.x === this.config.getColsCount() - 1 ||
      currPoint.y === this.config.getRowsCount() - 1 ||
      currPoint.y === this.getStartSnakeBody()[0].y - 1) {
      return false
    } else if (pointsArray.some(point => {
      return ((point.x === currPoint.x - 1) && (point.y === currPoint.y - 1)) ||
        ((point.x === currPoint.x + 1) && (point.y === currPoint.y + 1)) ||
        ((point.x === currPoint.x + 1) && (point.y === currPoint.y - 1)) ||
        ((point.x === currPoint.x - 1) && (point.y === currPoint.y + 1))
    })) {
      console.log('diagonal contact!')
      return false
    }
    return true
  },

  getRandomFreeCoordinates() {
    const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.obstacle.getCoordinates()];
    // without ... -  [{}, [{}, {}, {}]] => with ... [{}, {}, {}, {}];
    while (true) {
      const rndPoint = {
        x: Math.floor(Math.random() * this.config.getColsCount()),
        y: Math.floor(Math.random() * this.config.getRowsCount()),
      };

      if (!exclude.some((exPoint) => {
        return rndPoint.x === exPoint.x && rndPoint.y === exPoint.y;
      })) return rndPoint;
    }
  },

  render() {
    this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstacle.getCoordinates());
  },

  play() {
    this.status.setPlaying();
    this.tickInterval = setInterval(() => {
      this.tickHandler();
    }, 1000 / this.config.getSpeed());
    this.setPlayButton('Стоп');
  },

  stop() {
    this.status.setStopped();
    clearInterval(this.tickInterval);
    this.setPlayButton('Старт');
  },

  finish() {
    this.status.setFinished();
    clearInterval(this.tickInterval);
    this.setPlayButton('Игра закончена', true);
  },

  setPlayButton(text, isDisabled = false) {
    const playButton = document.getElementById('playButton');

    playButton.textContent = text;
    isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
  },

  tickHandler() {
    if (!this.canMakeStep()) return this.finish();

    if (this.food.isOnPoint(this.snake.getNextStepHeadPoint(this.config.getRowsCount(), this.config.getColsCount()))) {
      this.snake.growUp();
      this.addPoint();
      this.food.setCoordinates(this.getRandomFreeCoordinates());

      if (this.isGameWon()) this.finish();
    }

    this.snake.makeStep(this.config.getRowsCount(), this.config.getColsCount());
    this.render();
  },

  canMakeStep() {
    const nextStepPoint = this.snake.getNextStepHeadPoint(this.config.getRowsCount(), this.config.getColsCount());

    return !this.snake.isOnPoint(nextStepPoint) &&
      !this.obstacle.isOnPoint(nextStepPoint) &&
      nextStepPoint.x < this.config.getColsCount() &&
      nextStepPoint.y < this.config.getRowsCount() &&
      nextStepPoint.x >= 0 &&
      nextStepPoint.y >= 0;
  },

  isGameWon() {
    return this.snake.getBody().length > this.config.getWinFoodCount();
  },
};

game.init({ speed: 5 });
