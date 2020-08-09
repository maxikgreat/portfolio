import { ReactNode } from "react";
import { Container} from 'semantic-ui-react';

interface BasePageProps {
  children: ReactNode,
  className?: string
}

export const BasePage = ({ children, className = ''}: BasePageProps) => {
  return (
    <Container className={`base-page ${className}`} as="section">
      {children}
    </Container>
  )
};