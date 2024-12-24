const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Rome", correct: false },
      { text: "Berlin", correct: false },
    ],
  },
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "J.K. Rowling", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "Jane Austen", correct: false },
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Oxygen", correct: true },
      { text: "Gold", correct: false },
      { text: "Osmium", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the capital city of Japan?",
    answers: [
      { text: "Tokyo", correct: true },
      { text: "Osaka", correct: false },
      { text: "Kyoto", correct: false },
      { text: "Hiroshima", correct: false },
    ],
  },
  {
    question: "Which organ pumps blood in the human body?",
    answers: [
      { text: "Heart", correct: true },
      { text: "Brain", correct: false },
      { text: "Lungs", correct: false },
      { text: "Liver", correct: false },
    ],
  },
  {
    question: "What is the speed of light?",
    answers: [
      { text: "299,792 km/s", correct: true },
      { text: "300,000 km/s", correct: false },
      { text: "150,000 km/s", correct: false },
      { text: "299,792 m/s", correct: false },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Claude Monet", correct: false },
    ],
  },
  {
    question: "What is the boiling point of water at sea level?",
    answers: [
      { text: "100°C", correct: true },
      { text: "90°C", correct: false },
      { text: "120°C", correct: false },
      { text: "80°C", correct: false },
    ],
  },
  {
    question: "What year did the Titanic sink?",
    answers: [
      { text: "1912", correct: true },
      { text: "1905", correct: false },
      { text: "1918", correct: false },
      { text: "1920", correct: false },
    ],
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    answers: [
      { text: "Africa", correct: true },
      { text: "Asia", correct: false },
      { text: "Europe", correct: false },
      { text: "South America", correct: false },
    ],
  },
  {
    question: "Which language is the most spoken worldwide?",
    answers: [
      { text: "Mandarin Chinese", correct: true },
      { text: "English", correct: false },
      { text: "Spanish", correct: false },
      { text: "Hindi", correct: false },
    ],
  },
  {
    question: "Who discovered penicillin?",
    answers: [
      { text: "Alexander Fleming", correct: true },
      { text: "Marie Curie", correct: false },
      { text: "Isaac Newton", correct: false },
      { text: "Charles Darwin", correct: false },
    ],
  },
  {
    question: "Which gas do plants absorb during photosynthesis?",
    answers: [
      { text: "Carbon dioxide", correct: true },
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

const welcomeScreen = document.getElementById("welcome-screen");
const gameScreen = document.getElementById("game-screen");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resetButton = document.getElementById("reset-btn");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", showNextQuestion);
resetButton.addEventListener("click", resetQuiz);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  welcomeScreen.style.display = "none";
  gameScreen.style.display = "block";

  // Update leaderboard
  updateLeaderboard();

  showNextQuestion();
}

function showNextQuestion() {
  resetState();
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
  } else {
    endQuiz();
  }
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  timerElement.innerText = "10";
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;
  setStatusClass(selectedButton, correct);
  currentQuestionIndex++;
}

function setStatusClass(element, correct) {
  element.style.backgroundColor = correct ? "green" : "red";
}

function startTimer() {
  let timeLeft = 10;
  timerElement.innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      currentQuestionIndex++;
      showNextQuestion();
    }
  }, 1000);
}

function resetQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  welcomeScreen.style.display = "block";
  gameScreen.style.display = "none";
}

function endQuiz() {
  clearInterval(timerInterval);
  questionElement.innerText = "Quiz Over!";
  answersElement.innerHTML = "";
  scoreElement.innerText = `Your Score: ${score}/${questions.length}`;

  // Save the score in local storage
  saveScore(score);

  // Display the leaderboard
  updateLeaderboard();
}

function saveScore(score) {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  scores.push({ score, date: new Date().toLocaleString() });
  localStorage.setItem("quizScores", JSON.stringify(scores));
}

function updateLeaderboard() {
  const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
  const highScoresList = document.getElementById("high-scores");
  highScoresList.innerHTML = ""; // Clear the leaderboard

  scores
    .sort((a, b) => b.score - a.score) // Sort scores in descending order
    .slice(0, 5) // Display top 5 scores
    .forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `Score: ${entry.score} - Date: ${entry.date}`;
      highScoresList.appendChild(li);
    });
}
