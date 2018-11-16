import * as React from "react";
import { css } from "emotion";
import * as CSS from "csstype";

interface Props {
  onChange?: (value: string) => void;
  value?: string;
  containerStyle?: CSS.Properties;
  inputStyle?: CSS.Properties;
  placeholderStyle?: CSS.Properties;
}

class TimeInput extends React.Component<Props> {
  static defaultProps = {
    containerStyle: {},
    inputStyle: {},
    placeholderStyle: {}
  };

  prevValue = "";
  placeholder = "HH:MM:SS";

  state: { value: string } = {
    value: this.props.value || ""
  };

  // Only allow 0-9 and :
  onKeyPress = (e: KeyboardEvent) => {
    if (e.which < 48 || e.which > 58) {
      e.preventDefault();
    }
  };

  getText = (origin: string) => (
    <>
      <span style={{ opacity: 0 }}>{origin}</span>
      {this.placeholder.slice(origin.length)}
    </>
  );

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value.length === 1 && !/^[0-2]$/.test(value)) {
      value = "";
    } else if (value.length === 2) {
      if (!/^(2[0-3]|[0-1][0-9])$/.test(value)) {
        value = value.substring(0, 1);
      } else if (this.prevValue.length !== 3) {
        value = value + ":";
      }
    } else if (value.length === 3 && !/^(2[0-3]|[0-1][0-9]):$/.test(value)) {
      if (
        /^(2[0-3]|[0-1][0-9])$/.test(this.prevValue) &&
        /^(2[0-3]|[0-1][0-9])[0-5]$/.test(value)
      ) {
        value = value.substring(0, 2) + ":" + value.substring(2);
      } else {
        value = this.prevValue;
      }
    } else if (
      value.length === 4 &&
      !/^(2[0-3]|[0-1][0-9]):[0-5]$/.test(value)
    ) {
      value = this.prevValue;
    } else if (value.length === 5) {
      if (!/^(2[0-3]|[0-1][0-9]):[0-5][0-9]$/.test(value)) {
        value = value.substring(0, 5);
      } else if (this.prevValue.length !== 6) {
        value = value + ":";
      }
    } else if (
      value.length === 6 &&
      !/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:$/.test(value)
    ) {
      if (
        /^(2[0-3]|[0-1][0-9]):[0-5][0-9]$/.test(this.prevValue) &&
        /^(2[0-3]|[0-1][0-9]):[0-5][0-9][0-5]$/.test(value)
      ) {
        value = value.substring(0, 5) + ":" + value.substring(5);
      } else {
        value = this.prevValue;
      }
    } else if (
      value.length === 7 &&
      !/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5]$/.test(value)
    ) {
      value = this.prevValue;
    } else if (
      value.length === 8 &&
      !/^(2[0-3]|[0-1][0-9]):[0-5][0-9]:[0-5][0-9]$/.test(value)
    ) {
      value = this.prevValue;
    } else if (value.length > 8) {
      value = this.prevValue;
    }

    this.prevValue = value;
    this.setState({ value }, () => {
      if (typeof this.props.onChange === "function") {
        this.props.onChange(value);
      }
    });
  };

  render() {
    return (
      <div
        className={css({
          position: "relative",
          width: "100px",
          ...this.props.containerStyle
        })}
      >
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          className={css({
            width: "100%",
            paddingLeft: "10px",
            fontSize: "16px",
            ...this.props.inputStyle
          })}
        />
        <span
          className={css({
            position: "absolute",
            left: "10px",
            opacity: 0.5,
            top: "50%",
            fontSize: "16px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            ...this.props.placeholderStyle
          })}
        >
          {this.getText(this.state.value)}
        </span>
      </div>
    );
  }
}

export default TimeInput;
