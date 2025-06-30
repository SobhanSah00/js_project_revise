const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style System", "Creative Style Syntax", "Color Style Sheet"],
    answer: "Cascading Style Sheets"
  }
];

let currentQuestion = 0;
let score = 0;
const userAnswers = {}; 

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtnEl = document.getElementById('nextbtn');
const prevBtnEl = document.getElementById('prevbtn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsEl.innerHTML = '';
  nextBtnEl.disabled = true;
  prevBtnEl.disabled = currentQuestion === 0;

  q.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.style.display = 'block';
    button.style.margin = '8px 0';

    // Check if user already selected this option
    if (userAnswers[currentQuestion]) {
      button.disabled = true;
      if (option === q.answer) {
        button.style.backgroundColor = 'green';
      } else if (option === userAnswers[currentQuestion]) {
        button.style.backgroundColor = 'red';
      }
      nextBtnEl.disabled = false;
    }

    button.addEventListener('click', () => selectOption(button, q.answer));
    optionsEl.appendChild(button);
  });
}

function selectOption(button, correctAns) {
  const allButtons = optionsEl.querySelectorAll('button');
  allButtons.forEach(btn => btn.disabled = true);

  const selected = button.textContent;
  userAnswers[currentQuestion] = selected;

  if (selected === correctAns) {
    button.style.backgroundColor = 'green';
    if (!button.classList.contains('scored')) {
      score++;
      button.classList.add('scored');
    }
  } else {
    allButtons.forEach(btn => {
      if (btn.textContent === correctAns) {
        btn.style.backgroundColor = 'green';
      } else if (btn.textContent === selected) {
        btn.style.backgroundColor = 'red';
      }
    });
  }

  nextBtnEl.disabled = false;
}

nextBtnEl.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

prevBtnEl.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

function showScore() {
  questionEl.textContent = 'Quiz Completed';
  optionsEl.innerHTML = '';
  nextBtnEl.style.display = 'none';
  prevBtnEl.style.display = 'none';
  scoreEl.textContent = `Your Score is: ${score} / ${quizData.length}`;
}

loadQuestion();
