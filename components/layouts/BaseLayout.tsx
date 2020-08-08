import { Header } from '../shared/Header';
import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
