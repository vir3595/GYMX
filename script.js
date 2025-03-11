document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const workoutPlannerScreen = document.getElementById("workout-planner-screen");
    const statsScreen = document.getElementById("stats-screen");
    const navButtons = document.getElementById("nav-buttons");

    const startButton = document.getElementById("start-planning");
    const weekdayButtons = document.querySelectorAll(".day-btn");
    const goToWorkoutPlannerButton = document.getElementById("go-to-workout-planner");

    const progressList = document.getElementById("progress-list");
    const todaysWorkoutList = document.getElementById("todays-workout-list");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

    // Show specific screen
    function showScreen(screen) {
        welcomeScreen.classList.remove("active");
        homeScreen.classList.remove("active");
        workoutPlannerScreen.classList.remove("active");
        statsScreen.classList.remove("active");
        
        screen.classList.add("active");
    }

    // Welcome screen -> Home screen
    startButton.addEventListener("click", () => {
        showScreen(homeScreen);
        loadTodaysWorkout();
    });

    // Show the selected workout day screen
    weekdayButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.dataset.day;
            loadExercises();
            showScreen(workoutPlannerScreen);
        });
    });

    // Load today's workout
    function loadTodaysWorkout() {
        todaysWorkoutList.innerHTML = "";
        const today = new Date().toLocaleString("en-us", { weekday: "long" });
        if (workouts[today]) {
            workouts[today].forEach(exercise => {
                let li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight}kg`;
                todaysWorkoutList.appendChild(li);
            });
        } else {
            todaysWorkoutList.innerHTML = "<li>No workout planned for today.</li>";
        }
    }

    // Load exercises for selected day
    function loadExercises() {
        // For now, just log the selected day. This can be enhanced to show detailed exercises later
        console.log(`Exercises for ${selectedDay}:`, workouts[selectedDay]);
    }

    // Show stats screen
    function loadStats() {
        progressList.innerHTML = "";
        for (const day in workouts) {
            if (workouts[day].length > 0) {
                let li = document.createElement("li");
                li.textContent = `${day}: ${workouts[day].length} exercises`;
                progressList.appendChild(li);
            }
        }
    }

    // Navigation button click handlers
    document.getElementById("home-btn").addEventListener("click", () => {
        showScreen(homeScreen);
        loadTodaysWorkout();
    });

    document.getElementById("workout-planner-btn").addEventListener("click", () => {
        showScreen(workoutPlannerScreen);
    });

    document.getElementById("stats-btn").addEventListener("click", () => {
        showScreen(statsScreen);
        loadStats();
    });
});
