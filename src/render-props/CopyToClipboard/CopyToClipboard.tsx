import { Component } from 'react';

const copyToClipboard = (content: string) => {
  const textArea = document.createElement('textarea');
  textArea.style.maxHeight = '0px';
  textArea.style.height = '0px';
  textArea.style.opacity = '0';
  textArea.value = content;
  document.body.appendChild(textArea);
  textArea.select();
  window.document.execCommand('copy');
  document.body.removeChild(textArea);
};

interface CopyToClipboardProps {
  copiedCallback?: (content?: string) => void;
  children: (state: CopyToClipboardState) => JSX.Element;
}
interface CopyToClipboardState {
  copied: boolean;
  copy: (content: string) => void;
  turnOffCopied: () => void;
}

class CopyToClipboard extends Component<
  CopyToClipboardProps,
  CopyToClipboardState
> {
  copy = (content: string) => {
    this.setState(
      {
        copied: true,
      },
      () => {
        copyToClipboard(content);
        typeof this.props.copiedCallback === 'function' &&
          this.props.copiedCallback();
      },
    );
  };

  turnOffCopied = () => {
    this.setState({ copied: false });
  };

  state = {
    copied: false,
    copy: this.copy,
    turnOffCopied: this.turnOffCopied,
  };

  render() {
    return this.props.children(this.state);
  }
}

export default CopyToClipboard;
