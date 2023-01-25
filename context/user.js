import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  // const [user, setUser] = useState(supabase.auth.user());

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(() => {
  //     setUser(supabase.auth.user());
  //   });
  // }, []);

  const exposed = { user };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
