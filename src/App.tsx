import React, { Component } from 'react';
import './App.css';
// import Toggle from './components/Toogle'
// import DragNumberInput from "./components/DragNumberInput";
// import TimeInput from "./components/TimeInput";
// import GridKeyboard from "./components/GridKeyboard";
// import { GridCalendar } from './components/GridCalendar';
import { Checkboxes } from './components/Checkboxes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Checkboxes />
      </div>
    );
  }
}

export default App;
