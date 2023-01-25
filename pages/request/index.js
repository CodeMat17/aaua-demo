import Footer from "@/components/Footer";
import NavHeader from "@/components/NavHeader";
import DeanPage from "@/components/requestChannel/DeanPage";
import HodPage from "@/components/requestChannel/HodPage";
import StudentRequest from "@/components/requestChannel/StudentRequest";
import {
  Box,
  Divider,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Delius } from "@next/font/google";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import {useUser} from '../../context/user'

const delius = Delius({ weight: "400", subsets: ["latin"] });

const MakeRequest = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const router = useRouter();
  // const [userID, setUserID] = useState(null);
  const [full_name, setFullname] = useState(null);
  const [dept, setDept] = useState(null);
  const [matric_no, setMatricNo] = useState(null);
  const [role, setRole] = useState(null);
  const bgAlt = useColorModeValue("gray.200", "gray.800");
  const bgButton = useColorModeValue("gray.50", "gray.700");

  const general = process.env.NEXT_PUBLIC_GENERAL;
  const head1secret = process.env.NEXT_PUBLIC_HEAD_1_SECRET;
  const head2secret = process.env.NEXT_PUBLIC_HEAD_2_SECRET;

  // useEffect(() => {
  //   setUserID(user);
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       console.log(`Supbase auth event: ${event}`);
  //       setUserID(session?.user ?? null);
  //     }
  //   );
  //   // return () => {
  //   //   authListener.unsubscribe();
  //   // };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  console.log("userid", user);

  useEffect(() => {
    if (user === null) {
      router.reload();
    }
  }, [user]);

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
      //   setLoading(true);
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, dept, matric_no, role`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setMatricNo(data.matric_no);
        setDept(data.dept);
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
      <NavHeader />
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
          {role === general && <StudentRequest user={user} />}
          {role === head1secret && <HodPage />}
          {role === head2secret && <DeanPage />}
        </Box>
      )}
      <Footer />
    </main>
  );
};

export default MakeRequest;
