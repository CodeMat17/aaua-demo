import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RequestApproval from "../RequestApproval";
import AddDeleteCourses from "../requestButtons/AddDeleteCourses";

const StudentRequest = ({user}) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  // const user = useUser();
  const [full_name, setFullname] = useState(null);
  const [matric_no, setMatricNo] = useState(null);
  const [dept, setDept] = useState(null);

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
      // alert("Error loading user data!");
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  }

  const bgAlt = useColorModeValue("gray.200", "gray.800");
  const bgButton = useColorModeValue("gray.50", "gray.700");
  const router = useRouter();

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
            <AddDeleteCourses
              userID={user.id}
              name={full_name}
              dept={dept}
              matricNO={matric_no}
            />

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
        <RequestApproval
          userID={user.id}
        />
      </Box>
    </>
  );
};

export default StudentRequest;
