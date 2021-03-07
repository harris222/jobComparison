import React, {useEffect, useState} from "react";
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
      <Ethan/>
      <Jason/>
      <Harris/>
    </>
  );
}

export default App;
