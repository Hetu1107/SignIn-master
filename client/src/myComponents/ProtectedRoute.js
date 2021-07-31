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
          window.alert("please login before entering the vote web-app");
          return (
            <Redirect
              to={{
                pathname: "/",
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
