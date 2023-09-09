import React, { useState } from "react";
import {
  Button,
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

function App() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const {
    isOpen: isOpenSetTimer,
    onOpen: onOpenSetTimer,
    onClose: onCloseSetTimer,
  } = useDisclosure();

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
          playTimeSound({ minutes: minutes });
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

  const padNumber = (num, digits = 3) => {
    return String(num).padStart(digits, "0");
  };

  const playTimeUnitSound = (num, unit, callback) => {
    let audio;
    if (num >= 1 && num <= 19) {
      audio = new Audio(`SFX/Glados_Number_${padNumber(num)}.mp3`);
    } else {
      let tens = Math.floor(num / 10) * 10;
      let ones = num % 10;

      if (tens !== 0 && ones !== 0) {
        audio = new Audio(`SFX/Glados_Number_${padNumber(tens)}.mp3`);
        audio.onended = () => {
          const onesAudio = new Audio(
            `SFX/Glados_Number_${padNumber(ones)}.mp3`
          );
          onesAudio.onended = callback; // Call the callback after ones sound has ended
          onesAudio.play();
        };
      } else if (tens !== 0) {
        audio = new Audio(`SFX/Glados_Number_${padNumber(tens)}.mp3`);
        audio.onended = callback;
      } else if (ones !== 0) {
        audio = new Audio(`SFX/Glados_Number_${padNumber(ones)}.mp3`);
        audio.onended = callback;
      }
    }
    audio.onended = () => {
      const unitAudio = new Audio(`SFX/Glados_Number_${unit}.mp3`);
      unitAudio.onended = callback; // Call the callback after the unit sound has ended
      unitAudio.play();
    };
    audio.play();
  };

  const playIntroSound = (callback) => {
    const introAudio = new Audio(`SFX/Glados_NumberLine_Start_1.mp3`);
    introAudio.onended = callback;
    introAudio.play();
  };

  const playOutroSound = () => {
    const outroAudio = new Audio(`SFX/Glados_NumberLine_End_1.mp3`);
    outroAudio.play();
  };

  const playTimeSound = ({ hours, minutes, seconds }) => {
    playIntroSound(() => {
      if (hours) {
        playTimeUnitSound(parseInt(hours, 10), "Hours", () => {
          if (minutes) {
            playTimeUnitSound(parseInt(minutes, 10), "Minutes", () => {
              if (seconds) {
                playTimeUnitSound(
                  parseInt(seconds, 10),
                  "Seconds",
                  playOutroSound
                );
              } else {
                playOutroSound();
              }
            });
          } else if (seconds) {
            playTimeUnitSound(parseInt(seconds, 10), "Seconds", playOutroSound);
          } else {
            playOutroSound();
          }
        });
      } else if (minutes) {
        playTimeUnitSound(parseInt(minutes, 10), "Minutes", () => {
          if (seconds) {
            playTimeUnitSound(parseInt(seconds, 10), "Seconds", playOutroSound);
          } else {
            playOutroSound();
          }
        });
      } else if (seconds) {
        playTimeUnitSound(parseInt(seconds, 10), "Seconds", playOutroSound);
      } else {
        playOutroSound(); // If no time units are specified, directly play the outro
      }
    });
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
          {seconds ? `${padNumber(seconds, 2)}` : ""}
        </div>
      )}
      // A modal to set the timer
      <Modal isOpen={isOpenSetTimer} onClose={onCloseSetTimer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Timer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Enter hours (0-99)"
              />
              <Input
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Enter minutes (0-59)"
              />
              <Input
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="Enter seconds (0-59)"
              />
            </VStack>
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
