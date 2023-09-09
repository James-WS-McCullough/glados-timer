import { padNumber } from "./utils";

export const speakOppertunity = ({ hours, minutes, seconds }) => {
  // Random number 1 to 3
  const randomNum = Math.floor(Math.random() * 2) + 1;
  // if number is 1, play the random number line, if 2 play simple time,

  if (randomNum === 1) {
    playRandomNumberLine({ minutes: minutes });
  }
  if (randomNum === 2) {
    playSimpleTime({ minutes: minutes });
  }
};

export const playRandomNumberLine = ({ minutes }) => {
  // Random number min 1 max 8
  const randomNum = Math.floor(Math.random() * 8) + 1;
  // Play the intro sound, on callback play the time sound, on callback play the outro sound
  playIntroSound({
    number: randomNum,
    callback: () =>
      playMinutesSound({
        num: minutes,
        callback: () => playOutroSound({ number: randomNum }),
      }),
  });
};

export const playSimpleTime = ({ minutes }) => {
  // Random number min 1 max 3
  const randomIntroNum = Math.floor(Math.random() * 3) + 1;
  const randomOutroNum = Math.floor(Math.random() * 3) + 1;
  const introSound = `Glados_SimpleTime_Start_${randomIntroNum}`;
  const outroSound = `Glados_SimpleTime_End_${randomOutroNum}`;

  // Play the intro sound, on callback play the minutes sound, on callback play the outro sound
  playSound({
    sound: introSound,
    callback: () =>
      playMinutesSound({
        num: minutes,
        callback: () => playSound({ sound: outroSound }),
      }),
  });
};

export const playMinutesSound = ({ num, callback }) => {
  // Plays the number of minutes, then the minutes unit sound, then the callback
  // If 1 minute, play 60 seconds instead.
  if (num === 1) {
    playTimeUnitSound(60, "Seconds", callback);
  } else {
    playTimeUnitSound(num, "Minutes", callback);
  }
};

export const playTimeUnitSound = (num, unit, callback) => {
  // Plays the number of minutes, then the minutes unit sound, then the callback
  playNumberSound(num, () => {
    const unitAudio = new Audio(`SFX/Glados_Number_${unit}.mp3`);
    unitAudio.onended = callback; // Call the callback after the unit sound has ended
    unitAudio.play();
  });
};

export const playNumberSound = (num, callback) => {
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
        onesAudio.onended = callback; // Call the callback after ones sound has ended
        onesAudio.play();
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

export const playIntroSound = ({ number, callback }) => {
  // Check if the intro sound exists, if it does play it, if not directly call the callback
  try {
    const introAudio = new Audio(`SFX/Glados_NumberLine_Start_${number}.mp3`);
    introAudio.onended = callback;
    introAudio.play();
  } catch (err) {
    callback();
    return;
  }
};

export const playOutroSound = ({ number, callback }) => {
  // Check if the outro sound exists, if it does play it, if not directly call the callback
  try {
    const outroAudio = new Audio(`SFX/Glados_NumberLine_End_${number}.mp3`);
    outroAudio.play();
    outroAudio.onended = callback;
  } catch (err) {
    callback();
    return;
  }
};

export const playSound = ({ sound, callback }) => {
  // Check if the sound exists, if it does play it, if not directly call the callback
  try {
    const audio = new Audio(`SFX/${sound}.mp3`);
    audio.play();
    audio.onended = callback;
  } catch (err) {
    callback();
    return;
  }
};

export const playTimeSound = ({ hours, minutes, seconds, callback }) => {
  if (hours) {
    playTimeUnitSound(parseInt(hours, 10), "Hours", () => {
      if (minutes) {
        playTimeUnitSound(parseInt(minutes, 10), "Minutes", () => {
          if (seconds) {
            playTimeUnitSound(parseInt(seconds, 10), "Seconds", callback);
          } else {
            callback();
          }
        });
      } else if (seconds) {
        playTimeUnitSound(parseInt(seconds, 10), "Seconds", playOutroSound);
      } else {
        callback();
      }
    });
  } else if (minutes) {
    playTimeUnitSound(parseInt(minutes, 10), "Minutes", () => {
      if (seconds) {
        playTimeUnitSound(parseInt(seconds, 10), "Seconds", playOutroSound);
      } else {
        callback();
      }
    });
  } else if (seconds) {
    playTimeUnitSound(parseInt(seconds, 10), "Seconds", playOutroSound);
  } else {
    callback(); // If no time units are specified, directly play the outro
  }
};
