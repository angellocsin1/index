document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    // Check if user already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.username === username)) {
        document.getElementById("message").textContent = "Username already exists!";
        return;
    }

    // Save new user data
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("message").textContent = "Registration successful!";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Check if user exists and password is correct
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);  // Save logged in user
        window.location.href = "mobile.html";  // Redirect to cart page (or your main page)
    } else {
        document.getElementById("message").textContent = "Invalid username or password!";
    }
});
