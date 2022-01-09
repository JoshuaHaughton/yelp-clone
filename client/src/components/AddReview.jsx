import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
  const [name, setName] = useState("")
  const [rating, setRating] = useState("Rating")
  const [review, setReview] = useState("")

  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  console.log("params",params.id)

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    console.log(Number(params.id));
    
    try {
      const response = await RestaurantFinder.post(`/${Number(params.id)}/review`, {
        name,
        rating,
        review
      })
      navigate('/')
      navigate(location.pathname)
      console.log(response);

    } catch(err) {

    }
  }

  return (
    <div className="mb-2">
      <form action=''>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={e => setName(e.target.value)} id="Name" placeholder="Name" type="text" className="form-control"/>
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select value={rating} onChange={e => setRating(e.target.value)} id="rating" className="form-select my-1 mr-sm-2">
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea value={review} onChange={e => setReview(e.target.value)} id="Review" className="form-control"></textarea>
        </div>
        <button onClick={handleSubmitReview} className="btn btn-primary" style={{marginTop: "5%"}}>Submit</button>
      </form>
    </div>
  )
}

export default AddReview
