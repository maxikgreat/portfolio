import { Menu, Icon } from 'semantic-ui-react';
import { MobileView, BrowserView } from "react-device-detect";

interface HeaderProps {
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[],
  socials: JSX.Element[],
  userRoute: JSX.Element,
}

export const Header = ({ setVisible, routes, userRoute, socials }: HeaderProps) => (
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
          <div className="divider" />
          {socials}
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
