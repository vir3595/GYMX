document.addEventListener("DOMContentLoaded", () => {
    const screens = {
        welcome: document.getElementById("welcome-screen"),
        home: document.getElementById("home-screen"),
        planner: document.getElementById("planner-screen"),
        workout: document.getElementById("workout-screen"),
        stats: document.getElementById("stats-screen"),
    };

    const buttons = {
        start: document.getElementById("start-planning"),
        navPlanner: document.getElementById("nav-planner"),
        navHome: document.getElementById("nav-home"),
        navStats: document.getElementById("nav-stats"),
        addExercise: document.getElementById("add-exercise"),
        saveWorkout: document.getElementById("save-workout"),
    };

    const inputs = {
        exerciseName: document.getElementById("exercise-name"),
        exerciseSets: document.getElementById("exercise-sets"),
        exerciseReps: document.getElementById("exercise-reps"),
        exerciseWeight: document.getElementById("exercise-weight"),
    };

    const lists = {
        weekday: document.getElementById("weekday-list"),
        exercise: document.getElementById("exercise-list"),
        todayWorkout: document.getElementById("today-workout-list"),
        stats: document.getElementById("stats-list"),
    };

    let selectedDay = "";
    let workouts = JSON.parse(localStorage.getItem("workouts")) || {};

    function showScreen(screen) {
        Object.values(screens).forEach(s => s.classList.add("hidden"));
        screens[screen].classList.remove("hidden");
    }

    buttons.start.addEventListener("click", () => showScreen("home"));
    buttons.navPlanner.addEventListener("click", () => showScreen("planner"));
    buttons.navHome.addEventListener("click", () => showScreen("home"));
    buttons.navStats.addEventListener("click", () => showScreen("stats"));

    lists.weekday.addEventListener("click", (event) => {
        if (event.target.classList.contains("day-btn")) {
            selectedDay = event.target.dataset.day;
            document.getElementById("workout-day-title").textContent = `${selectedDay}'s Workout`;
            loadExercises();
            showScreen("workout");
        }
    });

    function loadExercises() {
        lists.exercise.innerHTML = "";
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
                lists.exercise.appendChild(li);
            });
        }
    }

    buttons.addExercise.addEventListener("click", () => {
        const name = inputs.exerciseName.value;
        const sets = inputs.exerciseSets.value;
        const reps = inputs.exerciseReps.value;
        const weight = inputs.exerciseWeight.value;

        if (name && sets && reps && weight) {
            workouts[selectedDay] = workouts[selectedDay] || [];
            workouts[selectedDay].push({ name, sets, reps, weight });
            saveWorkouts();
            loadExercises();
        }
    });

    function saveWorkouts() {
        localStorage.setItem("workouts", JSON.stringify(workouts));
        showNotification("Workout saved!");
        updateTodayWorkout();
    }

    function updateTodayWorkout() {
        const today = new Date().toLocaleString("en-US", { weekday: "long" });
        lists.todayWorkout.innerHTML = "";
        if (workouts[today]) {
            workouts[today].forEach(exercise => {
                let li = document.createElement("li");
                li.textContent = `${exercise.name} - ${exercise.sets} sets x ${exercise.reps} reps`;
                lists.todayWorkout.appendChild(li);
            });
        }
    }

    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    }

    updateTodayWorkout();
});
