const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory data (simple & internship-safe)
let users = [];
let idCounter = 1;

/* GET all users */
app.get("/api/users", (req, res) => {
    res.json(users);
});

/* CREATE user */
app.post("/api/users", (req, res) => {
    const { name, email, role } = req.body;

    const newUser = {
        id: idCounter++,
        name,
        email,
        role
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

/* DELETE user */
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    users = users.filter(user => user.id !== id);
    res.json({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
