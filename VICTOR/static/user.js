document.addEventListener("DOMContentLoaded", function () {
    let users = [
        { name: "John Doe", email: "john@example.com", joinDate: "2024-01-10", lastActive: "2024-03-15", device: "Mobile" },
        { name: "Jane Smith", email: "jane@example.com", joinDate: "2023-12-05", lastActive: "2024-03-18", device: "Desktop" },
        { name: "Mark Lee", email: "mark@example.com", joinDate: "2024-02-20", lastActive: "2024-03-12", device: "Tablet" }
    ];

    function displayUsers() {
        let tbody = document.getElementById("users-list");
        tbody.innerHTML = "";
        users.forEach((user, index) => {
            let row = `<tr>
                <td><input type="checkbox" class="user-checkbox"></td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.joinDate}</td>
                <td>${user.lastActive}</td>
                <td>${user.device}</td>
                <td>
                    <button onclick="editUser(${index})">✏️ Edit</button>
                    <button onclick="deleteUser(${index})">🗑️ Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });

        document.getElementById("total-users").innerText = users.length;
    }

    displayUsers();

    document.getElementById("search-user").addEventListener("input", function () {
        let query = this.value.toLowerCase();
        users.forEach((user, index) => {
            let row = document.querySelector(`#users-list tr:nth-child(${index + 1})`);
            if (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    function deleteUser(index) {
        if (confirm("Are you sure you want to delete this user?")) {
            users.splice(index, 1);
            displayUsers();
        }
    }

    function editUser(index) {
        let newName = prompt("Enter new name:", users[index].name);
        if (newName) {
            users[index].name = newName;
            displayUsers();
        }
    }

    function exportUsers() {
        let csv = "Name,Email,Join Date,Last Active,Device\n";
        users.forEach(user => {
            csv += `${user.name},${user.email},${user.joinDate},${user.lastActive},${user.device}\n`;
        });

        let blob = new Blob([csv], { type: "text/csv" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "users.csv";
        link.click();
    }

    document.getElementById("select-all").addEventListener("click", function () {
        document.querySelectorAll(".user-checkbox").forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    window.deleteUser = deleteUser;
    window.editUser = editUser;
    window.exportUsers = exportUsers;
});
