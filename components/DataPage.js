import { Box, Divider, Flex, HStack, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import RequestApproval from "./RequestApproval";
import AddDeleteCourses from "./requestButtons/AddDeleteCourses";

const DataPage = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const [full_name, setFullname] = useState(null);
  const [dept, setDept] = useState(null);
  const [matric_no, setMatricNo] = useState(null);

  const bgAlt = useColorModeValue("gray.200", "gray.800");
  const bgButton = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      //   setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, dept, matric_no`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setMatricNo(data.matric_no);
        setDept(data.dept);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  }

  return (
    <Box maxW='6xl' mx='auto'>
      <HStack ml='-4' spacing={[-1, 2]}>
        <Image alt='id logo' src='/svgs/id-card.svg' width={100} height={90} />
        <Box lineHeight='5'>
          <Text>Welcome!</Text>
          <Text fontWeight='semibold' fontSize='lg'>
            {full_name}
          </Text>
          <Text>{session.user.email}</Text>
        </Box>
      </HStack>

      <Divider mb='6' />
      <Box pt='8' pb='12' bg={bgAlt} rounded='md'>
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
      <Box py='6'>
        <Text fontSize='lg'>Requests and Approvals</Text>
        <Divider mt='1' mb='2' />

        <RequestApproval />
      </Box>
    </Box>
  );
};

export default DataPage;
