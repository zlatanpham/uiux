import React, { Component } from 'react';
import './App.css';
// import Toggle from './components/Toogle'
// import DragNumberInput from "./components/DragNumberInput";
// import TimeInput from "./components/TimeInput";
// import GridKeyboard from "./components/GridKeyboard";
// import { GridCalendar } from './components/GridCalendar';
import { CopyToClipborad } from './render-props/CopyToClipboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CopyToClipborad />
      </div>
    );
  }
}

export default App;
