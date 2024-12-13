const noteTextarea = document.getElementById('note-textarea');
const saveNoteButton = document.getElementById('save-note');
const clearNoteButton = document.getElementById('clear-note');
const notesList = document.getElementById('notes-list');
const addAttachmentButton = document.getElementById('add-attachment');

let notes = []; // Array to store notes with attachments

// Save note functionality
saveNoteButton.addEventListener('click', () => {
  const noteContent = noteTextarea.value.trim();
  if (noteContent || notes.length > 0) {
    // Save the note with attachments
    notes.push({ content: noteContent, attachments: [...attachments] });
    updateNotesList(); // Update notes list
    noteTextarea.value = ''; // Clear the textarea
    attachments = []; // Clear attachments after saving
    alert('Note saved successfully!');
  } else {
    alert('Please write something before saving.');
  }
});

// Clear note functionality
clearNoteButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the note?')) {
    noteTextarea.value = ''; // Clear the textarea
    attachments = []; // Clear attachments
  }
});

// Update recent notes list
function updateNotesList() {
  notesList.innerHTML = ''; // Clear the current list
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = `Note ${index + 1}: ${note.content.substring(0, 30)}...`; // Shorten the note for display
    li.addEventListener('click', () => {
      noteTextarea.value = note.content; // Load note into textarea
    });

    // Add attachments to the note
    note.attachments.forEach((attachment) => {
      const imgContainer = document.createElement('div');
      if (attachment.type.startsWith('image')) {
        const imgElement = document.createElement('img');
        imgElement.src = attachment.url;
        imgElement.alt = 'Attachment';
        imgElement.style.maxWidth = '100px';
        imgElement.style.maxHeight = '100px';
        imgContainer.appendChild(imgElement);
      } else {
        const fileName = document.createElement('p');
        fileName.textContent = `Attachment: ${attachment.name}`;
        imgContainer.appendChild(fileName);
      }
      li.appendChild(imgContainer);
    });

    notesList.appendChild(li);
  });
}

// Array to hold the selected attachments
let attachments = [];

// Add attachment functionality
addAttachmentButton.addEventListener('click', () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '*/*'; // Allow all file types
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);
  fileInput.click();

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      if (file.type.startsWith('image')) {
        // For image files, create a preview
        reader.onload = (e) => {
          attachments.push({
            type: file.type,
            url: e.target.result, // Use the base64 URL for image display
            name: file.name,
          });
        };
        reader.readAsDataURL(file); // Read the file as a data URL
      } else {
        // For non-image files, just store the file name and type
        attachments.push({
          type: file.type,
          name: file.name,
        });
      }

      updateAttachmentList(); // Update the list of attachments
    }

    document.body.removeChild(fileInput); // Remove the file input after use
  });
});

// Update attachment list display
function updateAttachmentList() {
  const attachmentList = document.getElementById('attachment-list');
  attachmentList.innerHTML = ''; // Clear current list

  attachments.forEach((attachment, index) => {
    const li = document.createElement('li');
    if (attachment.type.startsWith('image')) {
      const imgElement = document.createElement('img');
      imgElement.src = attachment.url;
      imgElement.alt = 'Attachment';
      imgElement.style.maxWidth = '100px';
      imgElement.style.maxHeight = '100px';
      li.appendChild(imgElement);
    } else {
      li.textContent = `Attachment ${index + 1}: ${attachment.name}`;
    }
    attachmentList.appendChild(li);
  });
}
