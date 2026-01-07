const API_URL = "http://localhost:5000/api/users";

function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;
    const message = document.getElementById("message");

    if (!name || !email) {
        message.textContent = "Please fill all fields";
        message.style.color = "red";
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role })
    })
    .then(res => res.json())
    .then(() => {
        message.textContent = "User added successfully";
        message.style.color = "green";
        loadUsers();
    });
}

function loadUsers() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("tableBody");
            tbody.innerHTML = "";

            data.forEach(user => {
                const row = `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                        <td>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}

function deleteUser(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadUsers());
}

loadUsers();
