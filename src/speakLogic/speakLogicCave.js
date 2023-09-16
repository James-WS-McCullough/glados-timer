import {
  numberLinesThatAreAlwaysSingular,
  randomLineTimePosition,
  subtitles,
} from "../constants";
import { padNumber } from "../utils";

const checkSpesificCasesCave = ({
  hours,
  minutes,
  seconds,
  halfWayPoint,
  setIsSpeaking,
  setSubtitle,
}) => {
  // We need to check for 5, 4, 3, 2 and 1 hour, 45, 30, 25, 20, 15, 10, 8, 6, 5, 4, 3, 2, 1 minute.
  if (hours === 5 && minutes === 0 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_5Hours",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 4 && minutes === 0 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_4Hours",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 3 && minutes === 0 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_3Hours",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 2 && minutes === 0 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_2Hours",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 1 && minutes === 0 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_1Hour",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 45 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_45Minutes",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 30 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_30Minutes",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 25 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_25Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 20 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_20Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 15 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_15Minutes",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 10 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_10Minutes",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 8 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_8Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 6 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_6Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 5 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_5Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 4 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_4Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 3 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_3Minutes",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 2 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_2Minutes",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 1 && seconds === 0) {
    playSpesificLineRandom({
      line: "Cave_Line_1Minute",
      maxNumber: 1,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  return false;
};

export const speakOppertunityCave = ({
  hours,
  minutes,
  seconds,
  halfWayPoint,
  isSpeaking,
  setIsSpeaking,
  isPomodoro,
  pomodoroIsWork,
  setSubtitle,
}) => {
  // If the time equals the half way point, play the half way point sound
  if (isSpeaking) return;

  const isSpesificCase = checkSpesificCasesCave({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    halfWayPoint: halfWayPoint,
    setIsSpeaking: setIsSpeaking,
    setSubtitle: setSubtitle,
  });
  if (isSpesificCase) {
    setIsSpeaking(true);
    return;
  }
};

export const playStartLineCave = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
  hours,
  minutes,
  seconds,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);

  console.log(hours, minutes, seconds);

  if (hours >= 5) {
    playSpesificLineRandom({
      line: "Cave_Line_MoreThan5Hours",
      maxNumber: 2,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return;
  }

  playSpesificLineRandom({
    line: "Cave_Line_Start",
    maxNumber: 3,
    setSubtitle,
    callback: () => setIsSpeaking(false),
  });
};

export const playWorkSessionStartLineCave = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_PomoLine_WorkStart",
    maxNumber: 8,
    callback: () => setIsSpeaking(false),
  });
};

export const playRestSessionStartLineCave = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_PomoLine_RestStart",
    maxNumber: 5,
    callback: () => setIsSpeaking(false),
  });
};

export const playRestSkipLineCave = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_PomoLine_SkipRest",
    maxNumber: 3,
    callback: () => setIsSpeaking(false),
  });
};

export const playEndLineCave = ({ setIsSpeaking, setSubtitle }) => {
  setIsSpeaking(true);

  playSpesificLineRandom({
    line: "TimeUp_Sound",
    maxNumber: 13,
    callback: () => {
      playSpesificLineRandom({
        line: "Cave_Line_TimeUp",
        maxNumber: 2,
        setSubtitle,
        callback: () => setIsSpeaking(false),
      });
    },
  });
};

export const playPauseLineCave = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  const lineNumber = Math.floor(Math.random() * 8) + 1;

  setSubtitle(subtitles["Glados_Line_Pause_" + lineNumber]);
  playSound({
    sound: `Glados_Line_Pause_${lineNumber}`,
    callback: () => setIsSpeaking(false),
  });
};

export const playResumeLineCave = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Resume",
    maxNumber: 10,
    callback: () => setIsSpeaking(false),
  });
};

export const playWelcomeLineCave = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Cave_Line_Welcome",
    maxNumber: 1,
    callback: () => setIsSpeaking(false),
    setSubtitle,
  });
};

export const playSettingsLineCave = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Settings",
    maxNumber: 3,
    callback: () => setIsSpeaking(false),
  });
};

export const playResetLineCave = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Reset",
    maxNumber: 3,
    setSubtitle,
    callback: () => setIsSpeaking(false),
  });
};

export const playByeLineCave = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Bye",
    maxNumber: 2,
    callback: () => setIsSpeaking(false),
  });
};

const playSpesificLineRandom = ({ line, maxNumber, setSubtitle, callback }) => {
  // Random number min 1 max maxNumber
  const randomNum = Math.floor(Math.random() * maxNumber) + 1;

  if (setSubtitle) setSubtitle(subtitles[`${line}_${randomNum}`]);

  playSound({
    sound: `${line}_${randomNum}`,
    callback: callback,
  });
};

const createTimeString = ({ hours, minutes, seconds, isSingular }) => {
  let timeString = "";
  if (hours) {
    timeString += hours + (hours == 1 || isSingular ? " hour" : "hours");
  }
  if (hours && (minutes || seconds)) {
    timeString += " and ";
  }
  if (minutes) {
    timeString +=
      minutes + (minutes == 1 || isSingular ? " minute" : " minutes");
  }
  if (minutes && seconds) {
    timeString += " and ";
  }
  if (seconds) {
    timeString +=
      seconds + (seconds == 1 || isSingular ? " second" : " seconds");
  }
  return timeString;
};

const playRandomNumberLine = ({
  minutes,
  hours,
  seconds,
  setSubtitle,
  callback,
}) => {
  // Random number min 1 max 16
  const randomNum = Math.floor(Math.random() * 16) + 1;

  const isSingular = numberLinesThatAreAlwaysSingular.includes(randomNum);

  // Set the subtitle to the random number line with the time in the middle
  setSubtitle(
    subtitles["Glados_NumberLine_Start_" + randomNum] +
      createTimeString({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        isSingular,
      }) +
      subtitles["Glados_NumberLine_End_" + randomNum]
  );

  // Play the intro sound, on callback play the time sound, on callback play the outro sound
  playIntroSound({
    number: randomNum,
    callback: () =>
      playTimeSound({
        minutes: minutes,
        hours: hours,
        seconds: seconds,
        isSingular: isSingular,
        callback: () =>
          playOutroSound({ number: randomNum, callback: callback }),
      }),
  });
};

const playSimpleTimeAndRandomLine = ({
  minutes,
  hours,
  seconds,
  setSubtitle,
  callback,
}) => {
  const lineNumber = Math.floor(Math.random() * 42) + 1;

  let playBefore = true;
  if (randomLineTimePosition?.[lineNumber] === "a") {
    playBefore = false;
  } else if (randomLineTimePosition?.[lineNumber] === "e") {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    if (randomNum === 1) {
      playBefore = false;
    }
  }

  if (playBefore) {
    setSubtitle(
      createTimeString({ hours: hours, minutes: minutes, seconds: seconds }) +
        " " +
        subtitles["Glados_Line_Random_" + lineNumber]
    );
  } else {
    setSubtitle(
      subtitles["Glados_Line_Random_" + lineNumber] +
        " " +
        createTimeString({ hours: hours, minutes: minutes, seconds: seconds })
    );
  }

  if (playBefore) {
    playSimpleTime({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      callback: () => {
        playSound({
          sound: `Glados_Line_Random_${lineNumber}`,
          callback: callback,
        });
      },
    });
  } else {
    playSound({
      sound: `Glados_Line_Random_${lineNumber}`,
      callback: () => {
        playSimpleTime({
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          callback: callback,
        });
      },
    });
  }
};

const justPlayRandomLine = ({ setSubtitle, callback }) => {
  playSpesificLineRandom({
    line: "Glados_Line_Random",
    maxNumber: 42,
    setSubtitle,
    callback: callback,
  });
};

const playSimpleTime = ({ hours, minutes, seconds, callback }) => {
  // Random number min 1 max 3
  const randomIntroNum = Math.floor(Math.random() * 3) + 1;
  const randomOutroNum = Math.floor(Math.random() * 3) + 1;
  const introSound = `Glados_SimpleTime_Start_${randomIntroNum}`;
  const outroSound = `Glados_SimpleTime_End_${randomOutroNum}`;

  // Play the intro sound, on callback play the minutes sound, on callback play the outro sound
  playSound({
    sound: introSound,
    callback: () =>
      playTimeSound({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        callback: () => playSound({ sound: outroSound, callback: callback }),
      }),
  });
};

const playTimeUnitSound = ({ num, unit, isContinuing = false, callback }) => {
  // Plays the number of minutes, then the minutes unit sound, then the callback
  playNumberSound(num, () => {
    const unitAudio = new Audio(`SFX/Glados_Number_${unit}.mp3`);
    if (isContinuing) {
      unitAudio.onended = () => {
        playSound({
          sound: "Glados_Number_And",
          callback: callback,
        });
      };
    } else {
      unitAudio.onended = callback; // Call the callback after the unit sound has ended
    }
    unitAudio.play();
  });
};

const playNumberSound = (num, callback) => {
  if (num >= 1 && num <= 19) {
    const audio = new Audio(`SFX/Glados_Number_${padNumber(num)}.mp3`);
    audio.play();
    audio.onended = callback;
  } else {
    let tens = Math.floor(num / 10) * 10;
    let ones = num % 10;

    if (tens !== 0 && ones !== 0) {
      const audio = new Audio(`SFX/Glados_Number_${padNumber(tens)}.mp3`);
      audio.play();
      audio.onended = () => {
        const onesAudio = new Audio(`SFX/Glados_Number_${padNumber(ones)}.mp3`);
        onesAudio.play();
        onesAudio.onended = callback; // Call the callback after ones sound has ended
      };
    } else if (tens !== 0) {
      const audio = new Audio(`SFX/Glados_Number_${padNumber(tens)}.mp3`);
      audio.play();
      audio.onended = callback;
    } else if (ones !== 0) {
      const audio = new Audio(`SFX/Glados_Number_${padNumber(ones)}.mp3`);
      audio.play();
      audio.onended = callback;
    }
  }
};

const playIntroSound = ({ number, callback }) => {
  const introAudio = new Audio(`SFX/Glados_NumberLine_Start_${number}.mp3`);

  introAudio.onerror = () => {
    callback();
  };

  introAudio.onended = callback;

  introAudio.play().catch((error) => {
    callback();
  });
};

const playOutroSound = ({ number, callback }) => {
  // Check if the outro sound exists, if it does play it, if not directly call the callback
  const outroAudio = new Audio(`SFX/Glados_NumberLine_End_${number}.mp3`);

  outroAudio.onerror = () => {
    callback();
  };

  outroAudio.onended = callback;

  outroAudio.play().catch((error) => {
    callback();
  });
};

const playSound = ({ sound, callback }) => {
  // Check if the sound exists, if it does play it, if not directly call the callback
  const audio = new Audio(`SFX/${sound}.mp3`);

  audio.onerror = () => {
    callback();
  };

  audio.onended = callback;

  audio.play().catch((error) => {
    callback();
  });
};

const playTimeSound = ({
  hours,
  minutes,
  seconds,
  isSingular = false,
  callback,
}) => {
  // Plays the number of hours, then minutes, then seconds, then the callback. Play the 'and' sound between each time unit

  if (hours) {
    let hoursString = "Hours";
    if (hours === 1 || isSingular) {
      hoursString = "Hour";
    }

    playTimeUnitSound({
      num: parseInt(hours, 10),
      unit: hoursString,
      isContinuing: (minutes || seconds) && true,
      callback: () => {
        if (minutes) {
          let minutesString = "Minutes";
          if (minutes === 1 || isSingular) {
            minutesString = "Minute";
          }
          playTimeUnitSound({
            num: parseInt(minutes, 10),
            unit: minutesString,
            isContinuing: seconds && true,
            callback: () => {
              if (seconds) {
                let secondsString = "Seconds";
                if (seconds === 1 || isSingular) {
                  secondsString = "Second";
                }
                playTimeUnitSound({
                  num: parseInt(seconds, 10),
                  unit: secondsString,
                  callback: callback,
                });
              } else {
                callback();
              }
            },
          });
        } else if (seconds) {
          let secondsString = "Seconds";
          if (seconds === 1 || isSingular) {
            secondsString = "Second";
          }
          playTimeUnitSound({
            num: parseInt(seconds, 10),
            unit: secondsString,
            callback: callback,
            isContinuing: false,
          });
        } else {
          callback();
        }
      },
    });
  } else if (minutes) {
    let minutesString = "Minutes";
    if (minutes === 1 || isSingular) {
      minutesString = "Minute";
    }
    playTimeUnitSound({
      num: parseInt(minutes, 10),
      unit: minutesString,
      isContinuing: seconds && true,
      callback: () => {
        if (seconds) {
          let secondsString = "Seconds";
          if (seconds === 1 || isSingular) {
            secondsString = "Second";
          }
          playTimeUnitSound({
            num: parseInt(seconds, 10),
            unit: secondsString,
            callback: callback,
          });
        } else {
          callback();
        }
      },
    });
  } else if (seconds) {
    let secondsString = "Seconds";
    if (seconds === 1 || isSingular) {
      secondsString = "Second";
    }
    playTimeUnitSound({
      num: parseInt(seconds, 10),
      unit: secondsString,
      callback: callback,
    });
  } else {
    callback(); // If no time units are specified, directly play the outro
  }
};
