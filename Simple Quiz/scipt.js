//Questions..

const questions = [
  {
    question: "What is your course name, in which you are styding?",
    answer: [
      { text: "BCA", correct: "true" },
      { text: "B-Tech", correct: "false" },
      { text: "BBA", correct: "false" },
      { text: "B-Sc", correct: "false" },
    ],
  },

  {
    question: "What is your Dream Company to work for?",
    answer: [
      { text: "Google", correct: "true" },
      { text: "Microsoft", correct: "false" },
      { text: "TCS", correct: "false" },
      { text: "Cognizant", correct: "false" },
    ],
  },

  {
    question: "What is the name of your Collage?",
    answer: [
      { text: "SVIST", correct: "false" },
      { text: "GMIT", correct: "false" },
      { text: "SVIMS", correct: "true" },
      { text: "IIT-Kharagpore", correct: "false" },
    ],
  },

  {
    question: "In which job role are you targeted for?",
    answer: [
      { text: "Software-Eng", correct: "true" },
      { text: "Data-Analyst", correct: "false" },
      { text: "Ai-Engineer", correct: "false" },
      { text: "Team-Lead", correct: "false" },
    ],
  },
];

const questionBox = document.querySelector("#question");
const answerBoxes = document.querySelector(".answers");
const nextBtn = document.querySelector("#next-btn");
const eachScore = document.querySelector("#display-ans");

// const options = document.querySelector("#btn");

let currentQstnIdx = 0;
let score = 0;

function startQuiz() {
  currentQstnIdx = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  startDisplay();
}

function startDisplay() {
  resetState();
  let currentQstn = questions[currentQstnIdx];
  let questionNo = currentQstnIdx + 1;
  questionBox.innerHTML = questionNo + ". " + currentQstn.question;

  currentQstn.answer.forEach((ans) => {
    const button = document.createElement("button");
    button.innerHTML = ans.text;
    button.classList.add("btn");
    answerBoxes.appendChild(button);

    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }

    button.addEventListener("click", selectAns);
  });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBoxes.firstChild){
        answerBoxes.removeChild(answerBoxes.firstChild);
    }
}

function selectAns(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
    eachScore.innerText = `Score: Correct`

  } else {
    selectBtn.classList.add("incorrect");
    eachScore.innerText = `Score: inCorrect`
   
  }

  Array.from(answerBoxes.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextBtn.style.display = "block";
  eachScore.style.display = "block";

  
}

function showScore(){
    resetState();
    questionBox.innerHTML = `You have scored ${score} out of ${questions.length} questions!`;

}

function handleNextbtn() {
  currentQstnIdx++;
  if (currentQstnIdx < questions.length) {
    startDisplay();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
    eachScore.style.display = "none";
  if (currentQstnIdx < questions.length) {
    handleNextbtn();
  } else {
    startQuiz();
  }
});

startQuiz();
