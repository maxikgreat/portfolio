import { ReactNode } from "react";
import { Container} from 'semantic-ui-react';

interface BasePageProps {
  children: ReactNode,
  className?: string
  title?: string,
}

export const BasePage = ({ children, className = '', title}: BasePageProps) => {
  return (
    <Container
      className={`base-page ${className}`}
      as="section"
    >
      {title && <h1 className="special-text">{title}</h1>}
      {children}
    </Container>
  )
};