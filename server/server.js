require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db')
const PORT = process.env.PORT;


app.use(express.json())

app.get('/api/restaurants/', async (req, res) => {

  try {
    const results = await db.query('select * from restaurants');
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    })
    res.send('object');

  } catch(err) {
    res.status(500).send;
  }

})

app.get('/api/restaurants/:restaurantId', async (req, res) => {
  try {
    const id = req.params.restaurantId;
    const results = await db.query(`
    SELECT * FROM restaurants
    WHERE id = $1`, [id]);
    console.log(results.rows[0]);
    console.log(req.params.restaurantId);
    res.send('object');

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows[0]
      }
    })
    // req.restaurantId = results.rows[0]
    //next()
    
  } catch(err) {
    res.status(500).send;
  }
})


app.listen(PORT, () => {
  console.log(`You are now connected on port ${PORT}`);
})

