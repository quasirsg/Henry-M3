const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a / req.body.b,
  });
});

app.listen(3000);

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
