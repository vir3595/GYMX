document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const workoutPlannerScreen = document.getElementById("workout-planner-screen");
    const workoutPage = document.getElementById("workout-page");
    const progressPage = document.getElementById("progress-page");

    const startButton = document.getElementById("start-planning");
    const weekdayButtons = document.querySelectorAll(".day-btn");
    const backToMain = document.getElementById("back-main");
    const backToWeek = document.getElementById("back-week");
    const backToProgress = document.getElementById("back-progress");
    const progressButton = document.getElementById("weekly-progress");
    const homeToWorkout = document.getElementById("home-to-workout");

    const exerciseList = document.getElementById("exercise-list");
    const addExerciseButton = document.getElementById("add-exercise");
    const saveWorkoutButton = document.getElementById("save-workout");
    const notification = document.getElementById("notification");

    const workoutPlannerBtn = document.getElementById("workout-planner-btn");
    const homeBtn = document.getElementById("home-btn");
    const statsBtn = document.getElementById("stats-btn");

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};
    let currentDay = new Date().toLocaleString('en-us', { weekday: 'long' });

    // Show the desired screen
    function showScreen(screen) {
        // Hide all screens
        welcomeScreen.classList.add("hidden");
        homeScreen.classList.add("hidden");
        workoutPlannerScreen.classList.add("hidden");
        workoutPage.classList.add("hidden");
        progressPage.classList.add("hidden");

        // Show the selected screen
        screen.classList.remove("hidden");
    }

    // Welcome Screen -> Home Page transition
    startButton.addEventListener("click", () => {
        showScreen(homeScreen);
        loadTodaysWorkout();
    });

    // Home Page -> Workout Planner transition
    homeToWorkout.addEventListener("click", () => {
        showScreen(workoutPlannerScreen);
    });

    // Workout Planner to Workout Page transition
    weekdayButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedDay = button.dataset.day;
            document.getElementById("workout-day-title").textContent = `${selectedDay}'s Workout Plan`;
            loadExercises();
            showScreen(workoutPage);
        });
    });

    // Load Today's Workout on Home Screen
    function loadTodaysWorkout() {
        const todaysWorkout = workouts[currentDay] || [];
        let workoutText = "No workout scheduled for today.";
        if (todaysWorkout.length > 0) {
            workoutText = "Your workout for today: ";
            todaysWorkout.forEach(exercise => {
                workoutText += `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps, `;
            });
        }
        document.getElementById("todays-workout").textContent = workoutText;
    }

    // Load exercises for the selected day
    function loadExercises() {
        exerciseList.innerHTML = "";
        if (workouts[selectedDay]) {
            workouts[selectedDay].forEach((exercise, index) => {
                let li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight} kg`;
                exerciseList.appendChild(li);
            });
        }
    }

    // Add exercise
    addExerciseButton.addEventListener("click", () => {
        const name = document.getElementById("exercise-name").value;
        const sets = document.getElementById("exercise-sets").value;
        const reps = document.getElementById("exercise-reps").value;
        const weight = document.getElementById("exercise-weight").value;
        if (name && sets && reps && weight) {
            const exercise = { name, sets, reps, weight };
            if (!workouts[selectedDay]) {
                workouts[selectedDay] = [];
            }
            workouts[selectedDay].push(exercise);
            localStorage.setItem("workouts", JSON.stringify(workouts));
            loadExercises();
            showNotification("Exercise added!");
        }
    });

    // Save workout
    saveWorkoutButton.addEventListener("click", () => {
        showNotification("Workout saved!");
    });

    // Show notification
    function showNotification(message) {
        notification.textContent = message;
        notification.classList.remove("hidden");
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 2000);
    }

    // Back button functionality
    backToMain.addEventListener("click", () => showScreen(homeScreen));
    backToWeek.addEventListener("click", () => showScreen(workoutPlannerScreen));
    backToProgress.addEventListener("click", () => showScreen(progressPage));

    // Toggle menu buttons
    workoutPlannerBtn.addEventListener("click", () => {
        showScreen(workoutPlannerScreen);
    });
    homeBtn.addEventListener("click", () => {
        showScreen(homeScreen);
    });
    statsBtn.addEventListener("click", () => {
        showScreen(progressPage);
    });

    // Weekly progress page - simple view
    progressButton.addEventListener("click", () => {
        let progressHtml = "";
        for (let day in workouts) {
            progressHtml += `<li>${day}: ${workouts[day].length} exercises</li>`;
        }
        document.getElementById("progress-list").innerHTML = progressHtml;
        showScreen(progressPage);
    });

    // Start with the welcome screen
    showScreen(welcomeScreen);
});
