
import React from 'react';
import { Auth } from "./Auth";

export const UserContext = React.createContext({});
export function UserContextProvider(props: any) {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  // console.log("LI, SLIU:", loggedInUser, setLoggedInUser, props);
  React.useEffect(() => {
    // console.log("auth.LoggedInUser: ", new Auth().loggedInUser);
    const user = props.auth?.loggedInUser || null;
    setLoggedInUser(user);
  }, []);

  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
      {props.children}
    </UserContext.Provider>
  );
}
