import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { MobileView } from "react-device-detect";

import { Menu } from 'semantic-ui-react';
import { Header } from '../shared/Header';
import { MobileSideBar } from '../shared/MobileSideBar';
import { Routes } from '@/types/app';
import { User } from '@/types/auth0';

interface BaseLayoutProps {
  children: ReactNode,
  className?: string,
  loading: boolean,
  data: User
}

export const BaseLayout = ({ children, className = '', loading, data }: BaseLayoutProps) => {
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  const checkUser = (isMobile: boolean, auth = true): JSX.Element => {
    let userLink: JSX.Element = (
      <a href={`/api/v1/${auth ? 'logout' : 'login'}`}>
        <Menu.Item 
          name={auth ? 'LOGOUT' : 'LOGIN'}
          className="special-text-small"
        />
      </a>
    );
    
    if (!isMobile) {
      userLink = (
        <Menu.Menu position="right">
          {userLink}
        </Menu.Menu>
      );
    }

    return userLink;
  }

  const userRoute = (isMobile: boolean): JSX.Element => !loading 
    ? data 
      ? checkUser(isMobile)
      : checkUser(isMobile, false)
    : null 

  const renderRoutes = (): JSX.Element[] => {
    return Object.values(Routes).map(route => (
      <Link 
        key={route.toString()}
        href={route}
      >
        <Menu.Item
          className="special-text-small"
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
          user={data}
          loading={loading}
          visible={mobileMenu}
          setVisible={setMobileMenu}
          routes={renderRoutes()}
          userRoute={userRoute(true)}
        />
      </MobileView>
      <Header
        user={data}
        loading={loading}
        setVisible={setMobileMenu}
        routes={renderRoutes()}
        userRoute={userRoute(false)}
      />
      <main className={`${className}`}>
        {children}
      </main>
    </>
  )
}
