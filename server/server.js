require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db')
const PORT = process.env.PORT;


app.use(express.json())

app.get('/get', async (req, res) => {
  const output = await db.query('select * from restaurants');
  console.log(output);
  res.send('object');
})


app.listen(PORT, () => {
  console.log(`You are now connected on port ${PORT}`);
})

