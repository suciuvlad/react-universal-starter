import express from 'express'
import routes from './routes';
import render from 'react-universal-starter';

const app = express();

app
.get('/*', async (req, res) => {

  try {
    const html = await render({
      req,
      res,
      routes
      // clientStats
    });

    res.send(html);
  } catch (error) {
    res.json(error);
  }
})

export default app