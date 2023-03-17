import React from "react";

export default class CatatanInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
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

    if (nameInput === "date") {
      this.setState({ ...this.state, date: value });
      console.log("value Date: ", value);
    } else if (nameInput === "title") {
      this.setState({ ...this.state, title: value });
      console.log("value Title: ", value);
    } else if (nameInput === "note") {
      this.setState({ ...this.state, note: value });
      console.log("value Note: ", value);
    }
  }

  onClearForm() {
    this.setState({
      date: "",
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
    const { date, title, note } = this.state;

    return (
      <div className="catatan-form">
        <h2>Tambah Catatan</h2>
        <form className="catatan-form__body" onSubmit={this.onHandleSubmit}>
          <div className="catatan-form__body__box">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="catatan-form__body__box">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.onChangeHandler}
            />
          </div>

          <div className="catatan-form__body__box">
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
