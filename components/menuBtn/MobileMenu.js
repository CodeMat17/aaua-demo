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

  const signoutButt = () => {
  supabase.auth.signOut();
    onClose()
}

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

          <DrawerBody>
            {/* {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}>
                <Button onClick={onClose} w='100%' my='2' variant='ghost'>
                  {link.item}
                </Button>
              </Link>
            ))} */}
            {/* <NavContactUs /> */}
          </DrawerBody>
          <DrawerFooter>
            {session &&            
              <Button
                onClick={signoutButt}
                w='full'
                bg='red'
                color='white'
                variant='outline'
                borderColor='gray.400'>
                Logout
              </Button>}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
