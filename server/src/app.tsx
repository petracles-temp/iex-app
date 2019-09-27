import iex_helper from'./iex_helper'
import express from 'express';

const app = express();
const port = 8080; // default port to listen

app.get('/', (req, res) => {
  iex_helper.make_IEX_API_call('https://api.iextrading.com/1.0/tops/last/')
  .then(response => {
      res.header('Access-Control-Allow-Origin', '*');
      res.json(response)
  })
  .catch(error => {
      res.send(error)
  })
})

app.get('/:sym', (req, res) => {
  let sym = req.params.sym;
  iex_helper.make_IEX_API_call('https://api.iextrading.com/1.0/tops/last?symbols=' + sym)
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