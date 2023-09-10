import React, { useEffect, useState } from "react";
import {
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AppContainer,
  FaceBackImage,
  FaceInnerBackImage,
  FaceInnerCoverImage,
  FaceInnerFrontCoverImage,
  FaceInnerFrontImage,
  FaceLayersContainer,
  FaceOuterCoverImage,
  InnerFaceLayersContainer,
  OuterFaceLayersContainer,
} from "./animationAndImageFormatting";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import SettingsIcon from "@mui/icons-material/Settings";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import {
  playEndLine,
  playPauseLine,
  playResetLine,
  playRestSessionStartLine,
  playRestSkipLine,
  playSettingsLine,
  playStartLine,
  playWelcomeLine,
  playWorkSessionStartLine,
  speakOppertunity,
} from "./speakLogic";
import { padNumber } from "./utils";
import { importantMinutes, talkativeScaleDescription } from "./constants";
import SmsIcon from "@mui/icons-material/Sms";

function App() {
  const [timeInput, setTimeInput] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [talkativeScale, setTalkativeScale] = useState(4); // 0 to 5
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(false);
  const [pomodoroWorkMinutes, setPomodoroWorkMinutes] = useState("25");
  const [pomodoroBreakMinutes, setPomodoroBreakMinutes] = useState("5");
  const [pomodoroIsWork, setPomodoroIsWork] = useState(true);
  // Save half way point for the timer
  const [halfWayPoint, setHalfWayPoint] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerActive, setTimerActive] = useState(false);
  const [audio] = useState(new Audio("/music/Music01.mp3"));
  const [playing, setPlaying] = useState(false);
  const {
    isOpen: isOpenSetTimer,
    onOpen: onOpenSetTimer,
    onClose: onCloseSetTimer,
  } = useDisclosure();
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

  useEffect(() => {
    audio.loop = true;
    return () => {
      audio.pause();
    };
  }, [audio]);

  const togglePlayPause = () => {
    if (playing) {
      audio.pause();
    } else {
      // Play at 0.5 volume
      audio.volume = 0.3;
      audio.play();
    }
    setPlaying(!playing);
  };

  // If the timer is active, subtract 1 second from the timer every second
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          // If the time equals the half way point, call speakOppertunity
          if (
            hours === halfWayPoint.hours &&
            minutes === halfWayPoint.minutes &&
            seconds === halfWayPoint.seconds
          ) {
            callSpeakOppertunity();
          } else if (hours === 0 && minutes === 0 && seconds === 10) {
            callSpeakOppertunity();
          } else if (talkativeScale === 5 && seconds % 10 === 0) {
            callSpeakOppertunity();
          }
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);

          if (talkativeScale >= 4) {
            callSpeakOppertunity();
          } else if (talkativeScale >= 3 && minutes % 2 === 0) {
            callSpeakOppertunity();
          } else if (talkativeScale >= 2 && minutes % 5 === 0) {
            callSpeakOppertunity();
          } else if (
            talkativeScale >= 1 &&
            importantMinutes.includes(minutes)
          ) {
            callSpeakOppertunity();
          }
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
          if (talkativeScale >= 1) {
            callSpeakOppertunity();
          }
        } else {
          // If the timer is done, stop the timer
          handleEndTimer();
        }
      }, 1000);
    } else if (!timerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds, minutes, hours]);

  useEffect(() => {
    const talkativeScaleFromLocalStorage =
      localStorage.getItem("talkativeScale");
    if (talkativeScaleFromLocalStorage) {
      setTalkativeScale(parseInt(talkativeScaleFromLocalStorage));
    }
    const pomodoroWorkMinutesFromLocalStorage = localStorage.getItem(
      "pomodoroWorkMinutes"
    );
    if (pomodoroWorkMinutesFromLocalStorage) {
      setPomodoroWorkMinutes(pomodoroWorkMinutesFromLocalStorage);
    }
    const pomodoroBreakMinutesFromLocalStorage = localStorage.getItem(
      "pomodoroBreakMinutes"
    );
    if (pomodoroBreakMinutesFromLocalStorage) {
      setPomodoroBreakMinutes(pomodoroBreakMinutesFromLocalStorage);
    }
  }, []);

  const callSpeakOppertunity = () => {
    console.log("callSpeakOppertunity at ", hours, minutes, seconds, "");
    speakOppertunity({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      halfWayPoint: halfWayPoint,
      setIsSpeaking: setIsSpeaking,
      isSpeaking: isSpeaking,
      isPomodoro: isPomodoro,
      pomodoroIsWork: pomodoroIsWork,
    });
  };

  const handleEndTimer = () => {
    if (isPomodoro) {
      if (pomodoroIsWork) {
        playRestSessionStartLine({ setIsSpeaking: setIsSpeaking });
        setPomodoroIsWork(false);
        setTimerPomodoro({ isWork: false });
      } else {
        playWorkSessionStartLine({ setIsSpeaking: setIsSpeaking });
        setPomodoroIsWork(true);
        setTimerPomodoro({ isWork: true });
      }
    } else {
      playEndLine({ setIsSpeaking: setIsSpeaking });
      setTimerActive(false);
    }
  };

  const handleSetTimer = () => {
    if (isPomodoro) {
      setTimerPomodoro({ isWork: pomodoroIsWork });
    } else {
      setTimerClassic();
    }
    setTimerActive(true);
  };

  const setTimerPomodoro = ({ isWork }) => {
    if (isWork) {
      setHours(0);
      setMinutes(parseInt(pomodoroWorkMinutes));
      setSeconds(0);
      setHalfWayPoint({
        hours: 0,
        minutes: parseInt(pomodoroWorkMinutes) / 2,
        seconds: 0,
      });
    } else {
      setHours(0);
      setMinutes(parseInt(pomodoroBreakMinutes));
      setSeconds(0);
      setHalfWayPoint({
        hours: 0,
        minutes: parseInt(pomodoroBreakMinutes) / 2,
        seconds: 0,
      });
    }
  };

  const setTimerClassic = () => {
    console.log("timeInput", timeInput);
    const totalTimeInSeconds =
      (parseInt(timeInput.hours) | 0) * 60 * 60 +
      (parseInt(timeInput.minutes) | 0) * 60 +
      (parseInt(timeInput.seconds) | 0);
    console.log("totalTimeInSeconds", totalTimeInSeconds);
    const hours = Math.floor(totalTimeInSeconds / 60 / 60);
    const minutes = Math.floor((totalTimeInSeconds / 60) % 60);
    const seconds = Math.floor(totalTimeInSeconds % 60);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    const halfTimeInSeconds = Math.floor(totalTimeInSeconds / 2);

    setHalfWayPoint({
      hours: Math.floor(halfTimeInSeconds / 60 / 60),
      minutes: Math.floor((halfTimeInSeconds / 60) % 60),
      seconds: Math.floor(halfTimeInSeconds % 60),
    });
    console.log("hours, minutes, seconds", hours, minutes, seconds);
  };

  return (
    <AppContainer>
      <FaceLayersContainer>
        <FaceBackImage src="face-back.png" alt="Face Back" />
        <OuterFaceLayersContainer>
          <InnerFaceLayersContainer>
            <FaceInnerBackImage
              src="face-inner-back.png"
              alt="Face Inner Back"
            />
          </InnerFaceLayersContainer>
          <FaceInnerCoverImage
            src="face-inner-cover.png"
            alt="Face Inner Cover"
          />
          <InnerFaceLayersContainer>
            <FaceInnerFrontImage
              src="face-inner-front.png"
              alt="Face Inner Front"
            />
          </InnerFaceLayersContainer>
          <FaceInnerFrontCoverImage
            src="face-inner-front-cover.png"
            alt="Face Inner Front Cover"
          />
        </OuterFaceLayersContainer>
        <FaceOuterCoverImage
          src="face-outer-cover.png"
          alt="Face Outer Cover"
        />
      </FaceLayersContainer>
      {!(seconds > 0 || minutes > 0 || hours > 0) && !timerActive && (
        <Button
          position="absolute"
          bottom="40px"
          colorScheme="orange"
          width="400px"
          height="100px"
          fontSize="4rem"
          fontFamily="monospace"
          onClick={() => {
            onOpenSetTimer();
            playWelcomeLine({ setIsSpeaking: setIsSpeaking, isSpeaking });
          }}
        >
          Start
        </Button>
      )}
      {(seconds > 0 || minutes > 0 || hours > 0 || timerActive) && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "5rem",
            fontWeight: "bold",
            fontFamily: "monospace",
            // If is pomodoro, and pomodoro work is false, color is blue
            color: isPomodoro && !pomodoroIsWork ? "blue" : "white",
          }}
        >
          {hours ? `${hours}:` : ""}
          {minutes ? (hours ? `${padNumber(minutes, 2)}:` : `${minutes}:`) : ""}
          {`${padNumber(seconds, 2)}`}
        </div>
      )}
      <HStack position="absolute" bottom="30px" left="30px">
        <Button colorScheme="orange" onClick={togglePlayPause}>
          {playing ? <MusicNoteIcon /> : <MusicOffIcon />}
        </Button>
        <Button
          colorScheme="orange"
          onClick={() => {
            onOpenSettings();
            playSettingsLine({
              setIsSpeaking: setIsSpeaking,
              isSpeaking: isSpeaking,
            });
          }}
        >
          <SettingsIcon />
        </Button>
        {timerActive && (
          <Button
            colorScheme="orange"
            onClick={() => {
              setTimerActive(false);
              playPauseLine({
                setIsSpeaking: setIsSpeaking,
                isSpeaking: isSpeaking,
              });
            }}
          >
            <PauseIcon />
          </Button>
        )}
        {!timerActive && (seconds > 0 || minutes > 0 || hours > 0) && (
          <Button
            colorScheme="orange"
            onClick={() => {
              setTimerActive(true);
              //playStartLine({ setIsSpeaking: setIsSpeaking });
            }}
          >
            <PlayArrowIcon />
          </Button>
        )}
        {(seconds > 0 || minutes > 0 || hours > 0) && (
          <Button
            colorScheme="orange"
            onClick={() => {
              setTimerActive(false);
              setHours(0);
              setMinutes(0);
              setSeconds(0);
              playResetLine({
                setIsSpeaking: setIsSpeaking,
                isSpeaking: isSpeaking,
              });
            }}
          >
            <StopIcon />
          </Button>
        )}
        {isPomodoro && !pomodoroIsWork && (
          <Button
            colorScheme="green"
            onClick={() => {
              setPomodoroIsWork(true);
              setTimerPomodoro({ isWork: true });
              playRestSkipLine({
                setIsSpeaking: setIsSpeaking,
                isSpeaking: isSpeaking,
              });
            }}
          >
            <SkipNextIcon />
          </Button>
        )}
        {(seconds > 0 || minutes > 0 || hours > 0) && (
          <Button
            colorScheme="blue"
            onClick={() => {
              speakOppertunity({
                hours: hours,
                minutes: minutes,
                seconds: seconds,
                halfWayPoint: halfWayPoint,
                setIsSpeaking: setIsSpeaking,
                isSpeaking: isSpeaking,
                isPomodoro: isPomodoro,
                pomodoroIsWork: pomodoroIsWork,
              });
            }}
            isDisabled={isSpeaking}
          >
            <SmsIcon />
          </Button>
        )}
      </HStack>
      <Modal isOpen={isOpenSetTimer} onClose={onCloseSetTimer}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" textColor="white">
          <ModalHeader fontFamily="monospace">Set Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={4} marginBottom="3">
              <Switch
                colorScheme="orange"
                isChecked={isPomodoro}
                onChange={() => setIsPomodoro(!isPomodoro)}
              />
              <Text fontFamily="monospace">Pomodoro</Text>
            </HStack>
            {!isPomodoro && (
              <HStack spacing={4}>
                <Input
                  value={timeInput.hours}
                  fontFamily="monospace"
                  onChange={(e) =>
                    setTimeInput({ ...timeInput, hours: e.target.value })
                  }
                  placeholder="Hours"
                />
                <Input
                  value={timeInput.minutes}
                  fontFamily="monospace"
                  onChange={(e) =>
                    setTimeInput({ ...timeInput, minutes: e.target.value })
                  }
                  placeholder="Minutes"
                />
                <Input
                  value={timeInput.seconds}
                  fontFamily="monospace"
                  onChange={(e) =>
                    setTimeInput({ ...timeInput, seconds: e.target.value })
                  }
                  placeholder="Seconds"
                />
              </HStack>
            )}
            {isPomodoro && (
              <VStack spacing={0} width="100%">
                <Text fontFamily="monospace">Work Minutes</Text>
                <Input
                  value={pomodoroWorkMinutes}
                  fontFamily="monospace"
                  marginBottom="3"
                  onChange={(e) => {
                    setPomodoroWorkMinutes(e.target.value);
                    localStorage.setItem("pomodoroWorkMinutes", e.target.value);
                  }}
                  placeholder="Work Minutes"
                />
                <Text fontFamily="monospace">Break Minutes</Text>
                <Input
                  value={pomodoroBreakMinutes}
                  fontFamily="monospace"
                  onChange={(e) => {
                    setPomodoroBreakMinutes(e.target.value);
                    localStorage.setItem(
                      "pomodoroBreakMinutes",
                      e.target.value
                    );
                  }}
                  placeholder="Break Minutes"
                />
              </VStack>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              fontFamily="monospace"
              colorScheme="orange"
              onClick={() => {
                handleSetTimer();
                playStartLine({
                  setIsSpeaking: setIsSpeaking,
                  isSpeaking: isSpeaking,
                });
                onCloseSetTimer();
              }}
            >
              Set Timer
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onCloseSetTimer}
              fontFamily="monospace"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Settings Modal */}
      <Modal isOpen={isOpenSettings} onClose={onCloseSettings}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" textColor="white">
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily="monospace" fontWeight="bold" marginBottom="3">
              GLaDOS's Talkativeness
            </Text>
            <VStack alignItems="center">
              <HStack spacing={2}>
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    if (talkativeScale > 0) {
                      setTalkativeScale(talkativeScale - 1);
                      localStorage.setItem(
                        "talkativeScale",
                        talkativeScale - 1
                      );
                    }
                  }}
                  isDisabled={talkativeScale === 0}
                >
                  <ArrowDownwardIcon />
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    if (talkativeScale < 5) {
                      setTalkativeScale(talkativeScale + 1);
                      localStorage.setItem(
                        "talkativeScale",
                        talkativeScale + 1
                      );
                    }
                  }}
                  isDisabled={talkativeScale === 5}
                >
                  <ArrowUpwardIcon />
                </Button>
                <Text fontFamily="monospace">
                  {talkativeScaleDescription[talkativeScale]}
                </Text>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseSettings}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AppContainer>
  );
}

export default App;
