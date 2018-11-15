import React, { Component } from "react";
import "./App.css";
// import Toggle from './components/Toogle'
import DragNumberInput from "./components/DragNumberInput";

class App extends Component {
  render() {
    return (
      <div className="App">
        <DragNumberInput min={0} max={100} />
      </div>
    );
  }
}

export default App;
