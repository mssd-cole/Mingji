// Event listener for the login button
document.getElementById('loginButton').addEventListener('click', function () {
    const username = document.getElementById('username').value.trim(); // Trimmed username
    const password = document.getElementById('password').value.trim(); // Trimmed password

    // Check if the fields are filled
    if (!username || !password) {
        alert('Please fill in all the fields!');
        return;
    }

    // Check if username and password contain spaces
    if (username.includes(" ") || password.includes(" ")) {
        alert('Username and password should not contain spaces!');
        return;
    }

    try {
        // Retrieve user data from localStorage using the username
        const userData = JSON.parse(localStorage.getItem(`user_${username}`)); // Use `user_${username}` as the key

        // Log the retrieved data to check if it's correct
        console.log('User data retrieved for login:', userData);

        // Check if the user exists and password matches
        if (userData && userData.password === password) {
            alert(`Welcome back, ${userData.fullname}!`);
            window.location.href = 'try.html';  // Redirect to the main page
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
