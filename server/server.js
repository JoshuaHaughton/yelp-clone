require('dotenv').config();
const express = require('express');
const cors = require("cors")
const app = express();
const db = require('./db')
const PORT = process.env.PORT;

app.use(cors());
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


app.get('/api/restaurants/:id', async (req, res) => {
  try {


    const id = req.params.id;

    console.log(id)

    const restaurant = await db.query(`
    SELECT * FROM restaurants
    WHERE id = $1`, [id]);


    const reviews = await db.query(`
    SELECT * FROM reviews
    WHERE restaurant_id = $1`, [id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    })
  } catch(err) {

    console.log(err)

  }
})


app.post('/api/restaurants', async (req, res) => {
  console.log(req.body);

  try {

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

app.post('/api/restaurants/:id/review', async (req, res) => {

  try {

    const newReview = await db.query(`
    INSERT INTO reviews (restaurant_id, name, review, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING *`, [req.params.id, req.body.name, req.body.review, req.body.rating])

    console.log(newReview.rows);

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0]
      }
    })

  } catch(err) {
    res.status(500).send();
  }
})


app.put('/api/restaurants/:id', async (req, res) => {
  console.log(req.body);

  try {

    const results = await db.query(`
    UPDATE restaurants 
    SET name = $1,
    location = $2,
    price_range = $3
    WHERE id = $4
    RETURNING *`, [req.body.name, req.body.location, req.body.price_range, req.params.id])

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    })

  } catch(err) {
    res.status(500).send();
  }
})


app.delete('/api/restaurants/:restaurantId', async (req, res) => {
  console.log(req.body);

  try {

    const results = await db.query(`
    DELETE FROM restaurants 
    WHERE id = $1`, [req.params.restaurantId])

    res.status(204).json({
      status: "success"
    })

  } catch(err) {
    res.status(500).send();
  }
})




app.listen(PORT, () => {
  console.log(`You are now connected on port ${PORT}`);
})

