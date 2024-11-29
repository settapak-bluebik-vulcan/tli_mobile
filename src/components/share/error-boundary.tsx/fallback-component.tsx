import React from 'react';
import { Button, Modal, Text } from 'native-base';
import { TextBase } from 'react-native';
export type Props = { error: Error; resetError: () => void };

const FallbackComponent = (props: Props) => {
  console.log({ props: props.error.toString() });

  return (
    <Modal isOpen bgColor={'white'}>
      <Modal.Content bgColor={'white'}>
        <Text>{props.error.toString()}</Text>
      </Modal.Content>

      <Button onPress={() => props.resetError()}>Back</Button>
    </Modal>
  );
};

export default FallbackComponent;
