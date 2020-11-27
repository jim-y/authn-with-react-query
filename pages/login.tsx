import styles from '@domain/login/Login.module.css';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useUser } from '@providers/UserProvider';

const login = (qs) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/xxx-form-urlencoded'
    },
    body: qs
  });
};

export default function Login(): JSX.Element {
  const router = useRouter();
  const { setUser } = useUser();
  const [doLogin] = useMutation(login);

  const submit = async (e) => {
    e.preventDefault();
    const formData: any = new FormData(e.target);
    const searchParams: any = new URLSearchParams(formData);
    try {
      await doLogin(searchParams.toString());
      setUser({
        email: searchParams.email
      });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.loginForm} onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
