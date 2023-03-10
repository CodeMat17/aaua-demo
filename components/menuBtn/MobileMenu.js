import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { HiMenuAlt3 } from "react-icons/hi";
import LogoComponent from "../LogoComponent";


export const MobileMenu = () => {
  const supabase = useSupabaseClient();
    const session = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const bgAlt = useColorModeValue("gray.200", "gray.800");

 


  return (
    <Box display={{ md: "none" }}>
      <IconButton
        onClick={onOpen}
        color='white'
        bg='blue.800'
        icon={<HiMenuAlt3 size={32} />}
        isRound
        size='lg'
      />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <LogoComponent />
          </DrawerHeader>

          <DrawerBody>Mobile menu content will appear here.</DrawerBody>
          <DrawerFooter>
            <Button
              onClick={() => supabase.auth.signOut()}
              w='full'
              bg='red'
              color='white'
              variant='outline'
              borderColor='gray.400'>
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
