import * as React from 'react';

interface KeyTrapProps {
  children: (stack: string[]) => React.ReactNode;
}

interface KeyTrapState {
  stack: string[];
}

export class KeyTrap extends React.Component<KeyTrapProps, KeyTrapState> {
  state = {
    stack: [],
  };

  handleKeyDown = (e: KeyboardEvent) => {
    this.setState((prevState: KeyTrapState) => {
      if (prevState.stack.indexOf(e.code) === -1) {
        return { stack: [...prevState.stack, e.code] };
      }
      return prevState;
    });
  };

  handleKeyUp = (e: KeyboardEvent) => {
    this.setState((prevState: KeyTrapState) => {
      if (prevState.stack.indexOf(e.code) !== -1) {
        return { stack: prevState.stack.filter(code => code !== e.code) };
      }
      return prevState;
    });
  };

  // Empty the stack if page is not visible (like switching tabs)
  handleVisibilityChange = () => {
    if (document.hidden) {
      this.setState({ stack: [] });
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
      false,
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
      false,
    );
  }

  render() {
    return this.props.children(this.state.stack);
  }
}
