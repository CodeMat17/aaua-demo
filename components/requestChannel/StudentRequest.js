import { Box, Divider, Flex, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import RequestApproval from "../RequestApproval";
import AddDeleteCourses from "../requestButtons/AddDeleteCourses";


const StudentRequest = () => {
  const bgAlt = useColorModeValue("gray.200", "gray.800");
  const bgButton = useColorModeValue("gray.50", "gray.700");
  const router = useRouter()
  
  return (
    <>
      <Box px='4' pt='8' pb='12' bg={bgAlt} rounded='md'>
        <Text
          fontSize='lg'
          fontWeight='semibold'
          textAlign='center'
          color='blue.600'>
          REQUESTS
        </Text>
        <Box mx='auto' w='50px' h='2px' rounded='full' bg='blue.600'></Box>
        <Box mt='6'>
          <SimpleGrid maxW='md' mx='auto' columns={[2, 3]} spacing={["30px"]}>
            <Flex
              cursor='pointer'
              maxW='120px'
              mx='auto'
              textAlign='center'
              justify='center'
              align='center'
              fontSize='sm'
              p='4'
              rounded='lg'
              border='1px'
              borderColor='gray.300'
              shadow='md'
              bg={bgButton}>
              Reactivation of Matric. No.
            </Flex>
            <Flex
              cursor='pointer'
              maxW='120px'
              mx='auto'
              textAlign='center'
              justify='center'
              align='center'
              fontSize='sm'
              p='4'
              rounded='lg'
              border='1px'
              borderColor='gray.300'
              shadow='md'
              bg={bgButton}>
              Name Correction
            </Flex>
            <AddDeleteCourses />

            <Flex
              cursor='pointer'
              maxW='120px'
              mx='auto'
              textAlign='center'
              justify='center'
              align='center'
              fontSize='sm'
              p='4'
              rounded='lg'
              border='1px'
              borderColor='gray.300'
              shadow='md'
              bg={bgButton}>
              Confirm Payments
            </Flex>
          </SimpleGrid>
        </Box>
      </Box>
      <Box px='4' py='6'>
        <Text fontSize='lg'>Requests and Approvals</Text>
        <Divider mt='1' mb='2' />
        <RequestApproval />
      </Box>
    </>
  );
}

export default StudentRequest