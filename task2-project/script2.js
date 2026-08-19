/* =====================================
   TASK 2 - JAVASCRIPT
===================================== */


/* =====================================
   PART 1
   CONTACT FORM VALIDATION
===================================== */


/* Get the form */

const contactForm =
    document.getElementById("contactForm");


/* When the form is submitted */

contactForm.addEventListener("submit", function(event) {


    /* Prevent page from refreshing */

    event.preventDefault();


    /* Get values from form */

    const name =
        document.getElementById("name").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const subject =
        document.getElementById("subject").value.trim();


    const message =
        document.getElementById("message").value.trim();


    /* Get error message areas */

    const nameError =
        document.getElementById("nameError");


    const emailError =
        document.getElementById("emailError");


    const subjectError =
        document.getElementById("subjectError");


    const messageError =
        document.getElementById("messageError");


    const successMessage =
        document.getElementById("successMessage");


    /* Clear previous messages */

    nameError.textContent = "";

    emailError.textContent = "";

    subjectError.textContent = "";

    messageError.textContent = "";

    successMessage.textContent = "";


    /* Variable to check form */

    let isValid = true;



    /* =================================
       CHECK NAME
    ================================= */

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;

    }



    /* =================================
       CHECK EMAIL
    ================================= */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    }

    else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;

    }



    /* =================================
       CHECK SUBJECT
    ================================= */

    if (subject === "") {

        subjectError.textContent =
            "Please enter a subject.";

        isValid = false;

    }



    /* =================================
       CHECK MESSAGE
    ================================= */

    if (message === "") {

        messageError.textContent =
            "Please enter your message.";

        isValid = false;

    }



    /* =================================
       IF EVERYTHING IS CORRECT
    ================================= */

    if (isValid) {

        successMessage.textContent =
            "✅ Form submitted successfully!";


        alert(
            "Thank you, " +
            name +
            "! Your form has been submitted."
        );


        /* Clear the form */

        contactForm.reset();

    }

});



/* =====================================
   PART 2
   DYNAMIC TO-DO LIST
===================================== */


/* Get HTML elements */

const todoInput =
    document.getElementById("todoInput");


const addButton =
    document.getElementById("addButton");


const todoList =
    document.getElementById("todoList");



/* =====================================
   FUNCTION TO ADD TASK
===================================== */

function addTask() {


    /* Get task */

    const task =
        todoInput.value.trim();


    /* Check if empty */

    if (task === "") {

        alert(
            "Please enter a task first!"
        );

        return;

    }


    /* Remove empty message */

    const emptyMessage =
        document.querySelector(".empty-message");


    if (emptyMessage) {

        emptyMessage.remove();

    }


    /* Create new list item */

    const listItem =
        document.createElement("li");


    listItem.className =
        "todo-item";


    /* Create task text */

    const taskText =
        document.createElement("span");


    taskText.className =
        "task-text";


    taskText.textContent =
        task;



    /* =================================
       CREATE BUTTON CONTAINER
    ================================= */

    const taskButtons =
        document.createElement("div");


    taskButtons.className =
        "task-buttons";



    /* =================================
       DONE BUTTON
    ================================= */

    const doneButton =
        document.createElement("button");


    doneButton.textContent =
        "Done";


    doneButton.className =
        "done-button";


    doneButton.addEventListener(
        "click",
        function() {

            taskText.classList.toggle(
                "completed"
            );

        }
    );



    /* =================================
       DELETE BUTTON
    ================================= */

    const deleteButton =
        document.createElement("button");


    deleteButton.textContent =
        "Delete";


    deleteButton.className =
        "delete-button";


    deleteButton.addEventListener(
        "click",
        function() {


            /* Remove task */

            listItem.remove();


            /* Check if list is empty */

            if (todoList.children.length === 0) {

                showEmptyMessage();

            }

        }
    );



    /* =================================
       ADD BUTTONS
    ================================= */

    taskButtons.appendChild(
        doneButton
    );


    taskButtons.appendChild(
        deleteButton
    );



    /* =================================
       ADD CONTENT TO LIST ITEM
    ================================= */

    listItem.appendChild(
        taskText
    );


    listItem.appendChild(
        taskButtons
    );



    /* =================================
       ADD LIST ITEM TO LIST
    ================================= */

    todoList.appendChild(
        listItem
    );


    /* Clear input */

    todoInput.value = "";


    /* Put cursor in input */

    todoInput.focus();

}



/* =====================================
   ADD TASK BUTTON
===================================== */

addButton.addEventListener(
    "click",
    addTask
);



/* =====================================
   ENTER KEY
===================================== */

todoInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);



/* =====================================
   SHOW EMPTY MESSAGE
===================================== */

function showEmptyMessage() {


    const empty =
        document.createElement("li");


    empty.className =
        "empty-message";


    empty.textContent =
        "No tasks added yet.";


    todoList.appendChild(
        empty
    );

}