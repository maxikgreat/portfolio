import { Menu, Icon } from 'semantic-ui-react';
import { MobileView, BrowserView } from "react-device-detect";
import Link from 'next/link';

interface HeaderProps {
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[],
  loginRoute: JSX.Element
}

export const Header = ({ setVisible, routes, loginRoute }: HeaderProps) => (
  <header>
    <Menu
      text
      as="nav"
      size="huge"
      className="nav"
    >
      <Menu.Item
        name="Maksym Vasylenko"
        className="nav-brand"
      />
        <BrowserView renderWithFragment>
          {routes}
          {loginRoute}
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
