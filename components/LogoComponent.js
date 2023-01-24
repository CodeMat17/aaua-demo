import { HStack, Text } from "@chakra-ui/react";
import Image from "next/image";


const LogoComponent = () => {
  return (
    <HStack align='center'>
      <Image alt='aaua logo' src='/aaua_logo.png' width={50} height={50} />
      <Text
        fontSize='xl'
        fontWeight='semibold'
        letterSpacing='1px'
        color='white'>
        AAUA
      </Text>
    </HStack>
  );
}

export default LogoComponent