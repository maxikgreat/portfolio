import { ReactNode } from "react";
import { Container} from 'semantic-ui-react';

interface BasePageProps {
  children: ReactNode,
  className?: string
  title: string,
  actionButton?: JSX.Element,
}

export const BasePage = ({ children, className = '', title, actionButton }: BasePageProps) => {
  return (
    <Container
      className={`base-page ${className}`}
      as="section"
    >
      <div className="top-container">
        <h1 className="special-text">{title}</h1>
        {actionButton}
      </div>
      
      {children}
    </Container>
  )
};