import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavHeader from "./NavHeader";

const MainEntry = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);
  const [full_name, setFullname] = useState(null);
  // const [dept, setDept] = useState(null);
  // const [matric_no, setMatricNo] = useState(null);
  const [showData, setShowData] = useState(true);

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
        // setMatricNo(data.matric_no);
        // setDept(data.dept);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShowData(false);
    }, 2000);
  }, []);

  const goToProfilePage = () => {
    router.push("/profile");
  };

  const goToRequestPage = () => {
    router.push("/request");
  };

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
  //   }
  // }

  return (
    <Box>
      <NavHeader />
      <Box minH='90vh'>
        {showData ? (
          <VStack py='20'>
            <Spinner />
            <Text letterSpacing='2px' color='gray'>
              Please wait
            </Text>
          </VStack>
        ) : (
          <>{full_name === null ? goToProfilePage() : goToRequestPage()}</>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainEntry;
