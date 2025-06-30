const imageCount = 5
let image = []
let currentIdx = 0
let intervalId = null

const imageEl = document.getElementById('carousel-image')
const counterEl = document.getElementById('counter')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

async function loadImage() {
    for (let i = 0; i < imageCount ;i ++) {
        const url = `https://picsum.photos/400/250?random=${Math.floor(Math.random()*100)}`;
        image.push(url)
    }
    showImge(currentIdx)
}

console.log(image)

function showImge(index) {
    imageEl.src = image[index]
    counterEl.textContent = `Image ${index + 1} / ${imageCount}`
}

function autoChangeImage() {
    intervalId = setInterval(() => {
        currentIdx = (currentIdx + 1) % imageCount
        showImge(currentIdx)

        return () => clearInterval(intervalId)
    },3000)
}

prevBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + imageCount) % imageCount
    showImge(currentIdx)
})

nextBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % imageCount
    showImge(currentIdx)
})

imageEl.addEventListener('mouseenter' , () => clearInterval(intervalId))
imageEl.addEventListener('mouseleave' , () => autoChangeImage())


loadImage()
autoChangeImage()