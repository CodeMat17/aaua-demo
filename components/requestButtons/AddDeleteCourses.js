import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
// import { useMemo } from "react/cjs/react.development";

const SimpleMDE = dynamic(() => import ('react-simplemde-editor'), {ssr: false});


const AddDeleteCourses = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const toast = useToast();
  const [full_name, setFullname] = useState(null);
  const [matric_no, setMatricNo] = useState(null);
  const [dept, setDept] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posting, setPositing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const bgButton = useColorModeValue("gray.50", "gray.700");

//  console.log(description)

  const newOptions = useMemo(() => {
    return {
      spellChecker: false,
      toolbar: false,
    };
  }, []);

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

  const updateRequests = async () => {
 
    try {
      setPositing(true);
      const { data, error } = await supabase.from("requests").insert([
        {
          title,
          description,
          user_id: user.id,
          full_name,
          dept,
          matric_no,
          status: "processing",
          to: "hod",
        },
      ]);

      if (error && status !== 406) {
        throw error;
      }

      if (!error) {
        toast({
          title: "Submitted.",
          description: "We've successfully submitted your request.",
          status: "success",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      }
      router.reload()
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong, please try again.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    } finally {
      setTitle("");
      setDescription("");
      setPositing(false);
      onClose();
    //  router.push('/request')
    }
  };

  return (
    <>
      <Flex
        onClick={onOpen}
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
        Add | Delete Course
      </Flex>

      <Modal
        motionPreset='slideInBottom'
        scrollBehavior='inside'
        isCentered
        mx='4'
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx='2'>
          <ModalHeader>Add | Delete Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box pt='6' pb='8'>
              <Text>TO: Dean</Text>
              <Text>THROUGH: HOD</Text>
              <FormControl mb='6' isRequired>
                <FormLabel mb='0'>SUBJECT:</FormLabel>
                <Input
                  required
                  id='title'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Enter your subject here...'
                />
              </FormControl>
           
                <FormControl isRequired>
                  <FormLabel mb='0'>MESSAGE:</FormLabel>
                  <SimpleMDE
                    id='editor'
                    value={description}
                    toolbar="false"
                    // onChange={onChange}
                    onChange={(description) => setDescription(description)}
                    options={newOptions}
                    // options={{ toolbar: false, spellChecker: false, autofocus: false }}
                  />
                </FormControl>
              </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme='red' onClick={onClose}>
              Close
            </Button>
            <Spacer />
            <Button
              onClick={updateRequests}
              isLoading={posting}
              isDisabled={
                !title.trim() || title.length < 5 || description.length < 5
              }
              color='green'
              variant='outline'
              borderColor='green'>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDeleteCourses;
