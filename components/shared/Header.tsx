import Link from 'next/link';
import { Menu } from 'semantic-ui-react';
import { Routes } from '../../types';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();

  const renderRoutes = () => {
    return Object.values(Routes).map(route => (
      <Link 
        key={route.toString()}
        href={route}
      >
        <Menu.Item
          name={route === '/' ? 'Home' : route}
          active={router.pathname === route}
        />
      </Link>
    ))
  };

  return (
    <header>
      <Menu pointing secondary>
        {renderRoutes()}
        <Menu.Menu position='right'>
          {/* <Link href="/" onClick={this.handleItemClick}> */}
            <Menu.Item
              name='logout'
              // active={activeRoute === 'blog'}
            />
          {/* </Link> */}
        </Menu.Menu>
      </Menu>
    </header>
  )
}
