import React from "react";
import { useState } from "react";
import HostIt from "./HostIt";
import logo from "./voting_logo.png";
import Auth from "./auth";
import { withRouter } from "react-router-dom";

function Select(props) {
  const [a, setA] = useState(0);
  const [id, setId] = useState("");
  const Vote = () => {
    setA(1);
  };
  const Back = (a) => {
    setA(a);
    // console.log(a);
  };
  const submitVote = () => {
    localStorage.setItem("VoteId", id);
    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      Auth.login(() => {
        props.history.push("/vote");
      });
    }
  };

  const Host = () => {
    setA(2);
  };

  return (
    <>
      <div class="main">
        {a === 0 ? (
          <div class="contai">
            <div class="img">
              <img src={logo} alt="" />
            </div>
            <h1>E-Voting</h1>
            <div class="button">
              <button type="submit" onClick={Vote}>
                Vote
              </button>
              <button type="submit" onClick={Host}>
                Host
              </button>
            </div>
          </div>
        ) : a === 1 ? (
          <>
            <div class="contai">
              <div class="img">
                <img src={logo} alt="" />
              </div>
              <div class="enter" id="id">
                <h3>Enter Id given by host</h3>
                <input
                  type="text"
                  value={id}
                  name="id"
                  id="id"
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div class="button">
                <button onClick={submitVote}>Vote Now</button>
                <button onClick={() => setA(0)}>Back</button>
              </div>
            </div>
          </>
        ) : a === 2 ? (
          <div class="hosti">
            <HostIt Back={Back} />
          </div>
        ) : null}
      </div>
    </>
  );
}
export default withRouter(Select);
