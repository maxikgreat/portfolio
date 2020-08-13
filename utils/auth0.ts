import { initAuth0 } from '@auth0/nextjs-auth0';

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: process.env.AUTH0_REDIRECT_URI,
  redirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  postLogoutRedirectUri: 'http://localhost:3000/',
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
  },
});
