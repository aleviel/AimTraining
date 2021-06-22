const screens = document.querySelectorAll('.screen'),
    startBtn = document.querySelector('#startBtn'),
    timeList = document.querySelector('#time-list'),
    gameTimer = document.querySelector('#time'),
    board = document.querySelector('#board'),
    scoreTable = document.querySelector('#score');
const COLORS = ['#DFD3E7', '#FED3C3', '#EFF7E0', '#8C87C7', '#B5DCDB'];
let time = 0, score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        const timeForTimer = +event.target.getAttribute('data-time');
        screens[1].classList.add('up')
        time = timeForTimer;
        startGame()
    }
})

board.addEventListener('click', fire)

function startGame() {
    setInterval(decrTime, 1000)
    setTime(time)
    getRandomCircle()
}

function decrTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function fire(event) {
    if (event.target.classList.contains('circle')) {
        score += 1;
        event.target.remove()
    }
    getRandomCircle()
}

function setTime(value) {
    gameTimer.innerHTML = `00:${value}`
}

function getRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle')
    circle.style.background = `linear-gradient(${getRandomNum(0, 90)}deg, ${getRandomColor(COLORS)} 0%, ${getRandomColor(COLORS)} 47%, ${getRandomColor(COLORS)} 100%)`;
    const size = getRandomNum(10, 100)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNum(0, width - size)
    const y = getRandomNum(0, height - size)
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.appendChild(circle)
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(colorArr) {
    return colorArr[Math.round(Math.random() * colorArr.length)]
}

function finishGame() {
    gameTimer.parentNode.className = 'hide';
    board.removeEventListener('click', fire);
    scoreTable.parentNode.classList.add('finish');
    scoreTable.innerHTML = `${score}`
}
