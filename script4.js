/* =====================================
   TASK 4 - JAVASCRIPT
===================================== */


/* =====================================
   PART 1
   DARK / LIGHT MODE
===================================== */

const themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");


        if (
            document.body.classList.contains("dark")
        ) {

            themeButton.textContent = "☀️";

            localStorage.setItem(
                "portfolioTheme",
                "dark"
            );

        }

        else {

            themeButton.textContent = "🌙";

            localStorage.setItem(
                "portfolioTheme",
                "light"
            );

        }

    }
);


/* Load saved theme */

const savedTheme =
    localStorage.getItem("portfolioTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}



/* =====================================
   PART 2
   TO-DO LIST WITH LOCAL STORAGE
===================================== */


/* Get elements */

const taskInput =
    document.getElementById("taskInput");


const addTaskButton =
    document.getElementById(
        "addTaskButton"
    );


const taskList =
    document.getElementById("taskList");


const emptyTaskMessage =
    document.getElementById(
        "emptyTaskMessage"
    );


/* Get saved tasks */

let tasks =
    JSON.parse(
        localStorage.getItem("aksharaTasks")
    ) || [];


/* Display tasks */

displayTasks();



/* =====================================
   ADD TASK
===================================== */

function addTask() {


    const task =
        taskInput.value.trim();


    if (task === "") {

        alert(
            "Please enter a task."
        );

        return;

    }


    /* Add task to array */

    tasks.push({

        text: task,

        completed: false

    });


    /* Save tasks */

    saveTasks();


    /* Display */

    displayTasks();


    /* Clear input */

    taskInput.value = "";

    taskInput.focus();

}



/* =====================================
   SAVE TASKS
===================================== */

function saveTasks() {

    localStorage.setItem(
        "aksharaTasks",
        JSON.stringify(tasks)
    );

}



/* =====================================
   DISPLAY TASKS
===================================== */

function displayTasks() {


    /* Clear old list */

    taskList.innerHTML = "";


    /* Empty list */

    if (tasks.length === 0) {

        emptyTaskMessage.style.display =
            "block";

        return;

    }


    emptyTaskMessage.style.display =
        "none";


    /* Create each task */

    tasks.forEach(
        function(task, index) {


            const listItem =
                document.createElement("li");


            listItem.className =
                "todo-item";


            /* Task name */

            const taskName =
                document.createElement("span");


            taskName.className =
                "task-name";


            taskName.textContent =
                task.text;


            if (task.completed) {

                taskName.classList.add(
                    "completed"
                );

            }


            /* Buttons */

            const actions =
                document.createElement("div");


            actions.className =
                "todo-actions";


            /* Done button */

            const doneButton =
                document.createElement("button");


            doneButton.className =
                "done-task";


            doneButton.textContent =
                task.completed
                    ? "Undo"
                    : "Done";


            doneButton.addEventListener(
                "click",
                function () {

                    tasks[index].completed =
                        !tasks[index].completed;


                    saveTasks();

                    displayTasks();

                }
            );


            /* Delete button */

            const deleteButton =
                document.createElement("button");


            deleteButton.className =
                "delete-task";


            deleteButton.textContent =
                "Delete";


            deleteButton.addEventListener(
                "click",
                function () {

                    tasks.splice(
                        index,
                        1
                    );


                    saveTasks();

                    displayTasks();

                }
            );


            /* Add buttons */

            actions.appendChild(
                doneButton
            );


            actions.appendChild(
                deleteButton
            );


            /* Add content */

            listItem.appendChild(
                taskName
            );


            listItem.appendChild(
                actions
            );


            /* Add to list */

            taskList.appendChild(
                listItem
            );

        }
    );

}



/* Add task button */

addTaskButton.addEventListener(
    "click",
    addTask
);


/* Enter key */

taskInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);



/* =====================================
   PART 3
   PRODUCT LISTING
===================================== */


/* Product data */

const products = [

    {
        name: "Smart Laptop",
        category: "laptop",
        price: 45000,
        rating: 4.8,
        icon: "💻",
        description:
            "Powerful laptop for coding and study."
    },


    {
        name: "Student Laptop",
        category: "laptop",
        price: 32000,
        rating: 4.5,
        icon: "💻",
        description:
            "Affordable laptop for students."
    },


    {
        name: "Pro Smartphone",
        category: "phone",
        price: 28000,
        rating: 4.7,
        icon: "📱",
        description:
            "Modern smartphone with powerful features."
    },


    {
        name: "Budget Smartphone",
        category: "phone",
        price: 12000,
        rating: 4.2,
        icon: "📱",
        description:
            "Reliable smartphone at an affordable price."
    },


    {
        name: "Wireless Headphones",
        category: "accessory",
        price: 1800,
        rating: 4.6,
        icon: "🎧",
        description:
            "Comfortable headphones with clear sound."
    },


    {
        name: "Wireless Mouse",
        category: "accessory",
        price: 700,
        rating: 4.3,
        icon: "🖱️",
        description:
            "Smooth and comfortable wireless mouse."
    },


    {
        name: "Mechanical Keyboard",
        category: "accessory",
        price: 2500,
        rating: 4.7,
        icon: "⌨️",
        description:
            "Mechanical keyboard for productive work."
    },


    {
        name: "Smart Tablet",
        category: "phone",
        price: 22000,
        rating: 4.4,
        icon: "📲",
        description:
            "Portable tablet for study and entertainment."
    }

];



/* Get filter elements */

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const priceFilter =
    document.getElementById(
        "priceFilter"
    );


const sortProducts =
    document.getElementById(
        "sortProducts"
    );


const productGrid =
    document.getElementById(
        "productGrid"
    );


const productCount =
    document.getElementById(
        "productCount"
    );



/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts() {


    /* Get selected filters */

    const category =
        categoryFilter.value;


    const maxPrice =
        priceFilter.value;


    const sort =
        sortProducts.value;


    /* Filter products */

    let filteredProducts =
        products.filter(
            function(product) {


                const categoryMatch =
                    category === "all" ||
                    product.category === category;


                const priceMatch =
                    maxPrice === "all" ||
                    product.price <=
                    Number(maxPrice);


                return (
                    categoryMatch &&
                    priceMatch
                );

            }
        );


    /* =================================
       SORT PRODUCTS
    ================================= */

    if (sort === "ratingHigh") {

        filteredProducts.sort(
            function(a, b) {

                return b.rating - a.rating;

            }
        );

    }


    else if (sort === "priceLow") {

        filteredProducts.sort(
            function(a, b) {

                return a.price - b.price;

            }
        );

    }


    else if (sort === "priceHigh") {

        filteredProducts.sort(
            function(a, b) {

                return b.price - a.price;

            }
        );

    }


    else if (sort === "name") {

        filteredProducts.sort(
            function(a, b) {

                return a.name.localeCompare(
                    b.name
                );

            }
        );

    }



    /* Clear product grid */

    productGrid.innerHTML = "";


    /* Product count */

    productCount.textContent =
        filteredProducts.length +
        " product(s) found";


    /* No products */

    if (
        filteredProducts.length === 0
    ) {

        productGrid.innerHTML =
            "<p>No products found.</p>";

        return;

    }


    /* Create product cards */

    filteredProducts.forEach(
        function(product) {


            const card =
                document.createElement("div");


            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">
                    ${product.icon}
                </div>

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </span>

                    <span class="rating">
                        ★ ${product.rating}
                    </span>

                </div>

            `;


            productGrid.appendChild(
                card
            );

        }
    );

}



/* =====================================
   FILTER EVENTS
===================================== */

categoryFilter.addEventListener(
    "change",
    displayProducts
);


priceFilter.addEventListener(
    "change",
    displayProducts
);


sortProducts.addEventListener(
    "change",
    displayProducts
);


/* Display products when page loads */

displayProducts();