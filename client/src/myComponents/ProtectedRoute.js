import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          // window.alert("Please enter a vote Id, given by host.");
          return (
            <Redirect
              to={{
                pathname: "/select",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
