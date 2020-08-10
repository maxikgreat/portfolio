import { AppProps } from 'next/app';
import { useEffect } from 'react';
import {backgroundMove} from '../helpers/backgroundMove';
import 'semantic-ui-css/semantic.min.css';
import '../styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    backgroundMove();
  }, []);

  return (
    <>
      <div className="background-image"></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
