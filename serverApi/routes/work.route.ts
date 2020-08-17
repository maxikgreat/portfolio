import { Router } from 'express';

// TODO fix alias for server config
import Work from '../../dbModels/Work';

const router = Router();

router.get('/works', async (req, res) => {
  const works = await Work.find({});
  return res.json(works);
});

export default router;
