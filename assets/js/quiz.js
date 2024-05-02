// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var optionEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// List of Questions and Answers

var questions = [
  {
    prompt: "Commonly used data types do NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },

  {
    prompt: "The condition in an if / else statement is enclosed with _____.",
    options: ["numbers", "quotes", "curly brackets", "parentheses"],
    answer: "parentheses",
  },

  {
    prompt: "Arrays in Javascript can be used to store _____.",
    options: [
      "square brackets",
      "numbers and strings",
      "other arrays",
      "all of the above",
    ],
    answer: "all of the above",
  },

  {
    prompt:
      "String values must be enclosed within _____ when begin assigned to variables.",
    options: ["commas", "quotes", "Javascript", "terminal/bash"],
    answer: "quotes",
  },

  {
    prompt:
      "A very useful tool used during development and debugging to printing content to the debugger is:",
    options: ["strings", "terminal/bash", "for loops", "console log"],
    answer: "variable",
  },
];

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  timerId = setInterval(countdown, 1000);
  timerEl.textContent = time;
  var startPageEl = document.getElementById("start-page");
  startPageEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion();
}

function countdown() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-display");
  promptEl.textContent = currentQuestion.prompt;
  optionEl.innerHTML = "";
  currentQuestion.options.forEach(function (option, i) {
    var optionBtn = document.createElement("button");
    optionBtn.setAttribute("value", option);
    optionBtn.textContent = i + 1 + ". " + option;
    optionBtn.onClick = QuestionClick;
    optionEl.appendChild(optionBtn);
  });
}

function QuestionClick() {}

function quizEnd() {}

function saveHighscore() {}

startBtn.onclick = startQuiz;
