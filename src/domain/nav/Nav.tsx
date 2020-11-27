import Link from 'next/link';
import { useMutation } from 'react-query';
import styles from '@domain/nav/Nav.module.css';
import { useUser } from '@providers/UserProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const logout = (qs) => {
  return fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
};

export default function Nav(): JSX.Element {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [doLogout] = useMutation(logout);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await doLogout();
      setUser(undefined);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>Home</a>
      </Link>
      {user && (
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      )}
      {!user && (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
      {user && (
        <a onClick={handleLogout} className={styles.logout}>
          Logout
        </a>
      )}
    </nav>
  );
}
