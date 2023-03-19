import React from "react";
import styles from "./style.module.css";

export default class CatatanInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onLimitChar = this.onLimitChar.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onClearForm = this.onClearForm.bind(this);
  }

  onChangeHandler(event) {
    let nameInput = event.target.name;
    let value = event.target.value;

    if (!value || value.trim() === "") alert("Input Data Terlebih Dahulu!");

    if (nameInput === "title") {
      this.setState({ ...this.state, title: value });
    } else if (nameInput === "body") {
      this.setState({ ...this.state, body: value });
    }
  }

  onLimitChar(text) {
    let maxLength = 50 - text.length;

    if (maxLength <= 0) {
      alert("Karakter Anda Melebihi batas!");
      this.setState({ title: "" });
    }
    return maxLength;
  }

  onClearForm() {
    this.setState({
      title: "",
      body: "",
    });
  }

  onHandleSubmit(event) {
    event.preventDefault();
    let value = event.target.value;

    if (!value || value.trim() === "") {
      alert("Input Semua Data Terlebih Dahulu!");
      this.onClearForm();
      return;
    }
    this.props.addNote(this.state);
    this.onClearForm();
  }

  render() {
    const { title, body } = this.state;
    const { onChangeHandler, onHandleSubmit, onLimitChar } = this;

    return (
      <div className={styles.formContainer}>
        <h2>Tambah Catatan</h2>
        <form className={styles.formBody} onSubmit={onHandleSubmit}>
          <div className={styles.formInputContainer}>
            <label htmlFor="title">Judul</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={onChangeHandler}
            />
          </div>
          <p className={styles.titleLength}>
            Sisa Karakter: {onLimitChar(title)}
          </p>
          <div className={styles.formInputContainer}>
            <label htmlFor="body">Catatan</label>
            <textarea
              name="body"
              id="body"
              cols="24"
              rows="5"
              value={body}
              onChange={onChangeHandler}
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
