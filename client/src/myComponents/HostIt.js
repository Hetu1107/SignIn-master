import React from "react";
import "./hostIt.css";
import axios from "axios";
import Auth from "./auth";
import Info from "./After_hostit";
import { set } from "mongoose";
import { withRouter } from "react-router-dom";

class HostIt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      id: "",
      click: 0,
      c: 0,
      date: "",
      time: "",
      input: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  parentCallBack = () => {
    var a = 0;
    this.props.Back(a);
  };

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
    this.setState({ click: this.state.click + 1 });
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
    this.setState({ click: this.state.click - 1 });
  }

  handleSubmit = async (event) => {
    var flag = 0;
    this.state.values.map((el, i) => {
      if (el == "") {
        flag = 1;
      }
    });
    // console.log(this.state.values);
    // console.log(this.state.id);
    event.preventDefault();
    if (this.state.id === "") {
      window.alert("You need to enter an ID");
    } else if (flag == 1) {
      window.alert("You cannot leave the input field empty.");
    } else if (this.state.click === 0 || this.state.click === 1) {
      // console.log("click is", this.state.click);
      window.alert("You need to add atleast two options.");
    } else {
      this.state.values.map((el, i) => {
        axios
          .post("/hoster", {
            id: this.state.id,
            email: localStorage.getItem("email"),
            name: el,
          })
          .then((response) => {
            // console.log(response.data.success);
            if (response.data.success) {
              localStorage.setItem("hostid", this.state.id);
              localStorage.setItem(
                "time",
                "Date: " + this.state.date + " & Time: " + this.state.time
              );
              // window.alert("You have successfully hosted.");
            } else if (!response.data.success) {
              window.alert(
                "This ID cannot be accepted, please choose a different ID."
              );
            }
          })
          .catch((error) => {
            // console.log(error);
          });
      });

      axios
        .post("/input", {
          id: this.state.id,
          input: this.state.input,
          email: localStorage.getItem("email"),
        })
        .then((response) => {
          // console.log(response.data.success);
        });

      axios
        .post("/timer", {
          date: this.state.date,
          time: this.state.time,
          id: this.state.id,
        })
        .then((response) => {
          // console.log(response.data.success);
          if (response.data.success) {
            window.alert("Hosted Successfully");
            Auth.login(() => {
              this.props.history.push("/After_HostIt");
            });
          }
        });
    }
  };
  render() {
    // console.log(this.state.date);
    // console.log(this.state.time);

    return (
      <>
        <div class="conta" id="container3">
          <h1>Please fill all the details.</h1>
          <div class="details">
            <div class="batch">
              <div class="tt">
                <h3>Title of Voting</h3>
                <input
                  type="text"
                  name="title"
                  value={this.state.input}
                  onChange={(e) => this.setState({ input: e.target.value })}
                  id="title"
                  placeholder="Enter title"
                />
              </div>
              <div class="tt">
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
              <div class="d">
                <h3>Choose End Date</h3>
                <input
                  value={this.state.date}
                  onChange={(e) => this.setState({ date: e.target.value })}
                  required
                  type="date"
                />
              </div>
              <div class="t">
                <h3>Choose End Time</h3>
                <input
                  value={this.state.time}
                  onChange={(e) => this.setState({ time: e.target.value })}
                  required
                  type="time"
                />
              </div>
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
              <button type="submit" onClick={this.handleSubmit}>
                Submit
              </button>
              <button onClick={this.parentCallBack}>Back</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(HostIt);
