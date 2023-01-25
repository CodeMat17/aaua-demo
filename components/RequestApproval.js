import { Spinner, Text, VStack } from "@chakra-ui/react";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import RequestApprovalCard from "./RequestApprovalCard";

const RequestApproval = ({userID}) => {
  const supabase = useSupabaseClient();
  // const user = useUser();
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, [session]);

  async function getRequests() {
    try {
      setLoading(true);
      let { data, error, status } = await supabase
        .from("requests")
        .select("*")
        .order('created_at', {ascending: false})
        .eq("user_id", userID);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setRequests(data);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <>
      {loading ? (
        <VStack py='12'>
          <Spinner />
          <Text letterSpacing='1px'>Please wait</Text>
        </VStack>
      ) : (
        <>
          {requests.length === 0 ? (
            <VStack py='12'>
              <Text>You have not made a request yet.</Text>
            </VStack>
          ) : (
            <>
              {requests &&
                requests.map((request) => (
                  <RequestApprovalCard key={request.id} {...request} />
                ))}
            </>
          )}
        </>
      )}
    </>
  );
};

export default RequestApproval;
