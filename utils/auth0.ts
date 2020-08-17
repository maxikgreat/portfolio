import { NextApiRequest, NextApiResponse } from 'next';
import { initAuth0 } from '@auth0/nextjs-auth0';
import { User, Role } from '@/types/auth0';

interface NextReqRes {
  req: NextApiRequest,
  res: NextApiResponse
}

const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'openid email profile',
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
  },
});

export const rolePassed = (user: User, role: Role) => user["https://portfolio-max.com/roles"].includes(role); 

export function withAuth<T>(
  callback?: ({ req, res }: NextReqRes, ...rest: any[]) => Promise<T>,
  role = Role.guest,
) {
  return async ({req, res}: NextReqRes) => {
    // try {
    //   const session = await auth0.getSession(req);
    //   return { props: { user: session.user } };
    // } catch (err) {
    //   res.writeHead(302, { Location: '/api/v1/login' });
    //   res.end();
    //   return { props: {} };
    // }
    const session = await auth0.getSession(req);

    if (!session || !session.user) {
      // res.writeHead(302,  { Location: '/api/v1/login' });
      // res.end();

      // need to be fixed
      return { props: {} };
    }

    if (!rolePassed(session.user as User, role)) {
      return { props: {} };
    }

    const callbackData = callback ? await callback({ req, res }) : null;
    return { props: {user: session.user, ...callbackData} };
  }
} 

export default auth0;
