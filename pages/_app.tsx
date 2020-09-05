import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import 'semantic-ui-css/semantic.min.css';
import '@/styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="background-image"></div>
      <NextNprogress
        color="#eb4ecb"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
