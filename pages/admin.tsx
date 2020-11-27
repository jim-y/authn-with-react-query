import { useSession } from '@hooks/useSession';
import { useRouter } from 'next/router';

export default function Admin() {
  const { isLoading, session } = useSession();
  const router = useRouter();

  if (isLoading) return <span>Loading...</span>;

  if (!isLoading && !session) {
    router.replace('/');
    return <span>Not authorized. Redirecting...</span>;
  }

  return <h1>Hi 🖐 {session.email}!</h1>;
}
