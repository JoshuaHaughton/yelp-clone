import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.restaurant.name)
      setLocation(response.data.data.restaurant.location)
      setPriceRange(response.data.data.restaurant.price_range)
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    })
    navigate('/')
  }

  return (
    <div>
      <h1>{name}</h1>
      <form action="">
        <div>
          <label htmlFor="name">Name</label>
          <input value={name} onChange={ (e) => setName(e.target.value)} id="name" type="text" className="form-control"/>
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input value={location} onChange={ (e) => setLocation(e.target.value)} id="location" type="text" className="form-control"/>
        </div>

        <div>
          <label htmlFor="price_range">Price Range</label>
          <input value={priceRange}  onChange={ (e) => setPriceRange(e.target.value)} id="price_range" type="number" className="form-control"/>
        </div>

        <button type="submit" onClick={handleSubmit} className="btn btn-primary" style={{marginTop: "5%"}}>Submit</button>

      </form>
    </div>
  )
}

export default UpdateRestaurant
