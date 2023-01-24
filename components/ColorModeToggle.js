import { Box, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiSun } from "react-icons/fi";
import { HiMoon } from "react-icons/hi";

const ColorModeToggle = () => {
const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode} bg='blue.600'
      icon={
        colorMode === "dark" ? (
          <FiSun size={25} color='orange' />
        ) : (
          <HiMoon size={25} color='gray.700' />
        )
      }
      isRound={true}
    />
  );
}

export default ColorModeToggle