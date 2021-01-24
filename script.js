// Dizi tanımla sorular dizisi
// Soru objesi olacak
//Sorular diziden random gelecek
//Next ile diğer soruya geçecek

var answerArray = [
    {
        question: "Türkiyenin En Güzel İli ?",
        answers: [
            { answer: 'Ankara' },
            { answer: 'Malatya' },
            { answer: 'Erzurum' },
            { answer: 'Muş' },
        ],
        realAnswer: { answer: "Malatya" }
    },
    {
        question: "Türkiyenin En Güzel İlçesi ?",
        answers: [
            { answer: 'Palandöken' },
            { answer: 'Kadıköy' },
            { answer: 'Hekimhan' },
            { answer: 'Yeşilyurt' },
        ],
        realAnswer: { answer: "Hekimhan" }
    },
    {
        question: "Türkiyenin En Güzel Üniversitesi ?",
        answers: [
            { answer: 'ODTÜ' },
            { answer: 'İTÜ' },
            { answer: 'İnönü' },
            { answer: 'Hekimhan MYO' },
        ],
        realAnswer: { answer: "İnönü" }
    }
]

let randomColor = [
    '#FF9801',
    '#673BB7',
    "#73A9B2",
    "#CAF7C4",
    "#02BEEC",
]

//getQuestionRandom
const getRandomQuestion = function () {
    const random = Math.floor(Math.random() * answerArray.length);
    let answer = answerArray[random];
    answerArray.splice(random, 1);
    return answer;
}

const confetiCreate = function () {
    const confetiContainer = document.querySelector(".confeti-container");
    let confeti;

    setInterval(() => {
        confeti = document.createElement("div");
        confeti.style.backgroundColor = randomColor[Math.floor(Math.random()) * randomColor]


        confeti.classList.add('confeti')
        confeti.style.left = Math.random() * 100 + "vw";
        confeti.style.animationDuration = Math.random() * 2 + 3 + "s"
        confeti.innerText = "\uD83D\uDC97";
    
        confetiContainer.appendChild(confeti)
     

    }, 300)

    setTimeout(() => {
        confeti.remove();
    }, 500)

}

const app = function () {

    const answers = document.querySelectorAll(".answer");
    const questionEl = document.querySelector(".question-el");
    const scoreText = document.querySelector(".score-text");
    const buttonEl = document.querySelector(".next-button");
    const noteEl = document.querySelector(".note")
    const popupContainer = document.querySelector(".popup-container");
    const reloadGame = document.querySelector(".reload-quiz")
    const confetiContainer = document.querySelector(".confeti-container")
    //getQuestionRandom Question
    let answer = getRandomQuestion();

    let questionNumber = 0;
    let correctAnswerSize = 0;
    let selectedAnswerEl = ""

    //Correct Control !!
    const checkCorrect = function (answerEl, gelenSoru) {
        const answer = answerEl.textContent;
        console.log(gelenSoru.realAnswer.answer + "--" + answer)
        if (answer == gelenSoru.realAnswer.answer) {
            correctAnswerSize++;
        }
    }

    answers.forEach(answer => {
        answer.addEventListener('click', () => {
            cleanAnswer();
            answer.classList.forEach(Class => {
                if (Class == "active") {
                    return answer.classList.remove("active");
                }
                answer.classList.add('active');
                selectedAnswerEl = answer;
            })
        })
    })

    //Click Button
    buttonEl.addEventListener('click', () => {
        checkCorrect(selectedAnswerEl, answer);
        answer = getRandomQuestion();
        if (answer != undefined) {
            cleanAnswer();
            questionNumber++;
            return loadDomAnswer(answer);;
        } else {
            //Finished Quiz
            noteEl.textContent = correctAnswerSize + " soru doğru yaptınız"
            popupContainer.classList.add("active");
            confetiContainer.classList.add("active")
            confetiCreate();
        }
    })
    //Reload Game
    reloadGame.addEventListener('click', () => {
        location.reload();
    })

    const cleanAnswer = function () {
        answers.forEach(answer => {
            answer.classList.forEach(Class => {
                if (Class == 'active') {
                    answer.classList.remove("active");
                }
            })
        })
    }

    //Load in DOM
    const loadDomAnswer = function (answer) {
        questionEl.textContent = answer.question;
        scoreText.textContent = answer.answers.length - 1 + "/" + correctAnswerSize;
        for (let index = 0; index < answer.answers.length; index++) {
            const element = answer.answers[index];
            answers[index].textContent = element.answer;

        }
    }
    //Load in DOM
    loadDomAnswer(answer);

}
app();