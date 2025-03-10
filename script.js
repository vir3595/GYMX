document.addEventListener("DOMContentLoaded", function () {
    // Show welcome page for 2 seconds then transition
    setTimeout(() => {
        navigateTo("home-screen");
    }, 2000);

    // Random Motivational Quote
    const quotes = [
        "Push yourself, because no one else will do it for you!",
        "No pain, no gain!",
        "Success starts with self-discipline.",
        "You don’t get the results you want by wishing for them."
    ];
    document.getElementById("motivational-quote").innerText =
        quotes[Math.floor(Math.random() * quotes.length)];
});

// Function to switch pages
function navigateTo(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
    document.getElementById(pageId).classList.add("active");
}
