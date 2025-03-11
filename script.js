document.addEventListener("DOMContentLoaded", function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const homeScreen = document.getElementById('home-screen');
    const workoutPlannerScreen = document.getElementById('workout-planner-screen');
    const statsScreen = document.getElementById('stats-screen');

    const homeBtn = document.getElementById('home-btn');
    const workoutPlannerBtn = document.getElementById('workout-planner-btn');
    const statsBtn = document.getElementById('stats-btn');
    const startPlanningBtn = document.getElementById('start-planning');

    // Function to show a specific screen
    function showScreen(screen) {
        const screens = [welcomeScreen, homeScreen, workoutPlannerScreen, statsScreen];
        screens.forEach(s => s.classList.add('hidden')); // Hide all screens
        screen.classList.remove('hidden'); // Show the requested screen
    }

    // Event listener for the start planning button
    startPlanningBtn.addEventListener('click', function() {
        showScreen(homeScreen); // Go to the home screen after the welcome screen
    });

    // Event listeners for bottom navigation buttons
    homeBtn.addEventListener('click', function() {
        showScreen(homeScreen); // Show Home Screen
    });

    workoutPlannerBtn.addEventListener('click', function() {
        showScreen(workoutPlannerScreen); // Show Workout Planner Screen
    });

    statsBtn.addEventListener('click', function() {
        showScreen(statsScreen); // Show Stats Screen
    });

    // Initially show the welcome screen
    showScreen(welcomeScreen);
});
