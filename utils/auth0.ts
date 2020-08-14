import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import { initAuth0 } from '@auth0/nextjs-auth0';

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

export function withAuth<T>(callback?: ({ req, res }: NextReqRes, ...rest: any[]) => Promise<T>) {
  return async ({req, res}: NextReqRes) => {
    const session = await auth0.getSession(req);

    if (!session || !session.user) {
      res.writeHead(302, {
        Location: '/api/v1/login'
      });
      
      res.end();
      return { props: {} };
    }
  
    const callbackData = callback ? await callback({ req, res }) : null;
  
    return { props: {user: session.user, ...callbackData} };
  }
} 

export default auth0;
