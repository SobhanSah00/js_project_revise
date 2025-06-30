const fakeAuthor = [
  "Mark Twain", "Albert Einstein", "Oscar Wilde", "Maya Angelou", "Stephen Hawking",
  "Abraham Lincoln", "William Shakespeare", "Elon Musk", "Steve Jobs", "Jane Austen",
  "Nelson Mandela", "J.K. Rowling", "Charles Dickens", "Martin Luther King Jr."
];

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtnEl = document.getElementById('nxtBtnEl');

let TotalAns = 0;

nextBtnEl.addEventListener('click', showDelayedQuestion);

function showDelayedQuestion() {
  nextBtnEl.disabled = true;
  setTimeout(() => {
    questionGenerate();
  }, 1000);
}

async function questionGenerate() {
  // Clear old options
  optionsEl.innerHTML = "";

  try {
    const response = await fetch('https://api.freeapi.app/api/v1/public/quotes/quote/random');
    const data = await response.json();

    if (data.success) {
      const realAuthor = data.data.author;
      const quote = data.data.content;

      questionEl.textContent = `"${quote}"`;

      const options = generateOptions(realAuthor);
      renderOptions(options, realAuthor);
    } else {
      questionEl.textContent = "Failed to load quote.";
    }
  } catch (err) {
    questionEl.textContent = "Error loading quote.";
    console.error(err);
  }
}

function generateOptions(realAuthor) {
  // Filter out realAuthor from fake list
  const filtered = fakeAuthor.filter(name => name !== realAuthor);
  const fakeChoices = [];

  while (fakeChoices.length < 3) {
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    if (!fakeChoices.includes(random)) {
      fakeChoices.push(random);
    }
  }

  const options = [...fakeChoices, realAuthor];
  // Shuffle the options
  return options.sort(() => Math.random() - 0.5);
}

function renderOptions(options, correctAuthor) {
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.style.margin = "6px";
    button.style.padding = "6px 12px";
    button.addEventListener('click', () => {
      checkAnswer(button, correctAuthor);
    });
    optionsEl.appendChild(button);
  });
}

function checkAnswer(button, correctAuthor) {
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true); // disable all

  if (button.textContent === correctAuthor) {
    button.style.backgroundColor = 'green';
    TotalAns++;
  } else {
    button.style.backgroundColor = 'red';
    // Highlight correct one
    buttons.forEach(btn => {
      if (btn.textContent === correctAuthor) {
        btn.style.backgroundColor = 'green';
      }
    });
  }

  nextBtnEl.disabled = false;
}

questionGenerate();
