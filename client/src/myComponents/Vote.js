import React from "react";
import "./vote.css";
import { GoogleLogout } from "react-google-login";
import Auth from "./auth";
import axios from "axios";

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
      .get("http://localhost:3000/show/" + "rst02")
      .then((res) => {
        const data = res.data;
        console.log(data[0].name);
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
    console.log(
      window.gapi.auth2.getAuthInstance().currentUser.Td.profileObj.email
    );

    e.preventDefault();
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        optionSelected: this.state.name,
        email:
          window.gapi.auth2.getAuthInstance().currentUser.Td.profileObj.email,
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

  signOut = (res) => {
    Auth.logout(() => {
      this.props.history.push("/");
    });
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
      console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };
  render() {
    return (
      <>
        <div>
          <form method="POST" onSubmit={this.submit}>
            <div className="main-container">
              <h1>Please choose your valuable Vote !! <i class="far fa-hand-point-down"></i></h1>
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
      </>
    );
  }
}

export default Vote;
