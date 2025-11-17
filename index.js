import { createCard } from './.vscode/modules/createCard.js'
import { createButton } from './.vscode/modules/createButton.js'
import { random } from './.vscode/modules/random.js'


let firstCard = null
let secondCard = null
let lockBoard = false
let finderDouble = 0
let allDouble = 8

function createGame() {
    const container = document.getElementById('game')
    container.innerHTML = ''
    let arrayId = []
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 8; j++) {
            arrayId.push(j + 1)
        }
    }

    random(arrayId)

    const size = 4;
    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')

        for (let j = 0; j < size; j++) {
            const index = i * size + j
            const value = arrayId[index]
            const card = createCard(value, index)
            rowDiv.append(card.divCard)
            card.divCard.addEventListener('click', () => clickCard(card.divCard, value))
        }

        container.append(rowDiv)
    }
    let restartBtn = document.getElementById('restartButton')
    if (restartBtn) restartBtn.remove()

    restartBtn = createButton('Начать заново')
    restartBtn.addEventListener('click', createGame)
    container.append(restartBtn)

    firstCard = null
    secondCard = null
    lockBoard = false
    finderDouble = 0
}

function clickCard(element, value) {
    if (lockBoard) return
    if (element.classList.contains('finder') || element.classList.contains('active')) return

    element.classList.add('active')
    const cardText = element.querySelector('p').textContent

    if (!firstCard) {
        firstCard = { element: element, value: value }
        return
    }

    if (!secondCard) {
        secondCard = { element: element, value: value }
        if (secondCard.value === firstCard.value) {
            firstCard.element.classList.add('finder')
            secondCard.element.classList.add('finder')
            finderDouble++
            firstCard = null
            secondCard = null
            if (finderDouble === allDouble) {
                alert('Поздравляем! Вы нашли все пары!')
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                firstCard.element.classList.remove('active')
                secondCard.element.classList.remove('active')
                firstCard = null
                secondCard = null
                lockBoard = false
            }, 1000)
        }
    }
}

document.addEventListener('DOMContentLoaded', createGame)