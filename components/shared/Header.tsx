import { Menu, Icon } from 'semantic-ui-react';
import { MobileView, BrowserView } from "react-device-detect";

import { User } from '@/types/auth0';

interface HeaderProps {
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[],
  userRoute: JSX.Element,
  user: User,
  loading: boolean,
}

export const Header = ({ setVisible, routes, userRoute, user, loading }: HeaderProps) => (
  <header>
    <Menu
      text
      as="nav"
      size="huge"
      className="nav"
    >
      <Menu.Item
        name="Maksym Vasylenko"
        className="nav-brand special-text-small"
      />
        <BrowserView renderWithFragment>
          {routes}
          {userRoute}
        </BrowserView>
        <MobileView renderWithFragment>
          <Menu.Item
            as="div"
            position="right"
            onClick={() => setVisible(true)}
          >
            <Icon name="bars" size="large" />
          </Menu.Item>
        </MobileView>
    </Menu>
  </header>
)
