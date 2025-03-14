document.addEventListener("DOMContentLoaded", () => {
    // Get all screen elements
    const screens = {
        welcome: document.getElementById("welcomeScreen"),
        home: document.getElementById("homeScreen"),
        planner: document.getElementById("plannerScreen"),
        stats: document.getElementById("statsScreen")
    };

    // Bottom navigation buttons
    const navButtons = {
        planner: document.getElementById("plannerNav"),
        home: document.getElementById("homeNav"),
        stats: document.getElementById("statsNav")
    };

    // Set default screen
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove("active"));
        screens[screenName].classList.add("active");
        localStorage.setItem("currentScreen", screenName); // Save last visited screen
    }

    // Restore last screen on refresh
    const lastScreen = localStorage.getItem("currentScreen") || "welcome";
    showScreen(lastScreen);

    // Welcome screen button
    document.getElementById("startButton").addEventListener("click", () => {
        showScreen("home");
    });

    // Bottom navigation event listeners
    navButtons.planner.addEventListener("click", () => showScreen("planner"));
    navButtons.home.addEventListener("click", () => showScreen("home"));
    navButtons.stats.addEventListener("click", () => showScreen("stats"));

    // Motivational Quotes - Random on Load
    const quotes = [
        "Push yourself because no one else will do it for you.",
        "No pain, no gain!",
        "Success starts with self-discipline.",
        "Every workout counts!",
        "Stronger every day!"
    ];
    document.getElementById("motivationalQuote").innerText = 
        quotes[Math.floor(Math.random() * quotes.length)];

    // Workout Planner Logic
    const workoutData = JSON.parse(localStorage.getItem("workoutData")) || {};

    document.querySelectorAll(".day-btn").forEach(button => {
        button.addEventListener("click", () => {
            const day = button.dataset.day;
            const workout = workoutData[day] || "No workouts added yet!";
            document.getElementById("dayWorkout").innerHTML = `
                <h3>${day} Workout</h3>
                <p>${workout}</p>
                <input type="text" id="exerciseInput" placeholder="Add Exercise">
                <button id="saveWorkout">Save</button>
            `;

            // Save new workouts
            document.getElementById("saveWorkout").addEventListener("click", () => {
                const newExercise = document.getElementById("exerciseInput").value;
                if (newExercise.trim() !== "") {
                    workoutData[day] = newExercise;
                    localStorage.setItem("workoutData", JSON.stringify(workoutData));
                    alert("Workout Saved! ✅");
                    document.getElementById("dayWorkout").innerHTML = `<h3>${day} Workout</h3><p>${newExercise}</p>`;
                }
            });
        });
    });

    // Today's Workout - Fetch from Planner
    function updateTodaysWorkout() {
        const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
        const todaysWorkout = workoutData[today] || "No planned workout for today!";
        document.getElementById("todaysWorkout").innerHTML = `<p>${todaysWorkout}</p>`;
    }

    updateTodaysWorkout(); // Update on load
});
