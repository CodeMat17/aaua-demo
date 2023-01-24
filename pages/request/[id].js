import Footer from "@/components/Footer";
import NavHeader from "@/components/NavHeader";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../utils/supabase";

const RequestDetails = ({ request }) => {
  const session = useSession();
  const user = useUser();
  const router = useRouter();
  const toast = useToast();
  const value = request.description;
  const desc = value.replace(/\n/gi, "&nbsp;\n\n ");
  const [role, setRole] = useState(null);

  const [declining, setDeclining] = useState(false);
  const [approving, setApproving] = useState(false);
  const [pushingToDean, setPushingToDean] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      // setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`role`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setRole(data.role);
      }
    } catch (error) {
      //   alert("Error loading user data!");
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }

  const declineRequest = async () => {
    try {
      setDeclining(true);
      const { data, error } = await supabase
        .from("requests")
        .update({
          status: "declined",
          to: " ",
          updated_on: new Date().toISOString(),
          treated_by: session.user.email,
        })
        .match({ user_id: user.id, created_at: request.created_at });

      if (!error) {
        toast({
          title: "Declined!",
          description: "You have successfully declined the request.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
      router.push("/request");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setDeclining(false);
    }
  };

  const approveRequest = async () => {
    try {
      setApproving(true);
      const { data, error } = await supabase
        .from("requests")
        .update({
          status: "approved",
          to: " ",
          updated_on: new Date().toISOString(),
          treated_by: session.user.email,
        })
        .match({ user_id: user.id, created_at: request.created_at });

      if (!error) {
        toast({
          title: "Approved!",
          description: "You have successfully approved the request.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
      router.push("/request");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setApproving(false);
    }
  };

  const PushRequestToDean = async () => {
    try {
      setPushingToDean(true);
      const { data, error } = await supabase
        .from("requests")
        .update({
          status: "processing",
          to: "dean",
          updated_on: new Date().toISOString(),
          treated_by: session.user.email,
        })
        .match({ user_id: user.id, created_at: request.created_at });

      if (!error) {
        toast({
          title: "Pushed!",
          description: "You have successfully pushed the request to the Dean.",
          status: "success",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
      router.push("/request");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    } finally {
      setPushingToDean(false);
    }
  };

  return (
    <Box>
      <NavHeader />

      <Box px='4' py='12' minH='70vh'>
        <Box maxW='xl' mx='auto'>
          <FormControl mb='2'>
            <FormLabel mb='-2' fontSize='sm' color='gray'>
              From:
            </FormLabel>
            <Text>{request.full_name}</Text>
          </FormControl>
          <FormControl mb='2'>
            <FormLabel mb='-2' fontSize='sm' color='gray'>
              Department:
            </FormLabel>
            <Text>{request.dept}</Text>
          </FormControl>
          <FormControl mb='2'>
            <FormLabel mb='-2' fontSize='sm' color='gray'>
              Matric No:
            </FormLabel>
            <Text>{request.matric_no}</Text>
          </FormControl>
          <FormControl mb='2'>
            <FormLabel mb='-2' fontSize='sm' color='gray'>
              Applied on:
            </FormLabel>
            <Text> {dayjs(request.created_at).format(" MMM D, YYYY")}</Text>
          </FormControl>
          <Divider my='4' />
          <Box
            p='4'
            border='1px'
            borderColor='gray.500'
            rounded='md'
            shadow='lg'>
            <FormControl mb='2'>
              <FormLabel mb='-2' fontSize='sm' color='gray'>
                Title:
              </FormLabel>
              <Text>{request.title}</Text>
            </FormControl>
            <FormControl mb='2'>
              <FormLabel mb='-2' fontSize='sm' color='gray'>
                Request:
              </FormLabel>
              <ReactMarkdown children={desc} />
            </FormControl>
          </Box>
          <HStack pt='8' align='center' justify='space-between'>
            <Button
              isLoading={declining}
              onClick={declineRequest}
              colorScheme='red'>
              Decline
            </Button>
            <Button
              isLoading={approving}
              onClick={approveRequest}
              colorScheme='green'>
              Approve
            </Button>
            {role === "hod" ? (
              <Button
                isLoading={pushingToDean}
                onClick={PushRequestToDean}
                colorScheme='blue'>
                Push to Dean
              </Button>
            ) : (
              ""
            )}
          </HStack>
          <Divider mt='6' />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export const getStaticPaths = async () => {
  const { data: requests } = await supabase.from("requests").select("id");
  const paths = requests.map(({ id }) => ({
    params: { id: JSON.stringify(id) },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data: request } = await supabase
    .from("requests")
    .select("*")
    .eq("id", id)
    .single();
  
   if (!request) {
     return {
       notFound: true,
     };
   }

  return {
    props: {
      request,
    },
  };
};

export default RequestDetails;
