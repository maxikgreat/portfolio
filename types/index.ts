export enum Routes {
  Home = '/',
  About = '/about',
  Portfolio = '/portfolio',
  CV = '/cv',
  Blog = '/blog',
  Secret = '/secret',
  SecretSSR = '/secretssr',
}

export interface User {
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  picture: string,
  locale: string,
  updated_at: Date,
  email: string,
  email_verified: boolean
  sub: string,
}