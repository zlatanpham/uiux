import React, { Component } from "react";
import "./App.css";
// import Toggle from './components/Toogle'
// import DragNumberInput from "./components/DragNumberInput";
import TimeInput from "./components/TimeInput";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimeInput />
      </div>
    );
  }
}

export default App;
