import { NextApiRequest, NextApiResponse, PageConfig } from 'next';

import auth0 from '@/utils/auth0';
import Work from '@/models/Work';

// bodyParser needs to be enabled on vercel
// export const config: PageConfig = {
//   api: {
//     bodyParser: false,
//   },
// };

interface NextApiRequestWithId extends NextApiRequest {
  query: {
    id: string,
  }
}

export default async (req: NextApiRequestWithId, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const { accessToken } = await auth0.getSession(req);
      const { body, query: { id } } = req;
      const { data } = await new Work(accessToken).update(id, body);
      return res.json(data);
    } catch (e) {
      return res.status(e.status || 422).json(e.response.data);
    }
  }
  if (req.method === 'DELETE') {
    try {
      const { accessToken } = await auth0.getSession(req);
      const { query: { id } } = req;
      const { data } = await new Work(accessToken).delete(id);
      return res.json(data);
    } catch (e) {
      return res.status(e.status || 422).json(e.response.data);
    }
  }
}
