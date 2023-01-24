import { Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsWhatsapp } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import {Link} from 'react-scroll'
import { navLinks } from '../../navLinks'
import NavContactUs from "../NavContactUs";

export const DesktopMenu = () => {
  return (
    <Box display={{ base: "none", md: "flex" }}>
      <HStack>
        {navLinks.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}>
            <Button variant='ghost' color='white' _hover={{ color: "tomato" }}>
              {link.item}
            </Button>
          </Link>
        ))}
        <Menu>
          <MenuButton
            as={Button}
            color='white'
            _hover={{ color: "tomato" }}
            variant='ghost'>
            CONTACT US
          </MenuButton>
          <MenuList>
            <MenuItem as='a' href='https://wa.me/+22506773596' target='_blank'>
              <IconButton
                icon={<BsWhatsapp size={23} color='green' />}
                isRound
                mr='4'
              />{" "}
              <span>Chat with us on WhatsApp</span>
            </MenuItem>
            <MenuItem as='a' href='mailto:izagankanu@gmail.com'>
              <IconButton
                icon={<HiOutlineMail size={23} color='red' />}
                isRound
                mr='4'
              />{" "}
              <span>Send an eMail to us</span>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
}
