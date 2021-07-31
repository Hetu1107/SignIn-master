import React from "react";
import { useState } from "react";
import HostIt from "./HostIt";

export default function Select() {
  const [a, setA] = useState(0);
  const [id, setId] = useState("");
  const Vote = () => {
    setA(1);
  };
  const submitVote = () => {
    localStorage.setItem("VoteId", id);
    window.location.assign("/vote");
  };

  const Host = () => {
    setA(2);
  };

  return (
    <>
      <div class="container">
        <div class="img">
          <img src="/logo/voting_logo.png" alt="" />
        </div>
        <h1>E-Voting</h1>
        {a === 0 ? (
          <div>
            <button type="submit" onClick={Vote}>
              Vote
            </button>
            <button type="submit" onClick={Host}>
              Host
            </button>
          </div>
        ) : a === 1 ? (
          <>
            Enter Id given by host:
            <input
              type="text"
              value={id}
              name="id"
              id="id"
              onChange={(e) => setId(e.target.value)}
            />
            <button type="submit" onClick={submitVote}>
              Vote Now
            </button>
          </>
        ) : a === 2 ? (
          <HostIt />
        ) : null}
      </div>
    </>
  );
}
