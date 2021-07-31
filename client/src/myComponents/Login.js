import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { withRouter } from "react-router-dom";
import Auth from "./auth";

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
      <div>
        <GoogleLogin
          clientId="777048971525-qs4i92dmm3iv9h5ng7s82r7bmv4ja1ou.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
};

export default withRouter(login);
