import express from 'express';

const router = express.Router();

router.get('/work', (req, res) => {
  return res.json('Heello from work');
});

export default router;