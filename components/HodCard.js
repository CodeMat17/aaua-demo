import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import Link from "next/link";

const HodCard = ({
  id,
  full_name,
  dept,
  matric_no,
  created_at,
  title,
  description,
}) => {


  return (
    <Box p='4' mb='4' rounded='md' border='1px' borderColor='gray' shadow='md'>
      <FormControl>
        <FormLabel mb='-2' fontSize='sm' color='gray'>
          From:
        </FormLabel>
        <Text>{full_name}</Text>
      </FormControl>
      <FormControl>
        <FormLabel mb='-2' fontSize='sm' color='gray'>
          Department:
        </FormLabel>
        <Text>{dept}</Text>
      </FormControl>
      <FormControl>
        <FormLabel mb='-2' fontSize='sm' color='gray'>
          Matric No:
        </FormLabel>
        <Text>{matric_no}</Text>
      </FormControl>
      <FormControl>
        <FormLabel mb='-2' fontSize='sm' color='gray'>
          Applied on:
        </FormLabel>
        <Text> {dayjs(created_at).format(" MMM D, YYYY")}</Text>
      </FormControl>
      <Divider my='2' />
      <FormControl>
        <FormLabel mb='-2' fontSize='sm' color='gray'>
          Request Title:
        </FormLabel>
        <Text>{title}</Text>
      </FormControl>
      <FormControl>
        <FormLabel mb='-2' fontSize='sm' color='gray'>
          Request Body:
        </FormLabel>
        <Text noOfLines='3'>{description}</Text>
      </FormControl>
      <Divider my='4' />
      <HStack justify='flex-end'>
        <Link href={`/request/${id}`}>
          <Button colorScheme='blue'>TREAT</Button>
        </Link>
      </HStack>
    </Box>
  );
};

export default HodCard;
