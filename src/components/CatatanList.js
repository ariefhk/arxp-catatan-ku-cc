import React from "react";

export default function Catatanlist({ notes, deleteNote }) {
  return (
    <div className="catatan-list">
      <h2>Daftar Catatan</h2>
      <div className="catatan-list__body">
        {notes.length ? (
          notes.map((note) => (
            <div key={note.id} className="catatan-list__body__item">
              <div className="item-data">
                <h5>{note.date}</h5>
                <h3>{note.title}</h3>
                <p>{note.note}</p>
              </div>
              <div className="item-btn">
                <button onClick={() => deleteNote(note.id)}>Hapus</button>
              </div>
            </div>
          ))
        ) : (
          <div className="catatan-list__body__noItem">
            <h1>Tidak Ada Data!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
