import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { MobileView } from "react-device-detect";

import { Menu } from 'semantic-ui-react';
import { Header } from '../shared/Header';
import { MobileSideBar } from '../shared/MobileSideBar';
import { Routes } from '@/types/app';
import { User } from '@/types/auth0';
import { socials } from '@/consts';

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

  const renderSocials = (): JSX.Element[] => {
    return socials.map(({ link, title, image }, index) => (
      <a href={link} key={index} className="social-link" target="_blank">
        <img src={`/assets/images/icons/${image}-menu.png`} alt={title} />
      </a>
    ))
  };

  return (
    <>
      <MobileView renderWithFragment>
        <MobileSideBar
          visible={mobileMenu}
          setVisible={setMobileMenu}
          routes={renderRoutes()}
          userRoute={userRoute(true)}
          socials={renderSocials()}
        />
      </MobileView>
      <Header
        setVisible={setMobileMenu}
        routes={renderRoutes()}
        socials={renderSocials()}
        userRoute={userRoute(false)}
      />
      <main className={`${className}`}>
        {children}
      </main>
    </>
  )
}
