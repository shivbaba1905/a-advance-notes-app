    // 1. Shuruat mein Local Storage se data nikalna (State Management)
    let notes = JSON.parse(localStorage.getItem("savedNotes")) || [];

    // App load hote hi purane notes dikhana
    displayNotes(notes);

    // 2. Naya Note Add karne ka logic
    function addNote() {
        const textarea = document.getElementById("noteTextarea");
        const textValue = textarea.value.trim();

        if (textValue === "") {
            alert("Kripya note mein kuch likhein!");
            return;
        }

        // Ek note object banana date ke sath
        const newNote = {
            id: Date.now(),
            text: textValue,
            date: new Date().toLocaleDateString('en-IN')
        };

        // State update karna (Array me jodhna)
        notes.push(newNote);
        
        // Local storage update karna
        saveToLocalStorage();

        // Screen par naya data dikhana aur input khali karna
        displayNotes(notes);
        textarea.value = "";
    }

    // 3. Note Delete karne ka logic
    function deleteNote(id) {
        // Filter lagakar us ID wale note ko hata dena
        notes = notes.filter(note => note.id !== id);
        
        saveToLocalStorage();
        displayNotes(notes);
    }

    // 4. Real-time Live Search Logic
    function filterNotes() {
        const searchText = document.getElementById("searchBox").value.toLowerCase();
        
        // Search text ke mutabiq notes filter karna
        const filteredNotes = notes.filter(note => 
            note.text.toLowerCase().includes(searchText)
        );
        
        displayNotes(filteredNotes);
    }

    // 5. Notes ko HTML grid me dikhane ka function
    function displayNotes(notesToDisplay) {
        const grid = document.getElementById("notesGrid");
        grid.innerHTML = ""; // Purana data saaf karna

        if (notesToDisplay.length === 0) {
            grid.innerHTML = `<div class="no-notes">Koi notes nahi mile! 😊</div>`;
            return;
        }

        notesToDisplay.forEach(note => {
            const card = document.createElement("div");
            card.className = "note-card";
            card.innerHTML = `
                <div class="note-text">${note.text}</div>
                <div class="note-footer">
                    <span>📅 ${note.date}</span>
                    <button class="btn-delete" onclick="deleteNote(${note.id})">Delete</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Local Storage me save karne ka function
    function saveToLocalStorage() {
        localStorage.setItem("savedNotes", JSON.stringify(notes));
    }
