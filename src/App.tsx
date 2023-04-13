import React, {useRef, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import {useRoom} from '@livekit/react-native';
import {Room} from 'livekit-client';

import roomConfig from './utils/room-config';
import PreJoinView from './PreJoinView';
import ParticipantView from './ParticipantView';

export default function App() {
  const room = useRef(new Room(roomConfig)).current;

  const {participants} = useRoom(room);
  const [connected, setConnected] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);

  const _join = async (isPub: boolean, token: string, url?: string) => {
    try {
      if (!url) {
        throw new Error(
          'Please enter a valid LiveKit URL, e.g. wss://myserver.livekit.io',
        );
      }
      if (isPub) {
        room.once('connected', async () => {
          console.log('enable camera and microphone');
          await room?.localParticipant.enableCameraAndMicrophone();
        });
      }

      await room.connect(url, token, {});
      setConnected(true);
      setIsPublisher(isPub);
    } catch (error: any) {
      console.log('error', error);
      Alert.alert('Error', error.message);
    }
  };

  const remoteParticipants = participants.find(p => p.permissions?.canPublish);
  const VideoContainer = isPublisher ? (
    <ParticipantView participant={room.localParticipant} />
  ) : remoteParticipants ? (
    <ParticipantView participant={remoteParticipants} />
  ) : (
    <></>
  );

  return connected ? (
    <View style={styles.rootContainer}>{VideoContainer}</View>
  ) : (
    <PreJoinView
      onJoinRequested={(isPub, token, url) => {
        _join(isPub, token, url);
      }}
    />
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
