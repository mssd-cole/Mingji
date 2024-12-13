const addPhotoButton = document.getElementById("add-photo-button");
const photoGrid = document.getElementById("photo-grid");
const photoModal = document.getElementById("photo-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");
const photoTitle = document.getElementById("photo-title");
const saveTitleButton = document.getElementById("save-title-button");



// Function to add a new photo
addPhotoButton.addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  
  document.body.appendChild(fileInput);
  fileInput.click();

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = document.createElement("img");
        image.src = e.target.result;
        image.alt = "Featured Photo";
        image.addEventListener("click", () => openModal(e.target.result));

        // Add the new image to the grid
        photoGrid.appendChild(image);
      };

      reader.readAsDataURL(file);
    }
    document.body.removeChild(fileInput);
  });
});

// Function to open the modal
function openModal(imageSrc) {
  modalImage.src = imageSrc;
  photoModal.style.display = "flex";
}

// Function to close the modal
closeModal.addEventListener("click", () => {
  photoModal.style.display = "none";
});

// Close modal on clicking outside the content
photoModal.addEventListener("click", (e) => {
  if (e.target === photoModal) {
    photoModal.style.display = "none";
  }
});


// Load saved title from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTitle = localStorage.getItem("photoTitle");
  if (savedTitle) {
    photoTitle.textContent = savedTitle;
  }
});

// Save the title to localStorage whenever it changes
photoTitle.addEventListener("input", () => {
  localStorage.setItem("photoTitle", photoTitle.textContent);
});
// Load saved title from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTitle = localStorage.getItem("photoTitle");
  if (savedTitle) {
    photoTitle.textContent = savedTitle;
  }
});

// Save the title and redirect to the home dashboard
saveTitleButton.addEventListener("click", () => {
  const titleContent = photoTitle.textContent.trim();

  // Check if the title is valid
  if (titleContent.length === 0) {
    alert("The title cannot be empty. Please enter a valid name.");
    return;
  }

  if (titleContent.length > 50) {
    alert("The title is too long. Please limit it to 50 characters.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("photoTitle", titleContent);

  // Redirect to the home dashboard
  window.location.href = "try.html"; // Replace with your actual dashboard URL
});

