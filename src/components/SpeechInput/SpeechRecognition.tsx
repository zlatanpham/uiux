// Customized from https://github.com/FoundersFactory/react-speech-recognition/blob/master/src/SpeechRecognition.js
import * as React from "react";

type CallbackFunction =
  | ((event: React.MouseEvent<HTMLButtonElement>) => void)
  | undefined;

export type RenderCallback = (
  args: {
    transcript: String;
    listening: Boolean;
    startListening: CallbackFunction;
    abortListening: CallbackFunction;
    browserSupportsSpeechRecognition: Boolean;
    resetTranscript: CallbackFunction;
    stopListening: CallbackFunction;
    recognition: any;
    interimTranscript: String;
    finalTranscript: String;
  }
) => JSX.Element;

type SpeechRecognitionProps = Partial<{
  children: RenderCallback;
  render: RenderCallback;
}>;

class SpeechRecognition extends React.Component<SpeechRecognitionProps> {
  options = { autoStart: false };
  BrowserSpeechRecognition =
    typeof window !== "undefined" &&
    ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition ||
      (window as any).oSpeechRecognition);
  recognition = this.BrowserSpeechRecognition
    ? new this.BrowserSpeechRecognition()
    : null;

  browserSupportsSpeechRecognition = this.recognition !== null;

  listening = false;

  pauseAfterDisconnect = false;
  interimTranscript = "";
  finalTranscript = "";

  state = {
    interimTranscript: this.interimTranscript,
    finalTranscript: this.finalTranscript,
    listening: false
  };

  componentWillMount() {
    if (this.recognition) {
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onresult = this.updateTranscript.bind(this);
      this.recognition.onend = this.onRecognitionDisconnect.bind(this);
      this.setState({ listening: this.listening });
    }
  }

  disconnect = (disconnectType: String) => {
    if (this.recognition) {
      switch (disconnectType) {
        case "ABORT":
          this.pauseAfterDisconnect = true;
          this.recognition.abort();
          break;
        case "RESET":
          this.pauseAfterDisconnect = false;
          this.recognition.abort();
          break;
        case "STOP":
        default:
          this.pauseAfterDisconnect = true;
          this.recognition.stop();
      }
    }
  };

  onRecognitionDisconnect() {
    this.listening = false;
    if (this.pauseAfterDisconnect) {
      this.setState({ listening: this.listening });
    } else {
      this.startListening();
    }
    this.pauseAfterDisconnect = false;
  }

  updateTranscript(event: any) {
    this.interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.finalTranscript = this.concatTranscripts(
          this.finalTranscript,
          event.results[i][0].transcript
        );
      } else {
        this.interimTranscript = this.concatTranscripts(
          this.interimTranscript,
          event.results[i][0].transcript
        );
      }
    }
    this.setState({
      finalTranscript: this.finalTranscript,
      interimTranscript: this.interimTranscript
    });
  }

  concatTranscripts(...transcriptParts: String[]) {
    return transcriptParts
      .map(t => t.trim())
      .join(" ")
      .trim();
  }

  resetTranscript = () => {
    this.interimTranscript = "";
    this.finalTranscript = "";
    this.disconnect("RESET");
    const { interimTranscript, finalTranscript } = this;
    this.setState({ interimTranscript, finalTranscript });
  };

  startListening = () => {
    if (this.recognition && !this.listening) {
      try {
        this.recognition.start();
      } catch (DOMException) {
        // Tried to start recognition after it has already started - safe to swallow this error
      }
      this.listening = true;
      this.setState({ listening: this.listening });
    }
  };

  abortListening = () => {
    this.listening = false;
    this.setState({ listening: this.listening });
    this.disconnect("ABORT");
  };

  stopListening = () => {
    this.listening = false;
    this.setState({ listening: this.listening });
    this.disconnect("STOP");
  };

  render() {
    const {
      finalTranscript,
      interimTranscript,
      recognition,
      browserSupportsSpeechRecognition,
      resetTranscript,
      startListening,
      abortListening,
      stopListening
    } = this;

    const transcript = this.concatTranscripts(
      finalTranscript,
      interimTranscript
    );

    const { children, render, ...rest } = this.props;

    const renderProps = {
      resetTranscript,
      startListening,
      abortListening,
      stopListening,
      transcript,
      recognition,
      browserSupportsSpeechRecognition,
      ...this.state,
      ...rest
    };

    if (render) {
      return render(renderProps);
    }

    return typeof children === "function" ? children(renderProps) : null;
  }
}

export default SpeechRecognition;
