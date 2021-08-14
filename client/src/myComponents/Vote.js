import React, { useEffect, useRef, useState } from "react";
import "./vote.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Dat from "./Timer";
import Chart from "./Chart";
import { withRouter } from "react-router-dom";

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      posts: [],
      labels: [],
      count: [],
      available: 0,
      date: "",
      time: "",
      input: "",
    };
  }
  userAuthnticated = () => {
    axios
      .get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (!response.data.auth) {
          console.log(response.data.auth);
          this.props.history.push("/");
        } else {
        }
      });
  };

  componentDidMount = () => {
    this.getPost();
    this.getDate();
    this.getInput();
    this.userAuthnticated();
  };
  checkAvailable = (a) => {
    if (this.state.available !== 1) {
      this.setState({ available: a });
      // console.log(this.state.available);
    }
    // if (this.state.available !== 0) {
    //   this.setState({ available: a });
    //   console.log(this.state.available);
    // }
  };

  getPost = () => {
    axios
      .get("/show/" + localStorage.getItem("VoteId"))
      .then((res) => {
        const data = res.data;
        // console.log(data.length);
        if (res.data.length === 0) {
          window.alert("Invalid ID, please re-confirm with the host.");
          this.props.history.push("/select");
        }
        this.setState({ posts: data });
        // console.log(this.state.posts);
        // console.log("Data has been recieved");
        Object.entries(this.state.posts).map(([key, value]) => {
          this.setState({ labels: [...this.state.labels, value.name] });
        });
        this.state.labels.map((el, key) => {
          axios
            .get("/count/" + el + "/" + localStorage.getItem("VoteId"))
            .then((response) => {
              // console.log(response.data.count);
              this.setState({
                count: [...this.state.count, response.data.count],
              });
              // console.log(this.state.count);
            });
        });
        // console.log(this.state.labels);
      })
      .catch((err) => {
        // console.log(err);
        alert("Error retrieving data");
        this.props.history.push("/");
      });
  };
  getDate = () => {
    axios
      .get("/time/" + localStorage.getItem("VoteId"))
      .then((response) => {
        // console.log("Data is recieved");
        // console.log(response.data[0].date);
        this.setState({
          date: response.data[0].date,
          time: response.data[0].time,
        });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  };

  getInput = () => {
    axios
      .get("/getInput/" + localStorage.getItem("VoteId"))
      .then((response) => {
        this.setState({ input: response.data[0].input });
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  };

  // when voting is over

  submit = async (e) => {
    // console.log(this.state.name);
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          optionSelected: this.state.name,
          email: localStorage.getItem("email"),
          id: localStorage.getItem("VoteId"),
        }),
      });
      const data = await res.json();
      // console.log(data.success);
      if (data.success == null) {
        window.alert("Please select before submitting.");
      } else if (!data.success) {
        window.alert("You can only vote once");
        this.props.history.push("/select");
      } else {
        window.alert("You have voted successfully.");
        this.props.history.push("/select");
      }
    }
  };
  render() {
    return (
      <>
        <div class="dm">
          {this.state.available == 1 ? (
            <>
              <h1 class="result">Final Result</h1>
              <Chart labels={this.state.labels} count={this.state.count} />
            </>
          ) : (
            <div class="dm">
              <Dat
                date={this.state.date}
                time={this.state.time}
                checkAvailable={this.checkAvailable}
              />
              <form method="POST" onSubmit={this.submit}>
                <div className="main-container">
                  <h1>
                    {this.state.input}
                    <i class="far fa-hand-point-down"></i>
                  </h1>
                  <div className="radio-buttons">
                    {Object.entries(this.state.posts).map(([key, value]) => (
                      <label key={key} className="custom-radio">
                        <input
                          type="radio"
                          name="radio"
                          value={value.name}
                          onChange={(e) => {
                            this.setState({ name: e.target.value });
                          }}
                        />
                        <span className="radio-btn">
                          <i className="fas fa-vote-yea"></i>
                          <h2>{value.name}</h2>
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="submit">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default withRouter(Vote);
