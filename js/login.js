// login.js

// Sample user data (replace this with a more secure storage solution in a real application)
const users = [
    { username: 'mani', password: 'pass' },
    { username: 'user2', password: 'pass2' },
    // Add more users as needed
];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const errorMessage = document.getElementById('errorMessage');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Redirect to the home page (index.html)
        window.location.href = 'index.html';
    } else {
        // Display error message
        errorMessage.textContent = 'Invalid username or password.';
        errorMessage.classList.remove('hidden');
    }
}
