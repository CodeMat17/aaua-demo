import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import ColorModeToggle from "./ColorModeToggle";
import LogoComponent from "./LogoComponent";
import { MobileMenu } from "./menuBtn/MobileMenu";

const NavHeader = () => {
  const supabase = useSupabaseClient();
  
  return (
    <Box
      as='nav'
      pos='sticky'
      top='0'
      zIndex='60'
      bg='blue.500'
      px='4'
      pb='1'
      pt='3'>
      <Box maxW='6xl' mx='auto'>
        <HStack align='center' justify='space-between'>
          <LogoComponent />
          <HStack spacing='6'>
            <ColorModeToggle />
            <MobileMenu />
            <Button
              display={{ base: "none", md: "flex" }}
              onClick={() => supabase.auth.signOut()}
              variant='outline' color='white'
              borderColor='gray.400'>
              Logout
            </Button>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default NavHeader;
