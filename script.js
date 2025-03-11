document.addEventListener("DOMContentLoaded", () => {
    // Screens
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const workoutPlanner = document.getElementById("workout-planner");
    const workoutDayScreen = document.getElementById("workout-day-screen");
    const statisticsScreen = document.getElementById("statistics-screen");

    // Buttons
    const startButton = document.getElementById("start-btn");
    const goToPlanner = document.getElementById("go-to-planner");
    const goToStats = document.getElementById("go-to-stats");
    const backToHome = document.getElementById("back-to-home");
    const backToHome2 = document.getElementById("back-to-home-2");
    const backToPlanner = document.getElementById("back-to-planner");

    const weekdayButtons = document.querySelectorAll(".day-btn");
    const addExerciseButton = document.getElementById("add-exercise");
    const saveWorkoutButton = document.getElementById("save-workout");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

    function showScreen(screen) {
        welcomeScreen.classList.add("hidden");
        homeScreen.classList.add("hidden");
        workoutPlanner.classList.add("hidden");
        workoutDayScreen.classList.add("hidden");
        statisticsScreen.classList.add("hidden");
        screen.classList.remove("hidden");
    }

    // Navigation
    startButton.addEventListener("click", () => showScreen(homeScreen));
    goToPlanner.addEventListener("click", () => showScreen(workoutPlanner));
    goToStats.addEventListener("click", () => showScreen(statisticsScreen));
    backToHome.addEventListener("click", () => showScreen(homeScreen));
    backToHome2.addEventListener("click", () => showScreen(homeScreen));
    backToPlanner.addEventListener("click", () => showScreen(workoutPlanner));

    weekdayButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.dataset.day;
            document.getElementById("day-title").textContent = `${selectedDay}'s Workout`;
            loadExercises();
            showScreen(workoutDayScreen);
        });
    });

    function loadExercises() {
        const exerciseList = document.getElementById("exercise-list");
        exerciseList.innerHTML = "";
        if (workouts[selectedDay]) {
            workouts[selectedDay].forEach((exercise, index) => {
                let li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight}kg`;
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌";
                deleteBtn.onclick = () => {
                    workouts[selectedDay].splice(index, 1);
                    saveWorkouts();
                    loadExercises();
                };
                li.appendChild(deleteBtn);
                exerciseList.appendChild(li);
            });
        }
    }

    addExerciseButton.addEventListener("click", () => {
        const name = document.getElementById("exercise-name").value;
        const sets = document.getElementById("exercise-sets").value;
        const reps = document.getElementById("exercise-reps").value;
        const weight = document.getElementById("exercise-weight").value;

        if (name && sets && reps && weight) {
            workouts[selectedDay] = workouts[selectedDay] || [];
            workouts[selectedDay].push({ name, sets, reps, weight });
            saveWorkouts();
            loadExercises();
        }
    });

    function saveWorkouts() {
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    function loadRandomQuote() {
        const quotes = ["Push yourself!", "No pain, no gain!", "Stay consistent!", "Train insane!"];
        document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    loadRandomQuote();
});
