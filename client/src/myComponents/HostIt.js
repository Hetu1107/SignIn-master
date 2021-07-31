import React from "react";
import "./hostIt.css";

class HostIt extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: [], id: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI() {
    return this.state.values.map((el, i) => (
      <div key={i}>
        <input
          type="text"
          value={el || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        />
      </div>
    ));
  }

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({ values });
  }

  addClick() {
    this.setState((prevState) => ({ values: [...prevState.values, ""] }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.values.join(", "));
    console.log(this.state.values);
    console.log(this.state.id);
    event.preventDefault();
    this.state.values.map((el, i) => {
      const res = fetch("/hoster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.id,
          name: el,
        }),
      });
    });
  }

  render() {
    return (
      <>
        ID:
        <input
          type="text"
          name="uniqueId"
          id="Unique"
          value={this.state.id}
          onChange={(e) => this.setState({ id: e.target.value })}
          placeholder="Enter an id"
        />
        <form onSubmit={this.handleSubmit}>
          {this.createUI()}
          <input
            type="button"
            value="add more"
            onClick={this.addClick.bind(this)}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default HostIt;
