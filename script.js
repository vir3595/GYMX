document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const appScreen = document.getElementById("app");

    const homeScreen = document.getElementById("home-screen");
    const plannerScreen = document.getElementById("workout-planner");
    const workoutDayScreen = document.getElementById("workout-day");
    const statsScreen = document.getElementById("statistics-screen");

    const startButton = document.getElementById("start-button");
    const quickStartButton = document.getElementById("quick-start");

    const navPlanner = document.getElementById("nav-planner");
    const navHome = document.getElementById("nav-home");
    const navStats = document.getElementById("nav-stats");

    const weekdayButtons = document.querySelectorAll(".day-btn");
    const addExerciseButton = document.getElementById("add-exercise");
    const saveWorkoutButton = document.getElementById("save-workout");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};
    let streak = parseInt(localStorage.getItem("streak")) || 0;

    function showScreen(screen) {
        homeScreen.classList.add("hidden");
        plannerScreen.classList.add("hidden");
        workoutDayScreen.classList.add("hidden");
        statsScreen.classList.add("hidden");
        screen.classList.remove("hidden");
    }

    startButton.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        appScreen.classList.remove("hidden");
        showScreen(homeScreen);
    });

    quickStartButton.addEventListener("click", () => showScreen(workoutDayScreen));

    navPlanner.addEventListener("click", () => showScreen(plannerScreen));
    navHome.addEventListener("click", () => showScreen(homeScreen));
    navStats.addEventListener("click", () => {
        showScreen(statsScreen);
        document.getElementById("streak-count").textContent = streak;
    });

    weekdayButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.dataset.day;
            document.getElementById("workout-day-title").textContent = `${selectedDay}'s Workout`;
            showScreen(workoutDayScreen);
            loadExercises();
        });
    });

    addExerciseButton.addEventListener("click", () => {
        const category = document.getElementById("category").value;
        const name = document.getElementById("exercise-name").value;
        const sets = document.getElementById("exercise-sets").value;
        const reps = document.getElementById("exercise-reps").value;
        const weight = document.getElementById("exercise-weight").value;

        if (name && sets && reps && weight) {
            workouts[selectedDay] = workouts[selectedDay] || [];
            workouts[selectedDay].push({ category, name, sets, reps, weight });
            saveWorkouts();
            loadExercises();
        }
    });

    function saveWorkouts() {
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    function loadExercises() {
        const exerciseList = document.getElementById("exercise-list");
        exerciseList.innerHTML = "";
        if (workouts[selectedDay]) {
            workouts[selectedDay].forEach(ex => {
                let li = document.createElement("li");
                li.textContent = `${ex.category} - ${ex.name} - ${ex.sets}x${ex.reps} @ ${ex.weight}kg`;
                exerciseList.appendChild(li);
            });
        }
    }

    document.getElementById("streak-count").textContent = streak;
});
