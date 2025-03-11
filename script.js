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

    const notification = document.createElement('div');
    notification.id = 'notification';
    document.body.appendChild(notification);

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

    function showScreen(screen) {
        welcomeScreen.classList.add("hidden");
        mainMenu.classList.add("hidden");
        workoutPage.classList.add("hidden");
        progressPage.classList.add("hidden");
        screen.classList.remove("hidden");
    }

    startButton.addEventListener("click", () => showScreen(mainMenu));
    backToMain.addEventListener("click", () => showScreen(mainMenu));
    backToWeek.addEventListener("click", () => showScreen(mainMenu));
    backToProgress.addEventListener("click", () => showScreen(mainMenu));

    progressButton.addEventListener("click", () => {
        showScreen(progressPage);
        const progressList = document.getElementById("progress-list");
        progressList.innerHTML = "";
        for (const day in workouts) {
            let li = document.createElement("li");
            li.textContent = `${day}: ${workouts[day].length} exercises`;
            progressList.appendChild(li);
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
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps @ ${exercise.weight}kg`;
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "❌";
                deleteBtn.onclick = () => {
                    workouts[selectedDay].splice(index, 1);
                    localStorage.setItem("workouts", JSON.stringify(workouts));
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
            if (!workouts[selectedDay]) workouts[selectedDay] = [];
            workouts[selectedDay].push({ name, sets, reps, weight });
            localStorage.setItem("workouts", JSON.stringify(workouts));
            loadExercises();
            showNotification("Exercise Added!");
        }
    });

    saveWorkoutButton.addEventListener("click", () => {
        showNotification("Workout Saved!");
    });

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.remove("hidden");
        setTimeout(() => notification.classList.add("show"), 10);
        setTimeout(() => notification.classList.remove("show"), 3000);
    }

    // Function to load random quote for the welcome screen
    function loadRandomQuote() {
        const quotes = ["Push yourself!", "No pain, no gain!", "Stay consistent!", "Train insane!"];
        document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    loadRandomQuote();
});
