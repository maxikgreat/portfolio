import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import workRoute from './routes/work.route';

const result = dotenv.config();

if (result.error) throw result.error;

const port = process.env.PORT_API || 3001;
const server = express();

server.use(express.json());

server.use('/api/v1', workRoute);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`Ready on port ${port} - ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.log('Server error', e);
    process.exit(1);
  }
})();

