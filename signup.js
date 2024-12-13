// Event listener for the sign-up button
document.getElementById('signupButton').addEventListener('click', function () {
    const fullname = document.getElementById('fullname').value.trim();
    const username = document.getElementById('username').value.trim(); // Username input
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!fullname || !username || !password) {
        alert('Please fill in all the fields!');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // Check if username already exists
    if (localStorage.getItem(`user_${username}`)) {
        alert('This username is already taken. Please choose another.');
        return;
    }

    try {
        // Generate a unique user ID
        const userId = Date.now().toString(); 

        // Create user data object
        const userData = {
            userId,
            fullname,
            username,
            password, // Storing plain-text password, which is insecure
            createdAt: new Date().toISOString(),
        };

        // Save user data to localStorage using `user_${username}` as the key
        localStorage.setItem(`user_${username}`, JSON.stringify(userData));

        // Log the saved data to check it
        console.log('User data saved:', userData);

        alert(`Sign-up successful! Welcome, ${fullname}!`);
        document.getElementById('signupForm').reset(); // Reset the form after successful sign-up

        // Redirect to the main dashboard
        window.location.href = 'try.html';
    } catch (error) {
        console.error('Error during sign-up:', error);
        alert('An error occurred. Please try again.');
    }
});
