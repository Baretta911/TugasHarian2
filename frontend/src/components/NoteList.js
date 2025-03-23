import React from "react";

function NoteList({ notes, editNote, deleteNote }) {
    return (
        <div className="notes-container">
            {notes.map((note) => (
                <div key={note.id} className="note">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => editNote(note.id, note.title, note.content)}>✏ Edit</button>
                    <button onClick={() => deleteNote(note.id)}>❌ Hapus</button>
                </div>
            ))}
        </div>
    );
}

export default NoteList;
