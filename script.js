const questions = [
    {
        question: "What is the capital of France?",
        answer: [
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false},
            {text: "Madrid", correct: false},
        ]
    },
    {
        question: "Which programming language is often used for font-end web development?",
        answer: [
            {text: "Java", correct: false},
            {text: "Python", correct: false},
            {text: "JavaScript", correct: true},
            {text: "C++", correct: false},
        ]
    },
    {
        question: "What does HTML stands for?",
        answer: [
            {text: "Hyperlink Text Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Home Tool Markup Language", correct: false},
            {text: "Hyper Transfer Markup Language", correct: false},
        ]
    },
    {
        question: "In CSS, what property is used to change the text color of an element?",
        answer: [
            {text: "Color", correct: true},
            {text: "Text-Color", correct: false},
            {text: "Font-Color", correct: false},
            {text: "textColor", correct: false},
        ]
    },
    {
        question: "Which of the following is not a JavaScript franwork or library?",
        answer: [
            {text: "Angular", correct: false},
            {text: "React", correct: false},
            {text: "Django", correct: true},
            {text: "Vue", correct: false},
        ]
    },
    {
        question: "What is the result of 2 + 2 * 3?",
        answer: [
            {text: "6", correct: false},
            {text: "8", correct: true},
            {text: "10", correct: false},
            {text: "12", correct: false},
        ]
    },
    {
        question: "Which method is used to puase the excution of a function for a specified number of miliseconds in JavaScript?",
        answer: [
            {text: "Pause()", correct: false},
            {text: "Sleep()", correct: false},
            {text: "delay()", correct: false},
            {text: "setTimeout()", correct: true},
        ]
    },
    {
        question: "What does the 'HTTP' acronym stands for in web development?",
        answer: [
            {text: "Hyper Text Transfer Protocol", correct: true},
            {text: "Hyper Text Transmission Protocol", correct: false},
            {text: "Hyper Text Transfer Process", correct: false},
            {text: "Hyper Text Transmission Process", correct: false},
        ]
    },
    {
        question: "What is the purpose of the 'alt' attribute in an HTML image tag?",
        answer: [
            {text: "Alternative text for the image", correct: true},
            {text: "Alignment for the image", correct: false},
            {text: "Assigning a link to the image", correct: false},
            {text: "Adding a border to the image", correct: false},
        ]
    },
    {
        question: "Which event is triggered when a user clicks on an HTML element?",
        answer: [
            {text: "mouseover", correct: true},
            {text: "click", correct: false},
            {text: "keypress", correct: false},
            {text: "scroll", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("inCorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();