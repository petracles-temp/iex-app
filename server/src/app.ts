import { Request, Response } from 'express';
import iex_helper from'./iex_helper'
import express from 'express';

const app = express();
const port = 8081; // default port to listen

app.get('/', (req: Request, res: Response) => {
  iex_helper.make_IEX_API_call('https://api.iextrading.com/1.0/tops/')
  .then(response => {
      res.header('Access-Control-Allow-Origin', '*');
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

app.get('/:sym', (req: Request, res: Response) => {
  let sym = req.params.sym;
  iex_helper.make_IEX_API_call('https://api.iextrading.com/1.0/tops?symbols=' + sym)
  .then(response => {
      res.header('Access-Control-Allow-Origin', '*');
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

// start the Express server
app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );

export default app