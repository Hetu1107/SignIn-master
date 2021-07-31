import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { withRouter } from "react-router-dom";
import Auth from "./auth";
import "./login.css";
import logo from "./voting_logo.png";

const login = (props) => {
  const signOut = (res) => {
    Auth.logout(() => {
      props.history.push("/");
    });
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
      console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  };

const responseGoogle = (res) => {
    console.log(res);
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    if (res.profileObj.email.includes("iiitsurat.ac.in")) {
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        Auth.login(() => {
          props.history.push("/vote");
        });
      }
    } else {
      window.alert("Please login using institute id");
      signOut();
    }
  };

  return (
    <>
    <div className="heading">
      <h1>Hello Friends !</h1>
      <h1>Please login through your institute gmail ID. <i class="fas fa-vote-yea"></i></h1>
    </div>
    <div class="container">
        <div class="card">
          <div class="content">
            <div class="img">
              <img
                src = {logo}
                alt=""
              />
            </div>
            <div class="contentBx">
              <h3>
                E-Voting.<br/><br/>
                <span>मतदान आपका हक, गर्व से वोट दें |</span>
              </h3>
            </div>
          </div>
          {/* <button type="submit" class="submit"><i class="fab fa-google"></i> google</button> */}
          <div class="google">
        <GoogleLogin  
          clientId="777048971525-qs4i92dmm3iv9h5ng7s82r7bmv4ja1ou.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
        </div>
        </div>
      </>
  );
};

export default withRouter(login);
