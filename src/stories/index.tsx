import * as React from "react";
import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import DragNumberInput from "../components/DragNumberInput";

storiesOf("Inputs", module).add("Drag Number Input", () => (
  <div>
    <h4>Speed 50</h4>
    <DragNumberInput min={0} max={200} speed={50} />
    <h4>Speed 200</h4>
    <DragNumberInput min={0} max={200} speed={200} />
  </div>
));
