document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const app = document.getElementById("app");
    const startBtn = document.getElementById("start-btn");
    const homeBtn = document.getElementById("home-btn");
    const plannerBtn = document.getElementById("planner-btn");
    const progressBtn = document.getElementById("progress-btn");

    const homePage = document.getElementById("home-page");
    const plannerPage = document.getElementById("planner-page");
    const progressPage = document.getElementById("progress-page");

    // Welcome Screen -> Home
    startBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        app.classList.remove("hidden");
        homePage.classList.remove("hidden");
    });

    // Bottom Navigation
    homeBtn.addEventListener("click", () => showPage(homePage));
    plannerBtn.addEventListener("click", () => showPage(plannerPage));
    progressBtn.addEventListener("click", () => showPage(progressPage));

    function showPage(page) {
        homePage.classList.add("hidden");
        plannerPage.classList.add("hidden");
        progressPage.classList.add("hidden");
        page.classList.remove("hidden");
    }
});
