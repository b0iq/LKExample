import React from 'react';
import {useParticipant, VideoView} from '@livekit/react-native';
import {Participant} from 'livekit-client';
import {StyleSheet, View} from 'react-native';

const ParticipantView = ({participant}: {participant: Participant}) => {
  const {cameraPublication} = useParticipant(participant);
  if (!cameraPublication) {
    return (
      <View
        style={{backgroundColor: 'yellow', width: '100%', height: '100%'}}
      />
    );
  }
  return (
    <VideoView
      objectFit="contain"
      style={styles.videoStyle}
      videoTrack={cameraPublication?.videoTrack}
    />
  );
};
const styles = StyleSheet.create({
  videoStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
  },
});

export default ParticipantView;
