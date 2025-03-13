document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Admin panel script loaded!");

    // Sidebar and Sections
    const sidebarItems = document.querySelectorAll(".sidebar ul li");
    const contentFrame = document.getElementById("content-frame");
    const userTable = document.getElementById("user-table");
    const movieTable = document.getElementById("movie-table");
    const addMovieBtn = document.getElementById("add-movie-btn");
    const movieForm = document.getElementById("movie-form");

    // Sidebar Click Functionality
    sidebarItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Remove active class from all items
            sidebarItems.forEach(el => el.classList.remove("active"));
            // Add active class to clicked item
            item.classList.add("active");

            // Get section from data attribute
            const section = item.getAttribute("data-section");

            // Save active section in LocalStorage
            localStorage.setItem("activeTab", section);

            // Handle logout
            if (section === "logout") {
                window.location.href = "/logout";
            } else {
                contentFrame.src = `/${section}`;
            }
        });
    });

    // Load saved active tab
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
        const activeItem = document.querySelector(`.sidebar ul li[data-section="${savedTab}"]`);
        if (activeItem) {
            activeItem.classList.add("active");
            contentFrame.src = `/${savedTab}`;
        }
    } else {
        // Default to dashboard
        document.querySelector(".sidebar ul li[data-section='dashboard']").classList.add("active");
        contentFrame.src = "/dashboard";
    }

    // Sample User Data
    if (userTable) {
        const users = [
            { name: "John Doe", email: "john@example.com", plan: "Premium" },
            { name: "Jane Smith", email: "jane@example.com", plan: "Basic" }
        ];

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${user.plan}</td>`;
            userTable.appendChild(row);
        });
    }

    // Sample Movie Data
    if (movieTable) {
        const movies = [
            { title: "Inception", genre: "Sci-Fi", rating: 9.0 },
            { title: "Joker", genre: "Drama", rating: 8.5 }
        ];

        movies.forEach(movie => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${movie.title}</td><td>${movie.genre}</td><td>${movie.rating}</td>`;
            movieTable.appendChild(row);
        });
    }

    // Add New Movie Functionality
    if (addMovieBtn && movieForm) {
        addMovieBtn.addEventListener("click", () => {
            console.log("🎬 Add Movie button clicked!");
            movieForm.classList.toggle("hidden");
        });

        movieForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = document.getElementById("movie-title").value;
            const genre = document.getElementById("movie-genre").value;
            const rating = document.getElementById("movie-rating").value;

            if (title && genre && rating) {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${title}</td><td>${genre}</td><td>${rating}</td>`;
                movieTable.appendChild(row);
                movieForm.reset();
                movieForm.classList.add("hidden");
            } else {
                alert("⚠️ Please fill out all fields!");
            }
        });
    }
});
