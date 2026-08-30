/* =====================================
   TASK 3 - JAVASCRIPT
===================================== */


/* =====================================
   PART 1
   INTERACTIVE QUIZ
===================================== */


/* Quiz Questions */

const questions = [

    {
        question: "Which language is used to structure a webpage?",

        answers: [
            "HTML",
            "CSS",
            "Python",
            "SQL"
        ],

        correct: "HTML"
    },


    {
        question: "Which language is mainly used for styling webpages?",

        answers: [
            "JavaScript",
            "CSS",
            "HTML",
            "Python"
        ],

        correct: "CSS"
    },


    {
        question: "Which language makes webpages interactive?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        correct: "JavaScript"
    },


    {
        question: "What does DOM stand for?",

        answers: [
            "Document Object Model",
            "Data Object Method",
            "Digital Online Model",
            "Document Online Method"
        ],

        correct: "Document Object Model"
    },


    {
        question: "Which method is commonly used to fetch API data?",

        answers: [
            "fetch()",
            "getData()",
            "loadAPI()",
            "requestData()"
        ],

        correct: "fetch()"
    }

];



/* =====================================
   QUIZ VARIABLES
===================================== */

let currentQuestion = 0;

let score = 0;


/* Get HTML elements */

const questionNumber =
    document.getElementById(
        "questionNumber"
    );


const questionText =
    document.getElementById(
        "question"
    );


const answerButtons =
    document.getElementById(
        "answerButtons"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );



/* =====================================
   LOAD QUESTION
===================================== */

function loadQuestion() {


    const current =
        questions[currentQuestion];


    /* Question number */

    questionNumber.textContent =
        currentQuestion + 1;


    /* Question text */

    questionText.textContent =
        current.question;


    /* Clear old answers */

    answerButtons.innerHTML = "";


    /* Clear result */

    quizResult.textContent = "";


    /* Create answer buttons */

    current.answers.forEach(
        function(answer) {


            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                answer;


            button.className =
                "answer-button";


            button.addEventListener(
                "click",
                function() {

                    checkAnswer(
                        answer,
                        button
                    );

                }
            );


            answerButtons.appendChild(
                button
            );

        }
    );

}



/* =====================================
   CHECK ANSWER
===================================== */

function checkAnswer(
    selectedAnswer,
    selectedButton
) {


    const current =
        questions[currentQuestion];


    /* Disable all answer buttons */

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );


    buttons.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    /* Check answer */

    if (
        selectedAnswer ===
        current.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );


        quizResult.textContent =
            "✅ Correct answer!";


        score++;


    } else {


        selectedButton.classList.add(
            "wrong"
        );


        quizResult.textContent =
            "❌ Wrong answer. Correct answer: "
            + current.correct;

    }

}



/* =====================================
   NEXT QUESTION
===================================== */

nextButton.addEventListener(
    "click",
    function() {


        currentQuestion++;


        /* Check if quiz is finished */

        if (
            currentQuestion >=
            questions.length
        ) {


            questionNumber.textContent =
                "✓";


            questionText.textContent =
                "Quiz Completed! 🎉";


            answerButtons.innerHTML =
                "";


            quizResult.textContent =
                "Your Score: "
                + score
                + " / "
                + questions.length;


            nextButton.textContent =
                "Restart Quiz";


            currentQuestion = -1;


        } else {


            loadQuestion();

        }

    }
);



/* =====================================
   RESTART QUIZ
===================================== */

nextButton.addEventListener(
    "click",
    function() {


        if (currentQuestion === -1) {

            currentQuestion = 0;

            score = 0;

            nextButton.textContent =
                "Next Question →";

            loadQuestion();

        }

    }
);



/* Load first question */

loadQuestion();



/* =====================================
   PART 2
   FETCH DATA FROM PUBLIC API
===================================== */


/* Get API elements */

const jokeButton =
    document.getElementById(
        "jokeButton"
    );


const jokeText =
    document.getElementById(
        "jokeText"
    );


const jokePunchline =
    document.getElementById(
        "jokePunchline"
    );


const apiStatus =
    document.getElementById(
        "apiStatus"
    );



/* =====================================
   FETCH JOKE
===================================== */

async function getJoke() {


    /* Show loading message */

    jokeText.textContent =
        "Loading a programming joke...";


    jokePunchline.textContent =
        "";


    apiStatus.textContent =
        "Fetching data from API...";


    try {


        /* Fetch data from public API */

        const response =
            await fetch(
                "https://official-joke-api.appspot.com/random_joke"
            );


        /* Check response */

        if (!response.ok) {

            throw new Error(
                "Unable to fetch joke"
            );

        }


        /* Convert response to JSON */

        const data =
            await response.json();


        /* Display joke */

        jokeText.textContent =
            data.setup;


        jokePunchline.textContent =
            "😂 " + data.punchline;


        apiStatus.textContent =
            "Data successfully fetched from public API.";


    }

    catch (error) {


        jokeText.textContent =
            "Sorry! Unable to load the joke.";


        jokePunchline.textContent =
            "";


        apiStatus.textContent =
            "Please check your internet connection.";

    }

}



/* =====================================
   API BUTTON
===================================== */

jokeButton.addEventListener(
    "click",
    getJoke
);