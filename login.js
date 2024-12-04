document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("regPassword").value;

    // Check if user already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
        document.getElementById("registerMessage").textContent = "Email already exists!";
        return;
    }

    // Save new user data
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("registerMessage").textContent = "Registration successful!";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Check if user exists and password is correct
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("loggedInEmail", email)
        window.location.href = "pro.html";  // Redirect to cart page (or your main page)
    } else {
        document.getElementById("loginMessage").textContent = "Invalid username or password!";
    }
});

