import React, { useState, useEffect, useRef } from "react";
import { LocalVideoTrack } from "twilio-video";
import Controls from "./Controls/index";

const Participant = ({
  participant,
  handleCallDisconnect,
  handleAudioToggle,
  handleVideoToggle,
  toggleAudio,
  toggleVideo,
  isLocal,
}) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  // const [screenTracks, setScreenTracks] = useState([]);

  // const handleScreenShareClick = async () => {
  //   const screenStream = await navigator.mediaDevices.getDisplayMedia();
  //   const track = screenStream.getTracks()[0];
  //   var screenTrack = new LocalVideoTrack(track, {
  //     name: "user-screen",
  //   });
  //   participant.publishTrack(screenTrack);
  //   console.log(screenTrack);
  // };

  const videoRef = useRef();
  const audioRef = useRef();
  // const screenRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    // handleScreenShareClick().then(() => {

    //   setScreenTracks(trackpubsToTracks(participant.screenTracks));
    // });

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
      // else if (track.kind === "user-screen") {
      //   setScreenTracks((screenTracks) => [...screenTracks, track]);
      // }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
      // else if (track.kind === "user-screen") {
      //   setScreenTracks((screenTracks) =>
      //     screenTracks.filter((s) => s !== track)
      //   );
      // }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      // setScreenTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  // useEffect(() => {
  //   const screenTrack = screenTracks[0];
  //   if (screenTrack) {
  //     screenTrack.attach(screenRef.current);
  //     return () => {
  //       screenTrack.detach();
  //     };
  //   }
  // }, [screenTracks]);

  return (
    <div className="participant" style={{ position: "relative" }}>
      <h3>{participant.identity}</h3>
      {/* {videoOn ? <video ref={videoRef} autoPlay={true} /> : "VideoStoped"} */}
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} />
      {/* <video ref={screenRef} autoPlay={true} /> */}
      {/* <button
        onClick={() => {
          setVideoOn(!videoOn);
        }}
      >
        Video Stop
      </button> */}
      {/* <button onClick={handleScreenShareClick()}>ScreenShare</button> */}
      {isLocal && (
        <Controls
          handleCallDisconnect={handleCallDisconnect}
          handleAudioToggle={handleAudioToggle}
          handleVideoToggle={handleVideoToggle}
          audio={toggleAudio}
          video={toggleVideo}
        />
      )}
    </div>
  );
};

export default Participant;
