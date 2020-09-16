import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import auth0 from '@/utils/auth0';
import Work from '@/models/Work';

// bodyParser needs to be enabled on vercel
// export const config: PageConfig = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await auth0.getSession(req);
    const response = await new Work(accessToken).createNew(req.body);
    return res.json(response.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
