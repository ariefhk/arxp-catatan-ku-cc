import React from "react";
import CatatanInput from "../CatatanInput";
import Catatanlist from "../CatatanList";
import CatatanArsip from "../CatatanArsip";
import { getInitialData } from "../../utils/data";
import styles from "./style.module.css";

class CatatanApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      unfilteredNotes: getInitialData(),
    };

    this.onAddNote = this.onAddNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onArchived = this.onArchived.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onAddNote({ title, body }) {
    this.setState((previous) => {
      return {
        notes: [
          ...previous.notes,
          {
            id: +new Date(),
            createdAt: new Date(),
            archived: false,
            title,
            body,
          },
        ],
        unfilteredNotes: [
          ...previous.unfilteredNotes,
          {
            id: +new Date(),
            createdAt: new Date(),
            archived: false,
            title,
            body,
          },
        ],
      };
    });
  }

  onDeleteNote(id) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => note.id !== id),
        unfilteredNotes: prevState.unfilteredNotes.filter(
          (note) => note.id !== id
        ),
      };
    });
  }

  onArchived(id) {
    let dataNew = this.state.notes.filter((note) => note.id === id)[0];
    let modified = { ...dataNew, archived: true };
    this.setState((prevState) => {
      return {
        notes: [...prevState.notes.filter((note) => note.id !== id), modified],
        unfilteredNotes: [
          ...prevState.unfilteredNotes.filter((note) => note.id !== id),
          modified,
        ],
      };
    });
  }

  onMove(id) {
    let dataNew = this.state.notes.filter((note) => note.id === id)[0];
    let modified = { ...dataNew, archived: false };
    console.log(modified);
    this.setState((prevState) => {
      return {
        notes: [...prevState.notes.filter((note) => note.id !== id), modified],
        unfilteredNotes: [
          ...prevState.unfilteredNotes.filter((note) => note.id !== id),
          modified,
        ],
      };
    });
  }

  onSearch(event) {
    let title = event.target.value;
    if (!title || title.trim() === "") {
      this.setState({
        notes: this.state.unfilteredNotes,
      });
    } else {
      this.setState({
        notes: this.state.unfilteredNotes.filter((note) =>
          String(note.title).toLowerCase().includes(title)
        ),
      });
    }
  }

  render() {
    const { notes } = this.state;
    const { onAddNote, onArchived, onDeleteNote, onMove, onSearch } = this;

    return (
      <div className={styles.container}>
        <h1 className={styles.font}>Catatan Ku</h1>
        <div className={styles.searchBar}>
          <div className={styles.searchBarIcon}>
            <i className="bi bi-search"></i>
          </div>
          <div className={styles.searchBarText}>
            <input
              type="text"
              id="cari"
              name="cari"
              onChange={onSearch}
              placeholder="Cari buku/tahun"
            />
          </div>
        </div>
        <div className={styles.notesWrapper}>
          <CatatanInput addNote={onAddNote} />
          <Catatanlist
            notes={notes.filter((note) => note.archived === false)}
            deleteNote={onDeleteNote}
            archivedNote={onArchived}
          />

          <CatatanArsip
            notes={notes.filter((note) => note.archived === true)}
            deleteNote={onDeleteNote}
            moveNote={onMove}
          />
        </div>
      </div>
    );
  }
}

export default CatatanApp;
