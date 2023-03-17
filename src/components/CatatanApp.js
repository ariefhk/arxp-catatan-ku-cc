import React from "react";
import { getData } from "../utils/data";
import CatatanInput from "./CatatatnInput";
import Catatanlist from "./CatatanList";

class CatatanApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getData(),
    };
    this.onAddNote = this.onAddNote.bind(this);
    this.onDeleteNote = this.onDeleteNote.bind(this);
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

  render() {
    const { notes } = this.state;

    return (
      <div className="catatan-app">
        <h1>Catatan Ku</h1>
        <div className="catatan-app__wrapper">
          <CatatanInput addNote={this.onAddNote} />
          <Catatanlist notes={notes} deleteNote={this.onDeleteNote} />
        </div>
      </div>
    );
  }
}

export default CatatanApp;
