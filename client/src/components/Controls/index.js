import React from "react";
import styled from "styled-components";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import Mic from "../assets/icons/microphone.svg";
import MicOff from "../assets/icons/mute.svg";
import Video from "../assets/icons/video-camera.svg";
import VideoOff from "../assets/icons/no-video.svg";

const Controls = ({
  handleCallDisconnect,
  handleAudioToggle,
  handleVideoToggle,
  handleScreenShare,
  audio,
  video,
  screen,
}) => {
  return (
    <>
      <Control>
        <Circle onClick={handleAudioToggle}>
          <Image src={audio ? Mic : MicOff} />
        </Circle>
        {/* <Circle endCall onClick={handleCallDisconnect}>
          <Image src={End} />
        </Circle> */}
        <Circle onClick={handleVideoToggle}>
          <Image src={video ? Video : VideoOff} />
        </Circle>
        {/* <Circle onClick={handleScreenShare}>
          {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
        </Circle> */}
      </Control>
    </>
  );
};

export default Controls;

const Control = styled.div`
    display: flex;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  `,
  Circle = styled.div`
    background: ${(props) => (props.endCall ? "red" : "#ffffffad")};
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    cursor: pointer;
    :not(:first-child) {
      margin-left: 20px;
    }
  `,
  Image = styled.img`
    max-width: 100%;
    width: 30px;
    margin: 0 auto;
  `;
