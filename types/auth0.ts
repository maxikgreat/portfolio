export enum Role {
  admin = 'admin',
  guest = 'guest',
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
  ['https://portfolio-max.com/roles']: Role[], // roles of auth0
}
