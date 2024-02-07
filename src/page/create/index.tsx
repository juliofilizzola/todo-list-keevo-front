import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { useState } from 'react';

const createTodo = (open: boolean) => {
  const [isOpen, setIsOpen] = useState(true);
  setIsOpen(open);
  const onClose = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Modal body</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button>Cancel</Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  );
};

export default createTodo;