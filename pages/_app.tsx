import { AppProps } from 'next/app';

import 'semantic-ui-css/semantic.min.css';
import '@/styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="background-image"></div>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
