import React, { useEffect, useRef, useState } from "react";
import "./vote.css";
import axios from "axios";
import { Pie } from 'react-chartjs-2';
import Dat from "./Timer"; 

class Vote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      posts: [],
    };
  }

  componentDidMount = () => {
    this.getPost();
  };

  getPost = () => {
    axios
      .get("http://localhost:3000/show/" + localStorage.getItem("VoteId"))
      .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
        console.log(this.state.posts);
        this.setState({ posts: data });
        console.log("Data has been recieved");
      })
      .catch(() => {
        alert("Error retrieving data");
      });
  };

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
      <Dat/>

      <div class="chart">
            <Pie 
                data = {{
                    labels: ['hetu', 'mohit', 'zaid','xyz','he','fr','he'],
                    datasets: [
                        {
                            label: '# no. of votes',
                            data: [20, 10, 3,20,10,20,50],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        },
                        // {
                        //     label: 'Quantity',
                        //     data: [100, 104, 67, 87, 27],
                        //     backgroundColor: [
                        //         'rgba(255, 99, 132, 1)',
                        //         'rgba(54, 162, 235, 1)',
                        //         'rgba(255, 206, 86, 1)',
                        //         'rgba(75, 192, 192, 1)',
                        //         'rgba(153, 102, 255, 1)',
                        //         'rgba(255, 159, 64, 1)'
                        //     ],
                        //     borderColor: [
                        //         'rgba(255, 99, 132, 0.4)',
                        //         'rgba(54, 162, 235, 0.4)',
                        //         'rgba(255, 206, 86, 0.4)',
                        //         'rgba(75, 192, 192, 0.4)',
                        //         'rgba(153, 102, 255, 0.4)',
                        //         'rgba(255, 159, 64, 0.4)'
                        //     ],
                        //     borderWidth: 10
                        // }
                    ]
                }}
                height={400}
                width = {600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
        <div>
          <form method="POST" onSubmit={this.submit}>
            <div className="main-container">
              <h1>
                Please choose your valuable Vote !!{" "}
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
        </div>
      </>
    );
  }
}
export default Vote;
