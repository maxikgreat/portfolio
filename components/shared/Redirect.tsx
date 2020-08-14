import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface RedirectProps {
  to: string,
  ssr: boolean,
}

export const Redirect = ({ to, ssr }: RedirectProps) => {
  const router = useRouter();

  useEffect(() => {
    if (ssr) {
      window.location.pathname = to;
    } else {
      router.push(to)
    }
  }, []);
  
  return null;
}