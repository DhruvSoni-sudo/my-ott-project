document.addEventListener("DOMContentLoaded", function () {
    // Dummy Data
    let totalMovies = 120;
    let totalUsers = 450;
    let totalWatchHours = 750;
    let avgSessionDuration = 35; // in minutes

    let moviesByCategory = {
        "Action": 30,
        "Comedy": 25,
        "Drama": 20,
        "Horror": 15,
        "Sci-Fi": 30
    };

    let activeUsersLast30Days = [10, 15, 20, 25, 30, 35, 40, 38, 34, 50, 55, 45, 42, 50, 60, 65, 70, 72, 75, 80, 78, 85, 90, 95, 100, 110, 115, 120, 130, 140];
    let newUsersPerMonth = [20, 30, 25, 40, 50, 55, 60, 65, 70, 80, 85, 100];

    let mostWatchedMovies = ["Avengers", "Joker", "Titanic", "Interstellar", "Inception"];

    // Updating Quick Stats
    document.getElementById("total-movies").innerText = totalMovies;
    document.getElementById("total-users").innerText = totalUsers;
    document.getElementById("watch-hours").innerText = totalWatchHours;
    document.getElementById("session-duration").innerText = avgSessionDuration;

    // Movies by Category (Pie Chart)
    let ctxMoviesCategory = document.getElementById("moviesCategoryChart").getContext("2d");
    new Chart(ctxMoviesCategory, {
        type: "pie",
        data: {
            labels: Object.keys(moviesByCategory),
            datasets: [{
                label: "Movies by Category",
                data: Object.values(moviesByCategory),
                backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"]
            }]
        }
    });

    // Active Users (Line Chart)
    let ctxActiveUsers = document.getElementById("activeUsersChart").getContext("2d");
    new Chart(ctxActiveUsers, {
        type: "line",
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
            datasets: [{
                label: "Active Users (Last 30 Days)",
                data: activeUsersLast30Days,
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2
            }]
        }
    });

    // New Users Per Month (Bar Chart)
    let ctxNewUsers = document.getElementById("newUsersChart").getContext("2d");
    new Chart(ctxNewUsers, {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "New Users Per Month",
                data: newUsersPerMonth,
                backgroundColor: "#28a745",
                borderColor: "#1e7e34",
                borderWidth: 2
            }]
        }
    });

    // Most Watched Movies List
    let mostWatchedList = document.getElementById("most-watched-list");
    mostWatchedMovies.forEach(movie => {
        let listItem = document.createElement("li");
        listItem.innerText = movie;
        mostWatchedList.appendChild(listItem);
    });
});
