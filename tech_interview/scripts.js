// Wait for DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    // Handle CTA button click
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('You are being redirected to the dashboard!');
        });
    }

    // Profile picture upload and preview
    const profilePictureInput = document.getElementById('profile-picture');
    const imagePreview = document.getElementById('image-preview');
    if (profilePictureInput && imagePreview) {
        profilePictureInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imgElement = document.createElement('img');
                    imgElement.src = e.target.result;
                    imgElement.style.width = '100px';
                    imgElement.style.height = '100px';
                    imagePreview.innerHTML = ''; // Clear previous preview
                    imagePreview.appendChild(imgElement);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Academic details form submission
    const academicForm = document.getElementById('academic-form');
    if (academicForm) {
        academicForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const degree = document.getElementById('degree').value;
            const university = document.getElementById('university').value;
            const graduationYear = document.getElementById('graduation-year').value;

            console.log('Degree:', degree);
            console.log('University:', university);
            console.log('Graduation Year:', graduationYear);

            alert('Academic details saved!');
        });
    }

    // Toggle dropdown menu visibility
    const profilePic = document.querySelector('.profile-pic');
    const dropdown = document.getElementById('profileDropdown');
    if (profilePic && dropdown) {
        profilePic.addEventListener('click', toggleDropdown);
        window.addEventListener('click', function(event) {
            if (!event.target.matches('.profile-pic') && dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Please fill out all fields!');
                return;
            }

            fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        window.location.href = '/index.html'; // Redirect on success
                    } else {
                        alert('Invalid credentials. Please try again.');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
        });
    }

    // Simple confirmation before leaving the page
    window.onbeforeunload = function() {
        return 'Are you sure you want to leave this page?';
    };
});

// Function to toggle the dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}