import * as React from "react";
import SpeechRecognition from "./SpeechRecognition";
import { RenderCallback } from "./SpeechRecognition";

class Dictaphone extends React.Component {
  render() {
    return (
      <SpeechRecognition>
        {({
          transcript,
          startListening,
          listening,
          abortListening,
          browserSupportsSpeechRecognition
        }) => {
          return browserSupportsSpeechRecognition ? (
            <div>
              {!listening ? (
                <button onClick={startListening}>start</button>
              ) : (
                <button onClick={abortListening}>Stop</button>
              )}
              <span>{transcript}</span>
            </div>
          ) : (
            <div>No Support</div>
          );
        }}
      </SpeechRecognition>
    );
  }
}

export default Dictaphone;
