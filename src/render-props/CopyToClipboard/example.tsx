import React, { Component } from 'react';
import CopyToClipboard from './CopyToClipboard';

class Example extends Component {
  state = {
    value: '',
  };
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <div>
        <input value={this.state.value} onChange={this.handleInputChange} />
        <CopyToClipboard>
          {({ copied, copy, turnOffCopied }) => (
            <>
              {this.state.value &&
                (copied ? (
                  <span>copied</span>
                ) : (
                  <button
                    onClick={() => {
                      copy(this.state.value);
                      setTimeout(() => {
                        turnOffCopied();
                      }, 2000);
                    }}
                  >
                    Copy to clipboard
                  </button>
                ))}
            </>
          )}
        </CopyToClipboard>
      </div>
    );
  }
}

export default Example;
