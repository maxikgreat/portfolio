import { Sidebar, Menu, Icon } from 'semantic-ui-react';

interface MobileSideBar {
  visible: boolean,
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[],
  loginRoute: JSX.Element,
}

export const MobileSideBar = ({ visible, setVisible, routes, loginRoute }: MobileSideBar) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      inverted
      onHide={() => setVisible(false)}
      vertical
      visible={visible}
      width="thin"
    >
      {routes}
      <hr />
      {loginRoute}
    </Sidebar>
  )
}