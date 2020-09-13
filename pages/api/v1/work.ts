import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import Work from '@/models/Work';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await new Work().createNew(req.body);
    return res.json(response.data);
  } catch (e) {
    return res.status(e.status || 400).end(e.message);
  }
}