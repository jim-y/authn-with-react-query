import '../styles/globals.css';
import { ReactQueryDevtools } from 'react-query-devtools';
import Nav from '@domain/nav/Nav';
import { UserProvider } from '@providers/UserProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Nav />
        <Component {...pageProps} />
      </UserProvider>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default MyApp;
