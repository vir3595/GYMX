document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const planner = document.getElementById("planner");
    const startBtn = document.getElementById("start-btn");
    const dayButtons = document.querySelectorAll(".day-btn");
    const workoutSection = document.getElementById("workout-section");
    const selectedDayTitle = document.getElementById("selected-day");
    const exerciseList = document.getElementById("exercise-list");
    const addExerciseBtn = document.getElementById("add-exercise");
    const exerciseNameInput = document.getElementById("exercise-name");
    const backBtn = document.getElementById("back-btn");

    let currentDay = "";

    // Start button event
    startBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        planner.classList.remove("hidden");
    });

    // Click event for day buttons
    dayButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentDay = button.dataset.day;
            selectedDayTitle.textContent = `Workout for ${currentDay}`;
            workoutSection.classList.remove("hidden");
        });
    });

    // Add Exercise Button
    addExerciseBtn.addEventListener("click", () => {
        const exerciseName = exerciseNameInput.value.trim();
        if (exerciseName) {
            const li = document.createElement("li");
            li.textContent = exerciseName;
            exerciseList.appendChild(li);
            exerciseNameInput.value = "";
        }
    });

    // Back button event
    backBtn.addEventListener("click", () => {
        workoutSection.classList.add("hidden");
    });
});
