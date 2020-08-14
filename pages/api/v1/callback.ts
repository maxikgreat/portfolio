import auth0 from '@/utils/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await auth0.handleCallback(req, res, {
      redirectTo: '/'
    });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).end(e.message);
  }
  
}