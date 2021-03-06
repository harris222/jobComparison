import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg'
import Ethan from "./pages/Ethan"
import Jason from "./pages/Jason"
import Harris from "./pages/Harris"

import './App.css';

function getData() {
  return fetch('/data', {
    method: "GET",
    headers: { "Content-Type" : "application/json" }  
  })
  .then(data => data.json())
}

function App() {
    const [list, setList] = useState({});

    useEffect(() => {
        getData()
          .then(items => {
            setList(items)
          })
    }, [])
    console.log(list.length)
  return (
  <>
  <Router>
    <div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/Ethan">Home</Link>
          </li>
          <li>
            <Link to="/Jason">About</Link>
          </li>
          <li>
            <Link to="/Harris">Users</Link>
          </li>
        </ul>
      </nav> */}

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/Ethan">
          <Ethan />
        </Route>
        <Route path="/Jason">
          <Jason />
        </Route>
        <Route path="/Harris">
          <Harris />
        </Route>
      </Switch>
    </div>
  </Router>
  </>
  );
}

export default App;
