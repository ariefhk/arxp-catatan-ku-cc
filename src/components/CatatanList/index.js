import React from "react";
import { showFormattedDate } from "../../utils/data";
import styles from "./style.module.css";

export default function Catatanlist({ notes, deleteNote, archivedNote }) {
  return (
    <div className={styles.listContainer}>
      <h2>Daftar Catatan</h2>
      <div className={styles.list}>
        {notes.length ? (
          notes.map(
            (note) =>
              !note.archived && (
                <div key={note.id} className={styles.listItem}>
                  <div className={styles.listItemData}>
                    <h5>{showFormattedDate(note.createdAt)}</h5>
                    <h3>{note.title}</h3>
                    <p>{note.body}</p>
                  </div>
                  <div className={styles.listItemBtn}>
                    <button onClick={() => deleteNote(note.id)}>Hapus</button>
                    <button onClick={() => archivedNote(note.id)}>Arsip</button>
                  </div>
                </div>
              )
          )
        ) : (
          <div className={styles.listNoItem}>
            <h1>Tidak Ada Data!</h1>
          </div>
        )}
      </div>
    </div>
  );
}
