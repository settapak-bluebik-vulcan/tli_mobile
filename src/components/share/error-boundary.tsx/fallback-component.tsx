import React from 'react';
import { Button, Modal, Text } from 'native-base';

export type Props = { error: Error; resetError: () => void };

function FallbackComponent({ error, resetError }: Readonly<Props>) {
  return (
    <Modal isOpen bgColor="white">
      <Modal.Content bgColor="white">
        <Text>{error.toString()}</Text>
      </Modal.Content>

      <Button onPress={() => resetError()}>Back</Button>
    </Modal>
  );
}

export default FallbackComponent;
