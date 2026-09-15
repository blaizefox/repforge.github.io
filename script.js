const workoutForm = document.getElementById("workout-form");
const clearButton = document.getElementById("clear-button");
const workoutHistory = document.getElementById("workout-history");
const emptyMessage = document.getElementById("empty-message");

let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function displayWorkouts() {

    workoutHistory.innerHTML = "";

    if (workouts.length === 0) {
        workoutHistory.appendChild(emptyMessage);
        return;
    }

    workouts.forEach(function(workout, index) {

        const workoutEntry = document.createElement("div");
        workoutEntry.classList.add("workout-entry");

        workoutEntry.innerHTML = `
            <h3>${workout.exercise}</h3>
            <p class="day">${workout.day}</p>
            <p><strong>Sets:</strong> ${workout.sets}</p>
            <p><strong>Reps:</strong> ${workout.reps}</p>
            <p><strong>Weight:</strong> ${workout.weight} LB</p>

            <button
                class="delete-button"
                onclick="deleteWorkout(${index})">
                Delete
            </button>
        `;

        workoutHistory.appendChild(workoutEntry);
    });
}

workoutForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const day = document.getElementById("training-day").value;
    const exercise = document.getElementById("exercise-name").value;
    const sets = document.getElementById("sets").value;
    const reps = document.getElementById("reps").value;
    const weight = document.getElementById("weight").value;

    const workout = {
        day: day,
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight
    };

    workouts.push(workout);

    localStorage.setItem("workouts", JSON.stringify(workouts));

    displayWorkouts();

    workoutForm.reset();
});

clearButton.addEventListener("click", function() {
    workoutForm.reset();
});

function deleteWorkout(index) {

    workouts.splice(index, 1);

    localStorage.setItem("workouts", JSON.stringify(workouts));

    displayWorkouts();
}

displayWorkouts();
