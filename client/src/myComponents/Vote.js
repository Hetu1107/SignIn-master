import React, { useEffect, useRef, useState } from "react";
import "./vote.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Dat from "./Timer";
import Chart from "./Chart";

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
    };
  }

  componentDidMount = () => {
    this.getPost();
    this.getDate();
    // this.getInput();
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
        this.setState({ posts: data });
        console.log(this.state.posts);
        console.log("Data has been recieved");
        Object.entries(this.state.posts).map(([key, value]) => {
          this.setState({ labels: [...this.state.labels, value.name] });
        });
        this.state.labels.map((el, key) => {
          axios
            .get("/count/" + el + "/" + localStorage.getItem("VoteId"))
            .then((response) => {
              console.log(response.data.count);
              this.setState({
                count: [...this.state.count, response.data.count],
              });
              console.log(this.state.count);
            });
        });
        console.log(this.state.labels);
        console.log(localStorage.getItem("available"));
      })
      .catch(() => {
        alert("Error retrieving data");
      });
  };
  getDate = () => {
    axios.get("/time/" + localStorage.getItem("VoteId")).then((response) => {
      console.log("Data is recieved");
      // console.log(response.data[0].date);
      this.setState({
        date: response.data[0].date,
        time: response.data[0].time,
      });
    });
  };

  // getInput = () => {
  //   axios
  //     .get("/getInput/" + localStorage.getItem("VoteId"))
  //     .then((response) => {
  //       this.setState({ input: response.data[0].input });
  //     });
  // };

  // when voting is over

  submit = async (e) => {
    console.log(this.state.name);
    e.preventDefault();
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
    console.log(data.success);
    if (data.success == null) {
      window.alert("Please select before submitting.");
    } else if (!data.success) {
      window.alert("You can only vote once");
      window.location.assign("/");
    } else {
      window.alert("You have voted successfully.");
      window.location.assign("/");
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
                    Please choose your valuable Vote !!
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
export default Vote;
