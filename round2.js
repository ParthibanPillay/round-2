const questions = [
    {
      "question": "What does the 'T' in 'IoT' stand for?",
      "answers": [
        { "text": "Technology", "correct": false },
        { "text": "Things", "correct": true },
        { "text": "Transmission", "correct": false },
        { "text": "Telemetry", "correct": false }
      ]
    },
    {
      "question": "What is the primary function of an IoT device?",
      "answers": [
        { "text": "To display information on a screen", "correct": false },
        { "text": "To connect to the internet and collect data", "correct": true },
        { "text": "To run complex software programs", "correct": false },
        { "text": "To play music and videos", "correct": false }
      ]
    },
    {
      "question": "Which of the following is NOT a common application of IoT?",
      "answers": [
        { "text": "Smart homes", "correct": false },
        { "text": "Wearable fitness trackers", "correct": false },
        { "text": "Social media platforms", "correct": true },
        { "text": "Connected cars", "correct": false }
      ]
    },
    {
      "question": "What is the term used for the communication protocol that allows IoT devices to talk to each other?",
      "answers": [
        { "text": "TCP/IP", "correct": true },
        { "text": "HTTP", "correct": false },
        { "text": "Bluetooth", "correct": false },
        { "text": "USB", "correct": false }
      ]
    },
    {
      "question": "What is the main concern regarding the security of IoT devices?",
      "answers": [
        { "text": "Their limited processing power", "correct": false },
        { "text": "Their vulnerability to hacking", "correct": true },
        { "text": "Their high cost", "correct": false },
        { "text": "Their incompatibility with other devices", "correct": false }
      ]
    },
    {
      "question": "What is the difference between the cloud and the fog in the context of IoT?",
      "answers": [
        { "text": "There is no difference, they are the same thing", "correct": false },
        { "text": "The cloud is for storing data, while the fog is for processing data closer to the devices", "correct": true },
        { "text": "The cloud is for private data, while the fog is for public data", "correct": false },
        { "text": "The cloud is for large companies, while the fog is for small companies", "correct": false }
      ]
    },
    {
      "question": "What is the name of the standard for short-range wireless communication commonly used in IoT?",
      "answers": [
        { "text": "Wi-Fi", "correct": false },
        { "text": "Bluetooth", "correct": true },
        { "text": "Cellular", "correct": false },
        { "text": "Satellite", "correct": false }
      ]
    },
    {
      "question": "What is the potential benefit of using IoT in agriculture?",
      "answers": [
        { "text": "To provide entertainment for farmers", "correct": false },
        { "text": "To improve crop yields and resource management", "correct": true },
        { "text": "To connect farmers with social media platforms", "correct": false },
        { "text": "To replace farmers with robots", "correct": false }
      ]
    },
    {
      "question": "What is the ethical concern surrounding the use of IoT devices in our homes?",
      "answers": [
        { "text": "They can break easily", "correct": false },
        { "text": "They can be expensive to maintain", "correct": false },
        { "text": "They can collect data about our daily lives without our knowledge", "correct": true },
        { "text": "They can be difficult to set up", "correct": false }
      ]
    },
    {
      "question": "What is the term used for a network of interconnected devices that collect and share data?",
      "answers": [
        { "text": "Local Area Network (LAN)", "correct": false },
        { "text": "Wide Area Network (WAN)", "correct":false},
        { "text": "Internet of Things (IoT)", "correct":true},
        { "text": "Personal Area Network (PAN)", "correct":false}
      ]
      }
    ]
  

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startQuiz(){
    currentquestionindex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentquestion = questions[currentquestionindex];
    let questionNo = currentquestionindex + 1;
    questionElement.innerHTML = questionNo + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Next Round";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentquestionindex++;
    if(currentquestionindex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentquestionindex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();
