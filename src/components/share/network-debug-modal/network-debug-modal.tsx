import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import NetworkLogger from 'react-native-network-logger';

interface Props {
  onPress?: () => void;
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    backgroundColor: 'white',
  },
  container: {
    width: 45,
    height: 45,
    position: 'absolute',
    zIndex: 999,
    left: 24,
    bottom: '5%',
    borderRadius: 45,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 8,
    textAlign: 'center',
    lineHeight: 8,
    color: 'white',
  },
  version: {
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center',
  },
  versionInside: {
    textAlign: 'center',
    paddingTop: 6,
  },
  contentContainer: {
    flex: 1,
  },
  closeButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButtonTitle: {
    paddingTop: 10,
    textAlign: 'center',
  },
});

function NetworkDebugModal({ onPress }: Props) {
  const [isNetworkModalVisible, setIsNetworkVIsible] = useState(false);
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  return (
    <>
      <Modal style={styles.modal} visible={isNetworkModalVisible}>
        <SafeAreaView style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsNetworkVIsible(false)}>
            <Text style={styles.closeButtonTitle}>CLOSE</Text>
          </TouchableOpacity>
          <NetworkLogger />
          <Text
            style={styles.versionInside}>{`${version}(${buildNumber})`}</Text>
        </SafeAreaView>
      </Modal>

      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (onPress) {
            onPress();
          }
          setIsNetworkVIsible(true);
        }}>
        <Text style={styles.content}>Network Logs</Text>
        <Text style={styles.version}>{`${version}(${buildNumber})`}</Text>
      </TouchableOpacity>
    </>
  );
}

export default NetworkDebugModal;
