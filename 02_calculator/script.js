const display = document.getElementById('display')
const buttons = document.querySelectorAll('.btn')
const histroyList = document.getElementById('historyList')

const histroy = []

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value == '=') {
            try {
                const expression = display.value
                const result = eval(display.value)
                display.value = result
                addHistory(expression,result)
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

function addHistory(expression,result) {
    const li = document.createElement('li')
    li.textContent = `${expression} = ${result}`
    // histroyList.appendChild(li)
    histroyList.prepend(li)
}