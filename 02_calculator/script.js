const display = document.getElementById('display')
const buttons = document.querySelectorAll('.btn')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value == '=') {
            try {
                display.value = eval(display.value)
            }
            catch (e) {
                display.value = ' error '
            }
        }
        else if (value == 'C') {
            display.value = ''
        }
        else {
            display.value += value
        }
    })
})