const quotes = [
    "No pain, no gain!",
    "Your only limit is you.",
    "Sweat, smile, repeat.",
    "Push yourself because no one else will!",
    "Train insane or remain the same."
];

// Display random motivational quote
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const homeScreen = document.getElementById("home-screen");
    const plannerScreen = document.getElementById("planner-screen");
    const progressScreen = document.getElementById("progress-screen");

    const startBtn = document.getElementById("start-btn");
    const homeBtn = document.getElementById("home-btn");
    const plannerBtn = document.getElementById("planner-btn");
    const progressBtn = document.getElementById("progress-btn");

    startBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");
    });

    homeBtn.addEventListener("click", () => {
        hideAllScreens();
        homeScreen.classList.remove("hidden");
    });

    plannerBtn.addEventListener("click", () => {
        hideAllScreens();
        plannerScreen.classList.remove("hidden");
    });

    progressBtn.addEventListener("click", () => {
        hideAllScreens();
        progressScreen.classList.remove("hidden");
    });

    function hideAllScreens() {
        homeScreen.classList.add("hidden");
        plannerScreen.classList.add("hidden");
        progressScreen.classList.add("hidden");
    }
});
