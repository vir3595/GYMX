document.getElementById("start-btn").addEventListener("click", function() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    loadTodaysWorkout();
});

function showSection(sectionId) {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("weekly-planner").classList.add("hidden");
    document.getElementById("stats").classList.add("hidden");

    document.getElementById(sectionId).classList.remove("hidden");
}

function openWorkout(day) {
    document.getElementById("workout-details").classList.remove("hidden");
    document.getElementById("workout-details").innerHTML = `<h3>${day}'s Workout 🏋️</h3><p>No exercises added yet.</p>`;
}

function loadTodaysWorkout() {
    const workouts = {
        "Monday": "Squats, Bench Press, Deadlifts",
        "Tuesday": "Pull-ups, Shoulder Press, Lunges",
        "Wednesday": "Rest Day! 😴",
        "Thursday": "Cardio & Core 🏃‍♂️",
        "Friday": "Leg Day! 🦵",
        "Saturday": "Arms & Chest 💪",
        "Sunday": "Active Recovery 🏊‍♂️"
    };

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById("todays-workout").innerText = workouts[today] || "No workout planned.";
}
