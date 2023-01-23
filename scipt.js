var start = document.querySelector("start");
var quiz = document.querySelector("quiz");
var question = document.querySelector("question");
var qImg = document.querySelector("qImg");
var choiceA = document.querySelector("A");
var choiceB = document.querySelector("B");
var choiceC = document.querySelector("C");
var counter = document.querySelector("counter");
var timeGauge = document.querySelector("timeGauge");
var progress = document.querySelector("progress");
var scoreDiv = document.querySelector("scoreContainer");


let questions = [
    {
        question : "What is the code for the largest text  for a h tag?",
        imgSrc : "img/html.png",
        choiceA : "h1",
        choiceB : "h3",
        choiceC : "h6",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        imgSrc : "img/css.png",
        choiceA : "car is silver ",
        choiceB : "Cascading Style Sheets",
        choiceC : "Sheets Style Cascading",
        correct : "B"
    },{
        question : "What does JS stand for?",
        imgSrc : "img/js.png",
        choiceA : "just sayin",
        choiceB : "a ",
        choiceC : "JavaScript",
        correct : "C"
    }
];


// create some variables

var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
var questionTime = 20; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}






