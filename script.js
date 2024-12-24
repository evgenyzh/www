function validateForm() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (username === "" || password === "") {
        errorMessage.textContent = "Please fill in all fields.";
        return false;
    }

    const response = fetch('https://am1.itisnotvpn.com:3000/validate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Enable cookie
    })
    .then(response => {
        console.log("Response received:", response);
        return response.json();
    })
    .then(data => {
        console.log("Data received:", data);
        if (data.success) {
            alert("Login successful!");
            window.location.href = 'https://am1.itisnotvpn.com:3000/profile';
        } else {
            errorMessage.textContent = data.message || "The password or login is incorrect!";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        errorMessage.textContent = "Server error. Please try again later.";
    });

    return false;
}

function logout() {
    fetch('https://am1.itisnotvpn.com:3000/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Logged out successfully!");
        }
    })
    .catch(error => console.error("Error:", error));
}