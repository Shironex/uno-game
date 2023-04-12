import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type Color = "R" | "B" | "Y" | "G";

interface ColorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (color: Color) => void;
};

const ColorDialog = ({ isOpen, onClose, onSelect } : ColorDialogProps) => {
  const [selectedColor, setSelectedColor] = useState<Color | "">("");

  const handleSelect = () => {
    if(selectedColor)
    {
        onSelect(selectedColor);
        setSelectedColor("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a color</ModalHeader>
        <ModalBody>
          <Stack direction="row" spacing={4}>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => setSelectedColor("R")}
              isActive={selectedColor === "R"}
            >
              Red
            </Button>
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setSelectedColor("B")}
              isActive={selectedColor === "B"}
            >
              Blue
            </Button>
            <Button
              variant="outline"
              colorScheme="yellow"
              onClick={() => setSelectedColor("Y")}
              isActive={selectedColor === "Y"}
            >
              Yellow
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              onClick={() => setSelectedColor("G")}
              isActive={selectedColor === "G"}
            >
              Green
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSelect}
            disabled={!selectedColor}
          >
            Select
          </Button>
          <IconButton icon={<CloseIcon />} onClick={onClose} aria-label={""} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ColorDialog;
