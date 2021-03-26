var startButton = document.querySelector("#start");
var startQuiz = document.querySelector("main");
var timeEl = document.querySelector("#timeRemaining");
var seconds = 0;
var score = 0;
var secondsStart = 60;
var questionElement;
var answer;
var output;
var questionList;
var createButton;

// Questions that are asked
var questions = [
    { 
        ask : "What does Math.floor(x) do?",
        ans : ["generates a random number between 0-1", "rounds x up to the nearest integer", "rounds x down to the nearest integer", "starts a multiplication function"],
        correctAnswer : "rounds x down to the nearest integer"
    },

    {
        ask : "how do we check a variable in the console?",
        ans : ["console.log(var)", "console.var", "console= varlog", "fuction(log.var)"],
        correctAnswer : "console.log(var)"
    },

    {
        ask : "What HTML element do we include the JavaScript link?",
        ans : ["<javazcript>", "<script>", "<scripting>", "<js>"],
        correctAnswer : "<script>"
    },

    {
        ask : "How would we get a button to do something with a click?",
        ans : ["button.addEventListener('click')", "button.buttonclick(function)", "buttonClick= (function)", "button.addEventListener('click', function)"],
        correctAnswer : "button.addEventListener('click', function)"
    },

    {
        ask : "What symbols are used to wrap the contents of an array?",
        ans : ["(,)", "{,}", "[,]", "<,>"],
        correctAnswer : "[,]"
    }
];

// Starts the quiz and the timer
function start() {
  var questionIndex = 0;
  startTimer();

  questionElement = document.createElement("h2");
  answer = document.createElement("ol");
  output = document.createElement("p");
  askQuestions(questionIndex);
}

// Displays my questions
function askQuestions(questionIndex) {
  startQuiz.innerHTML = "";
  questionElement.innerHTML = "";
  answer.innerHTML = "";

  if (questionIndex >= questions.length || seconds <= 0) {
    clearInterval(interval);
    userScore();
    return;
  }
  questionElement.innerText = questions[questionIndex].ask;
  startQuiz.appendChild(questionElement);

  for (var i = 0; i < 4; i++) {

    questionList = document.createElement("li");
    questionList.setAttribute("data-index", i);

    createButton = document.createElement("button");
    createButton.textContent = questions[questionIndex].ans[i];
    questionList.appendChild(createButton);
    answer.appendChild(questionList);

  }

  startQuiz.appendChild(answer);
  outputDisplay = document.createElement("p");
  startQuiz.appendChild(outputDisplay);

  answer.addEventListener(
    "click",
    function (event) {
      event.preventDefault();
      var element = event.target;

      if (element.matches("button") === true) {
        var answer = element.textContent;
        if (answer === questions[questionIndex].correctAnswer) {
          outputDisplay.innerText = "Correct!";
          score++;
        } else {
          outputDisplay.innerText = "Wrong!";
          seconds -= 10;
        }

        questionIndex++;

        setTimeout(function () {
          askQuestions(questionIndex);
        }, 1000);
      }
    },
    { once: true }
  );
}

// Provides funcionality to the time remaining count
function startTimer() {
  seconds = secondsStart;
  interval = setInterval(function () {
    if (seconds > 0) {
      seconds--;
      changeTime();
    } else {
      clearInterval(interval);
      seconds = 0;
      changeTime();
      userScore();
    }
  }, 1000);
}

function changeTime() {
  timeEl.textContent = seconds;
}

function userScore() {
  startQuiz.innerHTML = "";

  var resultsH1 = document.createElement("h1");
  resultsH1.textContent = "Finished!";
  startQuiz.appendChild(resultsH1);

  var resultsP = document.createElement("p");
  var resultsBr = document.createElement("br");
  resultsP.textContent = "Your final score is: " + (score + seconds);
  startQuiz.appendChild(resultsP, resultsBr);

  var resultForm = document.createElement("FORM");
  var resultLabel = document.createElement("label");
  var resultInput = document.createElement("input");
  var resultBtn = document.createElement("button");
  resultForm.setAttribute("id", "rLabel");
  resultLabel.innerHTML = "Your Initials: ";
  resultInput.setAttribute("type", "text");
  resultInput.setAttribute("name", "initials");
  resultBtn.textContent = "Submit";
  resultBtn.setAttribute("id", "start");
  resultForm.appendChild(resultLabel);
  resultForm.appendChild(resultInput);
  startQuiz.appendChild(resultForm);
  startQuiz.appendChild(resultBtn);

  resultBtn.addEventListener("click", function (e) {
    e.preventDefault();

    var userInitials = resultInput.value;
    const initialObject = {
      initials: userInitials,
      score: (score + seconds),
    };

    if (localStorage.getItem("High-Scores") === null) {
      localStorage.setItem("High-Scores", JSON.stringify(initialObject));
    } else {
      var HighScoreEL = localStorage.getItem("High-Scores");
      var HighScoreObject = JSON.parse(HighScoreEL);
      var array = [];

      if (HighScoreObject.length) {
        HighScoreObject.map((item) => array.push(item));
      } else {
        array.push(HighScoreObject);
      }
      array.push(initialObject);
      savedString = JSON.stringify(array);
      localStorage.setItem("High-Scores", savedString);
    }
    window.location.href = "highScores.html";
  });
}
startButton.addEventListener("click", start);