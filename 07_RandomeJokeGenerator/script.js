let jokeEl = document.getElementById('joke')
let authorEl = document.getElementById('author')
let buttonEl = document.getElementById('btnEl')

buttonEl.addEventListener('click', generateJoke)

async function generateJoke() {
    const resoponse = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random')
    const joke = await resoponse.json()
    console.log(joke)
    console.log(joke.data.content);

    jokeEl.textContent = joke.data.content
    authorEl.textContent = joke.data.author
}

generateJoke()
    