import React from "react";
import styles from "./style.module.css";

export default class CatatanInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      note: "",
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onClearForm = this.onClearForm.bind(this);
  }

  onChangeHandler(event) {
    let nameInput = event.target.name;
    let value = event.target.value;

    if (nameInput === "title") {
      this.setState({ ...this.state, title: value });
      console.log("value Title: ", value);
    } else if (nameInput === "note") {
      this.setState({ ...this.state, note: value });
      console.log("value Note: ", value);
    }
  }

  onClearForm() {
    this.setState({
      title: "",
      note: "",
      isUpdate: false,
    });
  }

  onHandleSubmit(event) {
    event.preventDefault();
    this.props.addNote(this.state);
    this.onClearForm();
  }

  render() {
    const { title, note } = this.state;

    return (
      <div className={styles.formContainer}>
        <h2>Tambah Catatan</h2>
        <form className={styles.formBody} onSubmit={this.onHandleSubmit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className={styles.formInputContainer}>
            <label htmlFor="note">Note</label>
            <textarea
              name="note"
              id="note"
              cols="24"
              rows="6"
              value={note}
              onChange={this.onChangeHandler}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
