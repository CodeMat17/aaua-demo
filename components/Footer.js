import { Box, Text } from "@chakra-ui/react";
import LogoComponent from "./LogoComponent";

const Footer = () => {
  return (
    <Box bg='gray.900' px='4' py='8'>
      <Box maxW='6xl' mx='auto'>
        <LogoComponent />
        <Text color='white' py='6'>Footer content will appear here.</Text>
      </Box>
    </Box>
  );
};

export default Footer;
