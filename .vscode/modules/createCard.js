export function createCard(text, index) {
    const divCard = document.createElement('div')
    divCard.classList.add('divCard', 'card', 'passiveCard')

    const p = document.createElement('p')
    p.classList.add('textCard')
    p.textContent = text

    divCard.id = String(index)
    divCard.append(p)

    return {
        divCard,
        p
    }
}