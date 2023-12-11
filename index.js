const questions=[
    {
        question: "Which is largest animal in the World ?",
        answers:[
            {text: "Shark",correct: false},
            {text: "Blue Whale",correct: true},
            {text: "Elephant",correct: false},
            {text: "Giraffe",correct: false},

        ]
    },
    {
        question: "Which is smallest country in the World ?",
        answers:[
            {text: "Vatican City",correct: true},
            {text: "Bhutan",correct: false},
            {text: "Nepal",correct: false},
            {text: "SriLanka",correct: false},

        ]
    },
    {
        question: "Which is largest desert in the World ?",
        answers:[
            {text: "Kalahari",correct: false},
            {text: "Gobi",correct: false},
            {text: "Sahara",correct: false},
            {text: "Antarctica",correct: true},

        ]
    },
    {
        question: "Which is smallest continent in the World ?",
        answers:[
            {text: "Asia",correct: false},
            {text: "Australia",correct: true},
            {text: "Arctic",correct: false},
            {text: "Africa",correct: false},

        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextBtn=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;


    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }

        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextBtn.style.display="block";
}
nextBtn.addEventListener("click",function(){
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length} `;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}

startQuiz();