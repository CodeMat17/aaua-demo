import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavHeader from "./NavHeader";
import RequestPage from "./RequestPage";

const Account = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [full_name, setFullname] = useState(null);
  const [dept, setDept] = useState(null);
  const [matric_no, setMatricNo] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
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
        setDept(data.dept);
        setMatricNo(data.matric_no);
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ full_name, dept, matric_no }) {
    try {
      setLoading(true);
      const updates = {
        id: user.id,
        full_name,
        dept,
        matric_no,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      toast({
        title: "Updated!",
        description: "We've successfully updated your profile data.",
        status: "success",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavHeader />

      <Box maxW='sm' mx='auto'>
        {loading ? (
          <VStack py='20'>
            <Spinner />
            <Text letterSpacing='2px' color='gray'>
              Fetching profile data
            </Text>
          </VStack>
        ) : (
          <>
            {full_name === null ? (
              <VStack p='8' pos='relative' maxW='sm' mx='auto'>
                <Box ml='4'>
                  <Image
                    alt='update profile'
                    src='/svgs/add-user.svg'
                    width={150}
                    height={150}
                  />
                </Box>
                <Text
                  pos='absolute'
                  top='40'
                  fontWeight='semibold'
                  fontSize='xl'>
                  UPDATE YOUR PROFILE
                </Text>

                <FormControl pt='8'>
                  <FormLabel fontSize='sm' mb='0'>
                    Email
                  </FormLabel>
                  <Input
                    id='email'
                    type='email'
                    value={session?.user?.email}
                    disabled
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='sm' mb='0'>
                    Fullname
                  </FormLabel>
                  <Input
                    id='fullname'
                    type='text'
                    value={full_name || ""}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize='sm' mb='0'>
                    Matric No.
                  </FormLabel>
                  <Input
                    id='MatricNo'
                    type='text'
                    value={matric_no || ""}
                    onChange={(e) => setMatricNo(e.target.value)}
                  />
                </FormControl>
                <FormControl pb='2'>
                  <FormLabel fontSize='sm' mb='0'>
                    Department
                  </FormLabel>
                  <Input
                    id='department'
                    type='text'
                    value={dept || ""}
                    onChange={(e) => setDept(e.target.value)}
                  />
                </FormControl>

                <Button
                  onClick={() => updateProfile({ full_name, dept, matric_no })}
                  isLoading={loading}
                  colorScheme='blue'
                  w='full'>
                  UPDATE PROFILE
                </Button>
                <Button
                  onClick={() => supabase.auth.signOut()}
                  colorScheme='red'
                  w='full'>
                  SIGN OUT
                </Button>
              </VStack>
            ) : (
             <RequestPage session={session} />
            )}
          </>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Account;
