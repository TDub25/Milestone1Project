const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is ESQD?',
        choice1: 'Explosives Security Quality Determination',
        choice2: 'Explosives Safety Quantity Distance',
        choice3: 'Explosion Safety Quality Distance',
        choice4: 'Exponential Security Query Determination',
        answer: 2,
    },
    {
        question: 'What is IMD?',
        choice1: 'Internal Magazine Distance',
        choice2: 'Immersive Munitions Determination',
        choice3: 'Intermagazine Distance',
        choice4: 'Intermediate Maintenance Division',
        answer: 3,
    },
    {
        question: 'What explosive hazard is 1.1?',
        choice1: 'Minor Fire',
        choice2: 'Fragmentation',
        choice3: 'Moderate Fire',
        choice4: 'Mass Explosion',
        answer: 4,
    },
    {
        question: 'What is a GBU-31?',
        choice1: '2,000lb JDAM',
        choice2: '1,000lb GBU',
        choice3: '2,000lb GBU',
        choice4: '500lb JDAM',
        answer: 1,
    },
    {
        question: 'What is an AIM-120?',
        choice1: 'Sidewinder Missile',
        choice2: 'Advanced Medium Range Air to Air Missile',
        choice3: 'High Speed Anti-Radiation Missile',
        choice4: 'Joint Standoff Weapon',
        answer: 2,
    },
    {
        question: 'What weapon(s) can an F-35B carry internally?',
        choice1: '2,000lb JDAM',
        choice2: 'AIM-120 AMRAAM',
        choice3: 'AIM-9 Sidewinder',
        choice4: 'A and B',
        answer: 2,
    },
    {
        question: 'What typically has Tritonal explosives?',
        choice1: 'USMC Bomb Bodies',
        choice2: 'USMC HIMARS',
        choice3: 'USN Torpedos',
        choice4: 'USMC Small Arms',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 7

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers =  true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()