import { BasePage } from './BasePage';
import { Message } from 'semantic-ui-react';

interface ErrorPage {
  message: string,
}

export const ErrorPage = ({ message }: ErrorPage) => (
  <BasePage title="Ooops, something went wrong">
    <Message
      size="huge"
      negative
    >
      <Message.Header>{message || ''}</Message.Header>
    </Message>
  </BasePage>
)