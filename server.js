const express = require('express');
const { send } = require('process');
const app = express();
const port = 8080;

app.get('/users', (req, res) => {
  res.send('Dude GET got')
});

app.post('/users', (req, res) => {
  return res.send('Geddin $$$ like im POST to be');
});

app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT em up ${req.params.userId} gah dam`,
  );
});

app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE these nuts on user ${req.params.userId} im ded`,
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});