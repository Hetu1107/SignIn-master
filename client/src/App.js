import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./myComponents/Login";
import Vote from "./myComponents/Vote";
import { createBrowserHistory } from "history";
import ProtectedRoute from "./myComponents/ProtectedRoute";
import HostIt from "./myComponents/HostIt";
import Select from "./myComponents/Select";
import Info from "./myComponents/After_hostit";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/kuch_bhi" component={Info} />
          <ProtectedRoute exact path="/vote" component={Vote} />
          <ProtectedRoute exact path="/select" component={Select} />
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
