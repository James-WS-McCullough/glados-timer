import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const moveUpDownLeftRight = keyframes`
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  
  10% {
    transform: translateY(-15px) translateX(30px); // Moves up and right
  }

  20% {
    transform: translateY(-30px) translateX(0); // Moves up
  }
  
  30% {
    transform: translateY(-15px) translateX(-30px); // Moves up and left
  }

  40% {
    transform: translateY(0) translateX(0) scale(1.1); // Moves back to original position and scales up
  }

  50% {
    transform: translateY(15px) translateX(30px) rotate(5deg); // Moves down and right
  }

  60% {
    transform: translateY(30px) translateX(0); // Moves down
  }

  70% {
    transform: translateY(15px) translateX(-30px) rotate(-5deg); // Moves down and left
  }

  80% {
    transform: translateY(0) translateX(0); // Moves back to original position
  }

  90% {
    transform: translateY(-15px) translateX(30px); // Moves up and right
  }
`;

const outerFaceMove = keyframes`
  0%, 40%, 100% {
    transform: translateY(0px);
  }
  
  50%, 90% {
    transform: translateY(20px);
  }
`;

const innerFaceMove = keyframes`
0%, 10%, 100% {
  transform: translateY(-30px);
}

20%, 30%, 70%, 80% {
  transform: translateY(30px);
}

40%, 50%, 60%, 90% {
  transform: translateY(0px);
}
`;

// Make smoother by interpolating the values on the curve
const pipeObjectMove = keyframes`
0% {
  transform: translate(-400px, 0px) rotate(0deg);
}
5% {
  transform: translate(-390px, -40px) rotate(7.2deg);
}
13% {
  transform: translate(-380px, -100px) rotate(14.4deg);
}
25% {
  transform: translate(-380px, -200px) rotate(22.5deg);
}
35% {
  transform: translate(-340px, -265px) rotate(31.5deg);
}
47% {
  transform: translate(-300px, -320px) rotate(42.3deg);
}
58% {
  transform: translate(-250px, -360px) rotate(52.2deg);
}
70% {
  transform: translate(-200px, -390px) rotate(63deg);
}
84% {
  transform: translate(-100px, -420px) rotate(73.8deg);
}
92% {
  transform: translate(-40px, -435px) rotate(82.8deg);
}
100% {
  transform: translate(0px, -440px) rotate(90deg);
}
`;

export const FaceLayersContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 60vh; // using viewport height to match the child images
  width: 60vh; // assuming the images are square, adjust if not
  animation: ${moveUpDownLeftRight} 40s infinite; // Adjust duration and iteration count as needed
`;

export const OuterFaceLayersContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  height: 60vh; // using viewport height to match the child images
  width: 60vh; // assuming the images are square, adjust if not
  animation: ${outerFaceMove} 14s infinite; // Adjust duration and iteration count as needed
`;
export const InnerFaceLayersContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 60vh; // using viewport height to match the child images
  width: 60vh; // assuming the images are square, adjust if not
  animation: ${innerFaceMove} 8s infinite; // Adjust duration and iteration count as needed
`;

export const PipeObjectAnimation = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100px;
  animation: ${pipeObjectMove} 2s infinite linear;
`;

export const PipeObjectAnimation2 = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100px;
  animation: ${pipeObjectMove} 2s infinite linear 1s;
`;

export const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("background.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FaceBackImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

// Pipe is up against the right side of the screen, but isn't rendered on thinning screens
export const BackgroundPipe = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 600px;
`;

export const PipeCube = styled.img`
  position: relative;
  height: 100%;
`;

export const PipeTurret = styled.img`
  position: relative;
  height: 200%;
  transform: translate(-10%, 0);
`;

export const FaceInnerBackImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%; // same height for alignment
`;

export const FaceInnerCoverImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

export const FaceInnerFrontImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

export const FaceInnerFrontCoverImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;

export const FaceOuterCoverImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
`;
