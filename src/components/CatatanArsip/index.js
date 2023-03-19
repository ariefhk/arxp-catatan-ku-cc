import React from "react";
import styles from "./style.module.css";
import { showFormattedDate } from "../../utils/data";

export default function CatatanArsip({ notes, deleteNote, moveNote }) {
  return (
    <div className={styles.listContainer}>
      <h2>Daftar Arsip</h2>
      <div className={styles.list}>
        {notes.length ? (
          notes.map((note) => (
            <div key={note.id} className={styles.listItem}>
              <div className={styles.listItemData}>
                <h5>{showFormattedDate(note.createdAt)}</h5>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
              <div className={styles.listItemBtn}>
                <button onClick={() => deleteNote(note.id)}>Hapus</button>
                <button onClick={() => moveNote(note.id)}>Pindah</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.listNoItem}>
            <h1>Tidak Ada Data!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
