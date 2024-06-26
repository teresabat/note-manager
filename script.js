document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');
    const searchInput = document.getElementById('search-input');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const renderNotes = (notesToRender) => {
        notesList.innerHTML = '';
        notesToRender.forEach(note => {
            const li = document.createElement('li');
            li.className = 'note-item';

            const h2 = document.createElement('h2');
            h2.textContent = note.title;

            const p = document.createElement('p');
            p.textContent = note.content;

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editNote(note.id));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Excluir';
            deleteBtn.addEventListener('click', () => deleteNote(note.id));

            li.appendChild(h2);
            li.appendChild(p);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);

            notesList.appendChild(li);
        });
    };

    const addNote = (title, content) => {
        const note = {
            id: Date.now(),
            title,
            content,
        };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes(notes);
    };

    const editNote = (id) => {
        const note = notes.find(note => note.id === id);
        noteTitle.value = note.title;
        noteContent.value = note.content;
        deleteNote(id);
    };

    const deleteNote = (id) => {
        notes = notes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes(notes);
    };

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (noteTitle.value.trim() && noteContent.value.trim()) {
            addNote(noteTitle.value.trim(), noteContent.value.trim());
            noteTitle.value = '';
            noteContent.value = '';
        }
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredNotes = notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm)
        );
        renderNotes(filteredNotes);
    });

    renderNotes(notes);
});
