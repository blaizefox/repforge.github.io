"use strict";


/* =========================
   MOBILE NAVIGATION
   ========================= */

const menuButton = document.getElementById("menu-button");
const mainNav = document.getElementById("main-nav");

if (menuButton && mainNav) {

    menuButton.addEventListener("click", function () {

        mainNav.classList.toggle("show");

        const menuIsOpen = mainNav.classList.contains("show");

        menuButton.setAttribute(
            "aria-expanded",
            menuIsOpen ? "true" : "false"
        );

    });

}


/* =========================
   WORKOUT TRACKER
   ========================= */

const workoutForm = document.getElementById("workout-form");
const clearButton = document.getElementById("clear-button");
const workoutHistory = document.getElementById("workout-history");
const emptyMessage = document.getElementById("empty-message");
const formMessage = document.getElementById("form-message");


let workouts = JSON.parse(
    localStorage.getItem("workouts")
) || [];


function displayWorkouts() {

    if (!workoutHistory) {
        return;
    }

    workoutHistory.innerHTML = "";


    if (workouts.length === 0) {

        const message = document.createElement("p");

        message.id = "empty-message";

        message.textContent = "No workouts recorded yet.";

        workoutHistory.appendChild(message);

        return;
    }


    workouts.forEach(function (workout, index) {

        const workoutEntry = document.createElement("article");

        workoutEntry.classList.add("workout-entry");


        const exerciseHeading = document.createElement("h3");

        exerciseHeading.textContent = workout.exercise;


        const dayParagraph = document.createElement("p");

        dayParagraph.classList.add("day");

        dayParagraph.textContent = workout.day;


        const setsParagraph = document.createElement("p");

        setsParagraph.innerHTML =
            "<strong>Sets:</strong> " +
            workout.sets;


        const repsParagraph = document.createElement("p");

        repsParagraph.innerHTML =
            "<strong>Reps:</strong> " +
            workout.reps;


        const weightParagraph = document.createElement("p");

        weightParagraph.innerHTML =
            "<strong>Weight:</strong> " +
            workout.weight +
            " LB";


        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.classList.add("delete-button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener(
            "click",
            function () {
                deleteWorkout(index);
            }
        );


        workoutEntry.appendChild(exerciseHeading);

        workoutEntry.appendChild(dayParagraph);

        workoutEntry.appendChild(setsParagraph);

        workoutEntry.appendChild(repsParagraph);

        workoutEntry.appendChild(weightParagraph);

        workoutEntry.appendChild(deleteButton);


        workoutHistory.appendChild(workoutEntry);

    });

}


if (workoutForm) {

    workoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const day =
                document.getElementById("training-day").value;

            const exercise =
                document.getElementById("exercise-name").value.trim();

            const sets =
                document.getElementById("sets").value;

            const reps =
                document.getElementById("reps").value;

            const weight =
                document.getElementById("weight").value;


            if (
                day === "" ||
                exercise === "" ||
                sets === "" ||
                reps === "" ||
                weight === ""
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please complete all fields before adding your workout.";

                }

                return;
            }


            const workout = {

                day: day,

                exercise: exercise,

                sets: sets,

                reps: reps,

                weight: weight

            };


            workouts.push(workout);


            localStorage.setItem(
                "workouts",
                JSON.stringify(workouts)
            );


            displayWorkouts();


            workoutForm.reset();


            if (formMessage) {

                formMessage.textContent =
                    "Workout added successfully.";

            }

        }
    );

}


if (clearButton) {

    clearButton.addEventListener(
        "click",
        function () {

            workoutForm.reset();

            if (formMessage) {

                formMessage.textContent = "";

            }

        }
    );

}


function deleteWorkout(index) {

    workouts.splice(index, 1);


    localStorage.setItem(
        "workouts",
        JSON.stringify(workouts)
    );


    displayWorkouts();

}


displayWorkouts();


/* =========================
   CONTACT FORM
   ========================= */

const contactForm =
    document.getElementById("contact-form");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("contact-name");

            const email =
                document.getElementById("contact-email");

            const message =
                document.getElementById("contact-message");


            const nameError =
                document.getElementById("name-error");

            const emailError =
                document.getElementById("email-error");

            const messageError =
                document.getElementById("message-error");

            const successMessage =
                document.getElementById("contact-success");


            nameError.textContent = "";

            emailError.textContent = "";

            messageError.textContent = "";

            successMessage.textContent = "";


            let valid = true;


            if (name.value.trim() === "") {

                nameError.textContent =
                    "Please enter your name.";

                valid = false;

            }


            if (!email.validity.valid) {

                emailError.textContent =
                    "Please enter a valid email address.";

                valid = false;

            }


            if (message.value.trim() === "") {

                messageError.textContent =
                    "Please enter a message.";

                valid = false;

            }


            if (!valid) {

                return;

            }


            successMessage.textContent =
                "Thank you! Your message has been submitted successfully.";


            contactForm.reset();

        }
    );

}
