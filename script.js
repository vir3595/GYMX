document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainMenu = document.getElementById("main-menu");
    const workoutPage = document.getElementById("workout-page");
    const progressPage = document.getElementById("progress-page");

    const startButton = document.getElementById("start-planning");
    const weekdayButtons = document.querySelectorAll(".day-btn");
    const backToMain = document.getElementById("back-main");
    const backToWeek = document.getElementById("back-week");
    const backToProgress = document.getElementById("back-progress");
    const progressButton = document.getElementById("weekly-progress");

    const exerciseList = document.getElementById("exercise-list");
    const addExerciseButton = document.getElementById("add-exercise");
    const saveWorkoutButton = document.getElementById("save-workout");
    const notification = document.getElementById("notification");

    const workoutPlannerBtn = document.getElementById("workout-planner-btn");
    const homeBtn = document.getElementById("home-btn");
    const statsBtn = document.getElementById("stats-btn");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

    function showScreen(screen) {
        // Hide all screens
        welcomeScreen.classList.add("hidden");
        mainMenu.classList.add("hidden");
        workoutPage.classList.add("hidden");
        progressPage.classList.add("hidden");
        
        // Show the selected screen
        screen.classList.remove("hidden");
    }

    startButton.addEventListener("click", () => {
        showScreen(mainMenu);
        loadRandomQuote();
    });

    backToMain.addEventListener("click", () => showScreen(mainMenu));
    backToWeek.addEventListener("click", () => showScreen(mainMenu));
    backToProgress.addEventListener("click", () => showScreen(mainMenu));

    progressButton.addEventListener("click", () => {
        showScreen(progressPage);
        const progressList = document.getElementById("progress-list");
        progressList.innerHTML = "";
        for (const day in workouts) {
            if (workouts[day].length > 0) {
                let li = document.createElement("li");
                li.textContent = `${day}: ${workouts[day].length} exercises`;
                progressList.appendChild(li);
            }
        }
    });

    weekdayButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.dataset.day;
            document.getElementById("workout-day-title").textContent = `${selectedDay}'s Workout Plan`;
            loadExercises();
            showScreen(workoutPage);
        });
    });

    function loadExercises() {
        exerciseList.innerHTML = "";
        if (workouts[selectedDay]) {
            workouts[selectedDay].forEach((exercise, index) => {
                let li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight}
