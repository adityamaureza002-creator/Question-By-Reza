const questions = [
    {
        question: "Indonesia Merdeka Pada Tahun?",
        answer: [ 
            { text: "1977", correct: false },
            { text: "1986", correct: false },
            { text: "1922", correct: false },
            { text: "1945", correct: true },
        ]
    },
    {
        question: "Apa Warna Bendera Indonesia?",
        answer: [ 
            { text: "Merah Kuning Hijau", correct: false },
            { text: "Biru Putih", correct: false },
            { text: "Merah Putih", correct: true },
            { text: "Hijau Pagar Nusa", correct: false },
        ]
    },
    {
        question: "Presiden Pertama Indonesia?",
        answer: [ 
            { text: "Reza", correct: false },
            { text: "Soekarno", correct: true },
            { text: "Jendral Sudirman", correct: false },
            { text: "Soeharto", correct: false },
        ]
    },
    {
        question: "Presiden Ke 8 Indonesia?",
        answer: [ 
            { text: "Bj Habibie", correct: false },
            { text: "Gus Dur", correct: false },
            { text: "Susilo Bambang Yudhoyono", correct: false },
            { text: "Prabowo", correct: true },
        ]
    },
    {
        question: "Pencak Silat Indonesia Yang Di Ikuti Reza?",
        answer: [ 
            { text: "PSHT 1922", correct: false },
            { text: "PAGAR NUSA 1986", correct: true },
            { text: "PSHW 1903", correct: false },
            { text: "IKSPI 1980", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

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

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Skor kamu ${score} dari ${questions.length}!`;
    nextButton.innerHTML = "Main Lagi";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();