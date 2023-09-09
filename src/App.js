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
import {
  playEndLine,
  playPauseLine,
  playResetLine,
  playSettingsLine,
  playStartLine,
  playWelcomeLine,
  speakOppertunity,
} from "./speakLogic";
import { padNumber } from "./utils";

function App() {
  const [timeInput, setTimeInput] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
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
  React.useEffect(() => {
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
          }
          if (hours === 0 && minutes === 0 && seconds === 10) {
            callSpeakOppertunity();
          }
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          callSpeakOppertunity();
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          // If the timer is done, stop the timer
          playEndLine({ setIsSpeaking: setIsSpeaking });
          setTimerActive(false);
        }
      }, 1000);
    } else if (!timerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds, minutes, hours]);

  const callSpeakOppertunity = () => {
    console.log("callSpeakOppertunity at ", hours, minutes, seconds, "");
    speakOppertunity({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      halfWayPoint: halfWayPoint,
      setIsSpeaking: setIsSpeaking,
      isSpeaking: isSpeaking,
    });
  };

  const handleSetTimer = () => {
    const hours = timeInput.hours ? parseInt(timeInput.hours, 10) : 0;
    const minutes = timeInput.minutes ? parseInt(timeInput.minutes, 10) : 0;
    const seconds = timeInput.seconds ? parseInt(timeInput.seconds, 10) : 0;
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
    const totalTimeInSeconds = hours * 60 * 60 + minutes * 60 + seconds;
    const halfTimeInSeconds = Math.floor(totalTimeInSeconds / 2);

    setHalfWayPoint({
      hours: Math.floor(halfTimeInSeconds / 60 / 60),
      minutes: Math.floor((halfTimeInSeconds / 60) % 60),
      seconds: Math.floor(halfTimeInSeconds % 60),
    });
    setTimerActive(true);
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
      {!(seconds > 0 || minutes > 0 || hours > 0) && (
        <Button
          position="absolute"
          bottom="40px"
          colorScheme="orange"
          size="lg"
          onClick={() => {
            onOpenSetTimer();
            playWelcomeLine({ setIsSpeaking: setIsSpeaking, isSpeaking });
          }}
        >
          BEGIN
        </Button>
      )}
      {(seconds > 0 || minutes > 0 || hours > 0) && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "5rem",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {hours ? `${hours}:` : ""}
          {minutes ? `${minutes}:` : ""}
          {`${padNumber(seconds, 2)}`}
        </div>
      )}
      <HStack position="absolute" bottom="40px" left="40px">
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
        {timerActive && (
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
      </HStack>
      <Modal isOpen={isOpenSetTimer} onClose={onCloseSetTimer}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" textColor="white">
          <ModalHeader>Set Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={4}>
              <Input
                value={timeInput.hours}
                onChange={(e) =>
                  setTimeInput({ ...timeInput, hours: e.target.value })
                }
                placeholder="Hours"
              />
              <Input
                value={timeInput.minutes}
                onChange={(e) =>
                  setTimeInput({ ...timeInput, minutes: e.target.value })
                }
                placeholder="Minutes"
              />
              <Input
                value={timeInput.seconds}
                onChange={(e) =>
                  setTimeInput({ ...timeInput, seconds: e.target.value })
                }
                placeholder="Seconds"
              />
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
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
            <Button variant="ghost" mr={3} onClick={onCloseSetTimer}>
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
            <VStack spacing={4}>
              <Button
                colorScheme="orange"
                onClick={() => {
                  onCloseSettings();
                  onOpenSetTimer();
                }}
              >
                Set Timer
              </Button>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseSettings}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AppContainer>
  );
}

export default App;
