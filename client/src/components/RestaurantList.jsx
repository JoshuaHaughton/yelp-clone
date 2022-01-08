import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants)
      } catch(err) {
  
      }
    };

    fetchData();
    
  }, []);

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="p-3 mb-2 bg-primary text-white">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Osmows</td>
            <td>Toronto</td>
            <td>$$$</td>
            <td>Rating</td>
            <td><button className="btn btn-warning">Update</button></td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
