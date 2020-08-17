import { Sidebar, Menu } from 'semantic-ui-react';

import { User } from '@/types/auth0';

interface MobileSideBar {
  visible: boolean,
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[],
  userRoute: JSX.Element,
  user: User,
  loading: boolean
}

export const MobileSideBar = ({ visible, setVisible, routes, userRoute, user, loading }: MobileSideBar) => {
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
      {userRoute}
    </Sidebar>
  )
}