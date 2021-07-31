import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./myComponents/Login";
import Vote from "./myComponents/Vote";
import { createBrowserHistory } from "history";
import ProtectedRoute from "./myComponents/ProtectedRoute";
import Host from "./myComponents/Host";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/vote" component={Vote} />
          <Route exact path="/host" component={Host} />
          <Route path="*">
            Page Not Found <br />
            <button onClick={() => window.location.assign("/")}>
              Back to Home
            </button>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
