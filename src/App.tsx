import React, { Component } from 'react';
import './App.css';
// import Toggle from './components/Toogle'
// import DragNumberInput from "./components/DragNumberInput";
// import TimeInput from "./components/TimeInput";
// import GridKeyboard from "./components/GridKeyboard";
// import { GridCalendar } from './components/GridCalendar';
import AnimatedCards from './components/AnimatedCards';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AnimatedCards />
      </div>
    );
  }
}

export default App;
