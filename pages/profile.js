// import NavHeader from "@/components/NavHeader";
// import {
//   Box,
//   FormControl,
//   FormLabel,
//   Input,
//   Spinner,
//   Text,
//   useToast,
//   VStack,
// } from "@chakra-ui/react";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, Button, Typography } from "@supabase/ui";
// import Image from "next/image";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
const { Text } = Typography;
import {supabase} from '../utils/supabase'

function Profile(props) {
  const { user } = Auth.useUser();
  if (user)
    return (
      <>
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children;
}

const AuthProfile = () => {
  // const supabase = useSupabaseClient();
  // const session = useSession();

  // const user = useUser();
  // const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);
  // const [full_name, setFullname] = useState(null);
  // const [dept, setDept] = useState(null);
  // const [matric_no, setMatricNo] = useState(null);
  // const [showData, setShowData] = useState(true);
  // const toast = useToast();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowData(false);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   getProfile();
  // }, [session]);

  // async function getProfile() {
  //   try {
  //     setLoading(true);
  //     let { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`full_name, dept, matric_no`)
  //       .eq("id", user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setFullname(data.full_name);
  //       setMatricNo(data.matric_no);
  //       setDept(data.dept);
  //     }
  //   } catch (error) {
  //     //   alert("Error loading user data!");
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function updateProfile({ full_name, dept, matric_no }) {
  //   try {
  //     setLoading(true);
  //     const updates = {
  //       id: user.id,
  //       full_name,
  //       dept,
  //       matric_no,
  //       updated_at: new Date().toISOString(),
  //     };

  //     let { error } = await supabase.from("profiles").upsert(updates);
  //     if (error) throw error;
  //     // alert("Profile updated!");
  //     toast({
  //       title: "Profile updated!",
  //       description: "You have successfully updated your profile data.",
  //       status: "success",
  //       duration: 9000,
  //       position: "top",
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     alert("Error updating the data!");
  //     toast({
  //       title: "Error updating the data!",
  //       description: `Something went wrong: {eror}. Try again.`,
  //       status: "error",
  //       duration: 9000,
  //       position: "top",
  //       isClosable: true,
  //     });
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //     router.push("/request");
  //   }
  // }

  return (
    // <>
    //   <NavHeader />
    //   <Box maxW='sm' mx='auto'>
    //     <>
    //       {showData ? (
    //         <VStack py='20'>
    //           <Spinner />
    //           <Text letterSpacing='2px' color='gray'>
    //             Fetching profile data
    //           </Text>
    //         </VStack>
    //       ) : (
    //         <VStack p='8' pos='relative' maxW='sm' mx='auto'>
    //           <Box ml='4'>
    //             <Image
    //               alt='update profile'
    //               src='/svgs/add-user.svg'
    //               width={150}
    //               height={150}
    //             />
    //           </Box>
    //           <Text pos='absolute' top='40' fontWeight='semibold' fontSize='xl'>
    //             UPDATE YOUR PROFILE
    //           </Text>

    //           <FormControl pt='8'>
    //             <FormLabel fontSize='sm' mb='0'>
    //               Email
    //             </FormLabel>
    //             <Input
    //               id='email'
    //               type='email'
    //               value={session?.user?.email}
    //               disabled
    //             />
    //           </FormControl>
    //           <FormControl>
    //             <FormLabel fontSize='sm' mb='0'>
    //               Fullname
    //             </FormLabel>
    //             <Input
    //               id='fullname'
    //               type='text'
    //               value={full_name || ""}
    //               onChange={(e) => setFullname(e.target.value)}
    //             />
    //           </FormControl>
    //           <FormControl>
    //             <FormLabel fontSize='sm' mb='0'>
    //               Matric No.
    //             </FormLabel>
    //             <Input
    //               id='MatricNo'
    //               type='text'
    //               value={matric_no || ""}
    //               onChange={(e) => setMatricNo(e.target.value)}
    //             />
    //           </FormControl>
    //           <FormControl pb='2'>
    //             <FormLabel fontSize='sm' mb='0'>
    //               Department
    //             </FormLabel>
    //             <Input
    //               id='department'
    //               type='text'
    //               value={dept || ""}
    //               onChange={(e) => setDept(e.target.value)}
    //             />
    //           </FormControl>

    //           <Button
    //             onClick={() => updateProfile({ full_name, dept, matric_no })}
    //             isLoading={loading}
    //             colorScheme='blue'
    //             w='full'>
    //             UPDATE PROFILE
    //           </Button>
    //           <Button
    //             onClick={() => supabase.auth.signOut()}
    //             colorScheme='red'
    //             w='full'>
    //             SIGN OUT
    //           </Button>
    //         </VStack>
    //       )}
    //     </>
    //   </Box>
    // </>
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Profile>
    </Auth.UserContextProvider>
  );
};

export default AuthProfile;
