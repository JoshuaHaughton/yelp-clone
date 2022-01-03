import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {

  return <div>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/restaurants/:restaurantId/update' element={<UpdatePage />}/>
        <Route exact path='/restaurants/:restaurantId' element={<RestaurantDetailPage />}/>
      </Routes>
    </Router>
  </div>

}

export default App;