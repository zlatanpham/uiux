import * as React from "react";
import SpeechRecognition from "./SpeechRecognition";

interface Props {
  browserSupportsSpeechRecognition: Boolean;
  startListening:
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  abortListening:
    | ((event: React.MouseEvent<HTMLButtonElement>) => void)
    | undefined;
  listening: Boolean;
  transcript: String;
}
class Dictaphone extends React.Component<Props> {
  render() {
    const {
      transcript,
      startListening,
      listening,
      abortListening,
      browserSupportsSpeechRecognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    return (
      <div>
        {!listening ? (
          <button onClick={startListening}>start</button>
        ) : (
          <button onClick={abortListening}>Stop</button>
        )}
        <span>{transcript}</span>
      </div>
    );
  }
}

export default SpeechRecognition(Dictaphone);
