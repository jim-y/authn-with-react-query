import { useQuery } from 'react-query';

export const useSession = () => {
  const { isLoading, data } = useQuery('session', () =>
    fetch('/api/auth/session', {
      credentials: 'include'
    }).then((res) => {
      if (!res.ok) {
        return Promise.resolve(null);
      }
      return res.json();
    })
  );
  return { isLoading, session: data };
};
