import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from "@storybook/addon-actions";
import DragNumberInput from '../components/DragNumberInput';
import TimeInput from '../components/TimeInput';
import GridKeyboard from '../components/GridKeyboard';

const inputStories = storiesOf('Inputs', module);

inputStories.add('Drag Number Input', () => (
  <div>
    <h4>Speed 50</h4>
    <DragNumberInput min={0} max={200} speed={50} />
    <h4>Speed 200</h4>
    <DragNumberInput min={0} max={200} speed={200} />
  </div>
));

inputStories.add('Time Input', () => (
  <div>
    <h4>Default</h4>
    <TimeInput />
  </div>
));

const uiStories = storiesOf('UI', module);

uiStories.add('Grid Keyboard', () => (
  <div>
    <GridKeyboard />
  </div>
));
