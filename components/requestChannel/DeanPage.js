import { Box, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import HodCard from "../HodCard";

const DeanPage = () => {
  const supabase = useSupabaseClient();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
console.log('req', requests)
  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("to", "dean");

      if (error && status !== 406) {
        throw error;
      }
      if (!error) {
        setRequests(data);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }   
  };

  return (
    <Box px='4' pb='12' pt='4' minH='80vh'>
      <Text
        mb='8'
        textAlign='center'
        fontSize={["xl", "2xl"]}
        letterSpacing='1px'
        fontWeight='semibold'>
        Student Request
      </Text>

      {loading && (
        <VStack py='12'>
          <Spinner />
          <Text>Fetching requests</Text>
        </VStack>
      )}

      {requests.length <= 0 ? (
        <Text textAlign='center' py='8'>
          There are no requests at the moment.
        </Text>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3]} spacing='30px'>
          {requests.map((request) => (
            <HodCard key={request.id} {...request} />
          ))}
        </SimpleGrid> 
      )}
    </Box>
  );
};

export default DeanPage;
