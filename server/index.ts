import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.use(express.json());

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    })
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
