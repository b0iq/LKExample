import React, {useState} from 'react';
import {View, Button, StyleSheet, TextInput} from 'react-native';
import {LIVEKIT_URL} from '@env';
type PreJoinViewProps = {
  onJoinRequested: (isPublisher: boolean, token: string, url?: string) => void;
};
const PreJoinView = ({onJoinRequested}: PreJoinViewProps) => {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState(LIVEKIT_URL);
  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={styles.input}
        placeholder="Token"
        value={token}
        onChangeText={setToken}
      />
      <TextInput
        style={styles.input}
        placeholder={`URL ${LIVEKIT_URL ? LIVEKIT_URL : 'wss://...'}`}
        value={url}
        onChangeText={setUrl}
      />
      <View style={styles.spacer} />
      <View style={styles.row}>
        <Button
          onPress={() => onJoinRequested(true, token, url)}
          title="Join as Publisher"
        />
        <Button
          onPress={() => onJoinRequested(false, token, url)}
          title="Join as Viewer"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 50,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default PreJoinView;
