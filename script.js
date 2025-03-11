document.addEventListener("DOMContentLoaded", () => {
    const screens = {
        welcome: document.getElementById("welcomeScreen"),
        home: document.getElementById("homeScreen"),
        planner: document.getElementById("plannerScreen"),
        stats: document.getElementById("statsScreen")
    };

    const navButtons = {
        planner: document.getElementById("plannerNav"),
        home: document.getElementById("homeNav"),
        stats: document.getElementById("statsNav")
    };

    // Function to show a specific screen
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => screen.classList.remove("active"));
        screens[screenName].classList.add("active");
    }

    // Welcome screen button
    document.getElementById("startButton").addEventListener("click", () => {
        showScreen("home");
    });

    // Navigation buttons
    navButtons.planner.addEventListener("click", () => showScreen("planner"));
    navButtons.home.addEventListener("click", () => showScreen("home"));
    navButtons.stats.addEventListener("click", () => showScreen("stats"));

    // Motivational quotes
    const quotes = [
        "Push yourself because no one else will do it for you.",
        "No pain, no gain!",
        "Success starts with self-discipline.",
        "Every workout counts!",
        "Stronger every day!"
    ];
    document.getElementById("motivationalQuote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

    // Weekday workout planner
    document.querySelectorAll(".day-btn").forEach(button => {
        button.addEventListener("click", () => {
            const day = button.dataset.day;
            document.getElementById("dayWorkout").innerHTML = `<h3>${day} Workout</h3><p>Plan your exercises here...</p>`;
        });
    });

    // Initialize first screen
    showScreen("welcome");
});
