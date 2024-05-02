// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var optionEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");

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
    answer: "console log",
  },
];

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  timerId = setInterval(countdown, 1000); // Start timer
  timerEl.textContent = time; // Display initial time
  var startPageEl = document.getElementById("start-page");
  startPageEl.setAttribute("class", "hide"); // Hide start page
  questionsEl.removeAttribute("class"); // Show questions
  getQuestion(); // Load first question
}

function countdown() {
  time--; // Decrement time
  timerEl.textContent = time; // Update displayed time
  if (time <= 0) {
    quizEnd(); // End quiz if time is up
  }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex]; // Get current question object
  var promptEl = document.getElementById("question-display"); // Get question display element
  promptEl.textContent = currentQuestion.prompt; // Display question prompt
  optionEl.innerHTML = ""; // Clear previous options
  // Create option buttons for each option
  currentQuestion.options.forEach(function (option, i) {
    var optionBtn = document.createElement("button");
    optionBtn.setAttribute("value", option);
    optionBtn.textContent = i + 1 + ". " + option;
    optionBtn.addEventListener("click", questionClick); // Add event listener for option click
    optionEl.appendChild(optionBtn); // Append option button to options element
  });
}

function questionClick() {
  // Check if selected option is correct
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10; // Deduct time for wrong answer
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time; // Update displayed time
    feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = "grey"; // Display feedback for wrong answer
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "grey"; // Display feedback for correct answer
  }
  feedbackEl.setAttribute("class", "feedback"); // Show feedback element
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide"); // Hide feedback after 2.5 seconds
  }, 2500);
  currentQuestionIndex++; // Move to next question
  if (currentQuestionIndex === questions.length) {
    quizEnd(); // End quiz if all questions have been answered
  } else {
    getQuestion(); // Load next question
  }
}

function quizEnd() {
  clearInterval(timerId);
  var endPageEl = document.getElementById("quiz-end");
  endPageEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

function saveHighscore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      name: name,
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}

submitBtn.addEventListener("click", saveHighscore);
startBtn.addEventListener("click", startQuiz);
