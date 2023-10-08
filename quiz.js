const questions = [
    {
        question: "What is capital of India?",
        answers: [
            { text: "Ahmedabad", correct: false },
            { text: "Mumbai", correct: false },
            { text: "Chennai", correct: false },
            { text: "Delhi", correct: true },
        ]
    },
    {
        question: "what is capital of Gujarat?",
        answers: [
            { text: "Gandhinagar", correct: true },
            { text: "vadodara", correct: false },
            { text: "rajkot", correct: false },
            { text: "surat", correct: false },
        ]
    },
    {
        question: "what is the biggest district of Gujarat?",
        answers: [
            { text: "rajkot", correct: false },
            { text: "Kutchh", correct: true },
            { text: "Banaskanth", correct: false },
            { text: "Sabarkantha", correct: false },
        ]
    },
    {
        question: "what is the capital of Maharastra?",
        answers: [
            { text: "Pune", correct: false },
            { text: "Bhopal", correct: false },
            { text: "Mumbai", correct: true },
            { text: "Ahmedabad", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz() ;