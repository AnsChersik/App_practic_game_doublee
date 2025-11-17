export function createButton(text) {
    const button = document.createElement('button')
    button.id = 'restartButton'
    button.textContent = text

    return button
}