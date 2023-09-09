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
import { speakOppertunity } from "./speakLogic";
import { padNumber } from "./utils";

function App() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [audio] = useState(new Audio("/music/Music01.mp3"));
  const [playing, setPlaying] = useState(false);
  const {
    isOpen: isOpenSetTimer,
    onOpen: onOpenSetTimer,
    onClose: onCloseSetTimer,
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
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
          speakOppertunity({ minutes: minutes });
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setTimerActive(false);
        }
      }, 1000);
    } else if (!timerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, seconds, minutes, hours]);

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
      {!timerActive && (
        <Button
          position="absolute"
          bottom="40px"
          colorScheme="orange"
          fontStyle="bold"
          size="lg"
          onClick={onOpenSetTimer}
        >
          BEGIN
        </Button>
      )}
      {timerActive && (
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
      </HStack>
      <Modal isOpen={isOpenSetTimer} onClose={onCloseSetTimer}>
        <ModalOverlay />
        <ModalContent backgroundColor="black" textColor="white">
          <ModalHeader>Set Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack spacing={4}>
              <Input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours"
              />
              <Input
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Minutes"
              />
              <Input
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="Seconds"
              />
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              onClick={() => {
                setTimerActive(true);
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
    </AppContainer>
  );
}

export default App;
