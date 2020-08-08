import { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import '../styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
