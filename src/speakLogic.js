import {
  playByeLineGlados,
  playEndLineGlados,
  playPauseLineGlados,
  playResetLineGlados,
  playRestSessionStartLineGlados,
  playRestSkipLineGlados,
  playResumeLineGlados,
  playSettingsLineGlados,
  playStartLineGlados,
  playWelcomeLineGlados,
  playWorkSessionStartLineGlados,
  speakOppertunityGlados,
} from "./speakLogic/speakLogicGlados";

export const speakOppertunity = ({
  hours,
  minutes,
  seconds,
  halfWayPoint,
  isSpeaking,
  setIsSpeaking,
  isPomodoro,
  pomodoroIsWork,
  setSubtitle,
  currentTimer,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      speakOppertunityGlados({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        halfWayPoint: halfWayPoint,
        isSpeaking: isSpeaking,
        setIsSpeaking: setIsSpeaking,
        isPomodoro: isPomodoro,
        pomodoroIsWork: pomodoroIsWork,
        setSubtitle: setSubtitle,
      });
      break;
  }
};

export const playStartLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
  setSubtitle,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playStartLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
        setSubtitle: setSubtitle,
      });
      break;
  }
};

export const playWorkSessionStartLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playWorkSessionStartLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
      });
      break;
  }
};

export const playRestSessionStartLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playRestSessionStartLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
      });
      break;
  }
};

export const playRestSkipLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playRestSkipLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
      });
      break;
  }
};

export const playEndLine = ({ setIsSpeaking, setSubtitle, currentTimer }) => {
  switch (currentTimer) {
    case "GLaDOS":
      playEndLineGlados({
        setIsSpeaking: setIsSpeaking,
        setSubtitle: setSubtitle,
      });
      break;
  }
};

export const playPauseLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
  setSubtitle,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playPauseLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
        setSubtitle: setSubtitle,
      });
      break;
  }
};

export const playResumeLine = ({ setIsSpeaking, isSpeaking, currentTimer }) => {
  switch (currentTimer) {
    case "GLaDOS":
      playResumeLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
      });
      break;
  }
};

export const playWelcomeLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
  setSubtitle,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playWelcomeLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
        setSubtitle: setSubtitle,
      });
      break;
  }
};

export const playSettingsLine = ({
  setIsSpeaking,
  isSpeaking,
  currentTimer,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playSettingsLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
      });
      break;
  }
};

export const playResetLine = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
  currentTimer,
}) => {
  switch (currentTimer) {
    case "GLaDOS":
      playResetLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
        setSubtitle: setSubtitle,
      });
      break;
  }
};

export const playByeLine = ({ setIsSpeaking, isSpeaking, currentTimer }) => {
  switch (currentTimer) {
    case "GLaDOS":
      playByeLineGlados({
        setIsSpeaking: setIsSpeaking,
        isSpeaking: isSpeaking,
      });
      break;
  }
};
