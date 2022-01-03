require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db')
const PORT = process.env.PORT;


app.use(express.json());

app.get('/api/restaurants/', async (req, res) => {

  try {
    const results = await db.query('select * from restaurants');

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    })

    res.send(results.rows);

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

    res.send(results.rows[0]);

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

app.post('/api/restaurants', async (req, res) => {
  console.log(req.body);

  try{

    const results = await db.query(`
    INSERT INTO restaurants (name, location, price_range)
    VALUES ($1, $2, $3)
    RETURNING *`, [req.body.name, req.body.location, req.body.price_range])

    console.log(results.rows[0]);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    })

  } catch(err) {
    res.status(500).send();
  }
})




app.listen(PORT, () => {
  console.log(`You are now connected on port ${PORT}`);
})

