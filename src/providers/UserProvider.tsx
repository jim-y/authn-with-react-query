import React from 'react';
import { useSession } from '@hooks/useSession';

const UserContext = React.createContext(null);

export const UserProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState();
  const { isLoading, session } = useSession();

  React.useEffect(() => {
    console.log('Running useEffect', { user, isLoading, session });
    if (!user && !isLoading && session) {
      setUser(session);
    }
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return React.useContext(UserContext);
}
