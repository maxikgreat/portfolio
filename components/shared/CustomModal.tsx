import { Modal, Icon, Button } from 'semantic-ui-react';

interface ModalCustomProps {
  open: boolean,
  setOpen: (value: boolean) => void,
  trigger: JSX.Element,
  acceptAction: (...args: any[]) => any
}

export const CustomModal = ({ open, setOpen, trigger, acceptAction }: ModalCustomProps) => (
  <Modal
    basic
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    size='small'
    trigger={trigger}
    dimmer="blurring"
  >
    <Modal.Header>
      <Icon name='warning circle' />
      <h2 className="special-text-small-error">Warning</h2>
    </Modal.Header>
    <Modal.Content>
      <p>
        Are you sure to delete this record?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button 
        basic 
        className="rewrited"
        onClick={() => setOpen(false)}
      >
       No
      </Button>
      <Button
        basic 
        className="rewrited red"
        onClick={() => {
          // acceptAction();
          setOpen(false)
        }}>
        Yes
      </Button>
    </Modal.Actions>
  </Modal>
)
