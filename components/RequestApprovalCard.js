import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";

const RequestApprovalCard = ({
  title,
  description,
  status,
  updated_on,
  created_at,
}) => {
  const bgAlt = useColorModeValue("gray.200", "gray.800");
  const [state, setState] = useState("yellow.200");

  let colortoshow;
  if (status === "approved") {
    colortoshow = "green.500";
  } else if (status === "declined") {
    colortoshow = "red.500";
  } else if (status === "processing") {
    colortoshow = "gray.500";
  }

  return (
    <Box
      border='1px'
      borderColor='gray.200'
      shadow='md'
      rounded='md'
      overflow='hidden'
      my='6'>
      <Flex flexDir={["column", "column", "row"]} px='4' pt='4'>
        <FormControl mb='2'>
          <FormLabel mb='0' fontSize='sm' color='gray'>
            Title
          </FormLabel>
          <Text noOfLines='1'>{title}</Text>
        </FormControl>
        <FormControl mb='2' maxW='md'>
          <FormLabel mb='0' fontSize='sm' color='gray'>
            Description
          </FormLabel>
          <Text noOfLines='2'>{description}</Text>
        </FormControl>
      </Flex>
      <HStack
        align='center'
        justify='space-between'
        textAlign='center'
        px='2'
        py='1'
        fontSize='sm'
        bg={colortoshow}>
        <FormControl>
          <Text color='gray.300'>Requested on</Text>
          <Text color='white'> {dayjs(created_at).format(" MMM D, YYYY")}</Text>
        </FormControl>

        <FormControl>
          <Text color='gray.300'>Status</Text>
          <Text color='white'>{status}</Text>
        </FormControl>

        {updated_on === null ? (
          ""
        ) : (
          <FormControl>
            {status === "approved" && <Text color='gray.300'>Approved on</Text>}
            {status === "declined" && <Text color='gray.300'>Declined on</Text>}
            <Text color='white'>
              {dayjs(updated_on).format(" MMM D, YYYY")}
            </Text>
          </FormControl>
        )}
      </HStack>
    </Box>
  );
};

export default RequestApprovalCard;
