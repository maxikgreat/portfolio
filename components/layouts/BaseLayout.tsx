import { Header } from '../shared/Header';
import { ReactNode, useState } from 'react';
import { MobileSideBar } from '../shared/MobileSideBar';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Routes } from '../../types';
import { Menu } from 'semantic-ui-react';
import { MobileView } from "react-device-detect";

interface BaseLayoutProps {
  children: ReactNode,
  className?: string,
}

export const BaseLayout = ({ children, className = '' }: BaseLayoutProps) => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const loginRoute = (isMobile: boolean): JSX.Element => isMobile ? (
    <Link href={'/login'}>
      <Menu.Item
        name={'Login'}
        // active={router.pathname === route}
      />
    </Link>
  ) : (
    <Menu.Menu position="right">
      <Link href="api/v1/login">
        <Menu.Item
          name={'Login'}
          active={router.pathname === 'api/v1/login'}
        />
      </Link>
    </Menu.Menu>
  )

  const renderRoutes = (): JSX.Element[] => {
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
    <>
      <MobileView renderWithFragment>
        <MobileSideBar
          visible={mobileMenu}
          setVisible={setMobileMenu}
          routes={renderRoutes()}
          loginRoute={loginRoute(true)}
        />
      </MobileView>
      <Header
        setVisible={setMobileMenu}
        routes={renderRoutes()}
        loginRoute={loginRoute(false)}
      />
      <main className={`${className}`}>
        {children}
      </main>
      
    </>
  )
}
