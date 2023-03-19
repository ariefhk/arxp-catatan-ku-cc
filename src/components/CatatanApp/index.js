import React from "react";
import CatatanInput from "../CatatanInput";
import Catatanlist from "../CatatanList";
import { getInitialData, showFormattedDate } from "../../utils/data";
import styles from "./style.module.css";

class CatatanApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      isRed: false,
    };

    this.onAddNote = this.onAddNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onArchived = this.onArchived.bind(this);
  }

  onAddNote({ date, title, note }) {
    this.setState((previous) => {
      return {
        notes: [
          ...previous.notes,
          {
            id: +new Date(),
            date,
            title,
            note,
          },
        ],
      };
    });
  }

  onDeleteNote(id) {
    let dataNew = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes: dataNew });
  }

  onArchived(id) {
    let dataNew = this.state.notes.filter((note) => note.id === id)[0];
    let modified = { ...dataNew, archived: true };
    console.log(modified);
    this.setState((prevState) => {
      return {
        notes: [...prevState.notes.filter((note) => note.id !== id), modified],
      };
    });
  }

  render() {
    const { notes } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.font}>Catatan Ku</h1>
        <div className={styles.notesWrapper}>
          <CatatanInput addNote={this.onAddNote} />
          <div className={styles.listWrapper}>
            <Catatanlist
              notes={notes}
              deleteNote={this.onDeleteNote}
              archivedNote={this.onArchived}
            />
            <div className={styles.listContainer}>
              <h2>Daftar Arsip</h2>
              <div className={styles.list}>
                {notes.length ? (
                  notes.map(
                    (note) =>
                      note.archived && (
                        <div key={note.id} className={styles.listItem}>
                          <div className={styles.listItemData}>
                            <h5>{showFormattedDate(note.createdAt)}</h5>
                            <h3>{note.title}</h3>
                            <p>{note.body}</p>
                          </div>
                          <div className={styles.listItemBtn}>
                            <button onClick={() => this.onDeleteNote(note.id)}>
                              Hapus
                            </button>
                            <button onClick={() => this.onDeleteNote(note.id)}>
                              Arsip
                            </button>
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
          </div>
        </div>
      </div>
    );
  }
}

export default CatatanApp;
