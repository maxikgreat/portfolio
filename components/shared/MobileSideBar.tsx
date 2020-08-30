import { Sidebar, Menu } from 'semantic-ui-react';

import { User } from '@/types/auth0';

interface MobileSideBar {
  visible: boolean,
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[],
  socials: JSX.Element[],
  userRoute: JSX.Element,
}

export const MobileSideBar = ({ visible, setVisible, routes, userRoute, socials }: MobileSideBar) => {
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
      <div className="socials-container">
        {socials}
      </div>
      <hr/> 
      {userRoute}
    </Sidebar>
  )
}