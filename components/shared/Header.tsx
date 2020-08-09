import { Menu, Icon } from 'semantic-ui-react';
import { MobileView, BrowserView } from "react-device-detect";

interface HeaderProps {
  setVisible: (isVisible: boolean) => void,
  routes: JSX.Element[]
}

export const Header = ({ setVisible, routes }: HeaderProps) => (
  <header>
    <Menu
      text
      size="huge"
      className="nav"
    >
      <Menu.Item
        name="Maksym Vasylenko"
        className="nav-brand"
      />
        <BrowserView renderWithFragment>
          {routes}
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
