document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const homePage = document.getElementById("home-page");
    const plannerPage = document.getElementById("planner-page");
    const statsPage = document.getElementById("stats-page");

    const startButton = document.getElementById("start-planning");
    const navPlanner = document.getElementById("nav-planner");
    const navHome = document.getElementById("nav-home");
    const navStats = document.getElementById("nav-stats");

    function showScreen(screen) {
        homePage.classList.add("hidden");
        plannerPage.classList.add("hidden");
        statsPage.classList.add("hidden");
        welcomeScreen.classList.add("hidden");
        screen.classList.remove("hidden");
    }

    startButton.addEventListener("click", () => showScreen(homePage));
    navPlanner.addEventListener("click", () => showScreen(plannerPage));
    navHome.addEventListener("click", () => showScreen(homePage));
    navStats.addEventListener("click", () => showScreen(statsPage));

    function loadRandomQuote() {
        const quotes = ["Push yourself!", "No pain, no gain!", "Stay consistent!", "Train insane!"];
        document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    loadRandomQuote();
});
