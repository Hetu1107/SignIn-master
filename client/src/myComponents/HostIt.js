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
      <div key={i} class="inpu">
        <input
          type="text"
          value={el || ""}
          onChange={this.handleChange.bind(this, i)}
        />
        {/* <input
          type="button"
          value="remove"
          onClick={this.removeClick.bind(this, i)}
        /> */}
        <i
          class="fas fa-times-circle close"
          onClick={this.removeClick.bind(this, i)}
        ></i>
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
          email: localStorage.getItem("email"),
        }),
      });
    });
  }

  render() {
    return (
      <>
        <div class="conta" id="container3">
          <h1>Please fill all the details.</h1>
          <div class="details">
            <div class="batch">
              <h3>Enter ID</h3>
              <input
                type="text"
                name="uniqueId"
                id="Unique"
                value={this.state.id}
                onChange={(e) => this.setState({ id: e.target.value })}
                placeholder="Enter an id"
              />
            </div>
            <h3>Click On add for adding Names.</h3>
            <form>
              {this.createUI()}
              <button
                type="button"
                value="add more"
                onClick={this.addClick.bind(this)}
              >
                Add Name
              </button>
              <button onClick={this.handleSubmit}>Submit</button>
              <button>Back</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default HostIt;
