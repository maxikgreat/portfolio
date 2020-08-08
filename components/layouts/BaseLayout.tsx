import { Header } from '../shared/Header';
import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode,
  className: string,
}

export const BaseLayout = ({ children, className }: BaseLayoutProps) => {
  return (
    <div className="layout-container">
      <Header />
      <main className={`cover ${className}`}>
        <div className="wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}
