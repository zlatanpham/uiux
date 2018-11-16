// Customized from https://github.com/FoundersFactory/react-speech-recognition/blob/master/src/SpeechRecognition.js
import * as React from "react";

interface SpeechRecognitionProps {
  options?: any;
}

const SpeechRecognition = (WrappedComponent: typeof React.Component) => {
  const options = { autoStart: false };

  const BrowserSpeechRecognition =
    typeof window !== "undefined" &&
    ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition ||
      (window as any).oSpeechRecognition);
  const recognition = BrowserSpeechRecognition
    ? new BrowserSpeechRecognition()
    : null;
  const browserSupportsSpeechRecognition = recognition !== null;
  let listening: Boolean;
  if (
    !browserSupportsSpeechRecognition ||
    (options && options.autoStart === false)
  ) {
    listening = false;
  } else {
    recognition.start();
    listening = true;
  }
  let pauseAfterDisconnect = false;
  let interimTranscript = "";
  let finalTranscript = "";

  return class SpeechRecognitionContainer extends React.Component<any, any> {
    state = {
      interimTranscript,
      finalTranscript,
      listening: false
    };

    componentWillMount() {
      if (recognition) {
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = this.updateTranscript.bind(this);
        recognition.onend = this.onRecognitionDisconnect.bind(this);
        this.setState({ listening });
      }
    }

    disconnect = (disconnectType: String) => {
      if (recognition) {
        switch (disconnectType) {
          case "ABORT":
            pauseAfterDisconnect = true;
            recognition.abort();
            break;
          case "RESET":
            pauseAfterDisconnect = false;
            recognition.abort();
            break;
          case "STOP":
          default:
            pauseAfterDisconnect = true;
            recognition.stop();
        }
      }
    };

    onRecognitionDisconnect() {
      listening = false;
      if (pauseAfterDisconnect) {
        this.setState({ listening });
      } else {
        this.startListening();
      }
      pauseAfterDisconnect = false;
    }

    updateTranscript(event: any) {
      interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript = this.concatTranscripts(
            finalTranscript,
            event.results[i][0].transcript
          );
        } else {
          interimTranscript = this.concatTranscripts(
            interimTranscript,
            event.results[i][0].transcript
          );
        }
      }
      this.setState({ finalTranscript, interimTranscript });
    }

    concatTranscripts(...transcriptParts: String[]) {
      return transcriptParts
        .map(t => t.trim())
        .join(" ")
        .trim();
    }

    resetTranscript = () => {
      interimTranscript = "";
      finalTranscript = "";
      this.disconnect("RESET");
      this.setState({ interimTranscript, finalTranscript });
    };

    startListening = () => {
      if (recognition && !listening) {
        try {
          recognition.start();
        } catch (DOMException) {
          // Tried to start recognition after it has already started - safe to swallow this error
        }
        listening = true;
        this.setState({ listening });
      }
    };

    abortListening = () => {
      listening = false;
      this.setState({ listening });
      this.disconnect("ABORT");
    };

    stopListening = () => {
      listening = false;
      this.setState({ listening });
      this.disconnect("STOP");
    };

    render() {
      const transcript = this.concatTranscripts(
        finalTranscript,
        interimTranscript
      );

      return (
        <WrappedComponent
          resetTranscript={this.resetTranscript}
          startListening={this.startListening}
          abortListening={this.abortListening}
          stopListening={this.stopListening}
          transcript={transcript}
          recognition={recognition}
          browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
};

export default SpeechRecognition;
