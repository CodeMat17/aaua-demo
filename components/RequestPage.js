import { Box, Divider, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { Delius } from "@next/font/google";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeanPage from "./requestChannel/DeanPage";
import HodPage from "./requestChannel/HodPage";
import StudentRequest from "./requestChannel/StudentRequest";

const delius = Delius({ weight: "400", subsets: ["latin"] });

const RequestPage = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [full_name, setFullname] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const general = process.env.NEXT_PUBLIC_GENERAL;
  const head1secret = process.env.NEXT_PUBLIC_HEAD_1_SECRET;
  const head2secret = process.env.NEXT_PUBLIC_HEAD_2_SECRET;

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
      setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, role`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setRole(data.role);
      }
    } catch (error) {
      //  alert("Error loading user data!");
      console.log(error);
    } finally {
      //   setLoading(false);
    }
  }

  return (
    <main className={delius.className}>
      {session === null && full_name === null ? (
        <VStack py='24'>
          <Spinner />
          <Text letterSpacing='1px'>Fetching data, wait</Text>
        </VStack>
      ) : (
        <Box maxW='6xl' mx='auto'>
          <HStack ml='-1' spacing={[-1, 2]}>
            <Image
              alt='id logo'
              src='/svgs/id-card.svg'
              width={100}
              height={90}
            />
            <Box lineHeight='5'>
              <Text>Welcome!</Text>
              <Text noOfLines='1' fontWeight='semibold' fontSize='lg'>
                {full_name}
              </Text>
              <Text noOfLines='1'>{session?.user?.email}</Text>
            </Box>
          </HStack>

          <Divider mb='6' />

          {role === null && (
            <VStack py='24'>
              <Text fontSize='xl' maxW='xs' textAlign='center'>
                Hello {full_name}, you have not been provisioned to use this
                channel. Kindly contact the admin.
              </Text>
            </VStack>
          )}
          {role === general && <StudentRequest session={session} />}
          {role === head1secret && <HodPage session={session} />}
          {role === head2secret && <DeanPage session={session} />}
        </Box>
      )}
    </main>
  );
};

export default RequestPage;
